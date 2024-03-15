import { LinksFunction, LoaderFunction, json } from "@remix-run/node";
import { Text } from "~/components/text/Text";
import { APIRoutes, PageRoutes } from "~/enums/routes";
import { AudioRecorder, links as audioRecLinks } from "~/components/audio-recorder/AudioRecorder";
import { FlexBox } from "~/components/flex-box/FlexBox";
import { Form, useFetcher, useLoaderData, useParams, useSubmit } from "@remix-run/react";
import { FoodLogItemService } from "~/api/modules/food-log-item/food-log-item.service";
import { IFoodLogItemWithFoodItem } from "~/api/modules/food-log-item/food-log-item.interfaces";
import { SessionService } from "~/api/modules/session/session.service";
import { startCase } from "lodash-es";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { IconNames } from "~/enums/icons";
import { RequestMethods } from "~/enums/requests";
import pageStyles from './edit-log.styles.css';
import { Repeater } from "~/components/repeater/Repeater";
import Skeleton from "react-loading-skeleton";
import { Divider, links as dividerLinks } from "~/components/divider/Divider";
import { useEffect, useState } from "react";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: pageStyles },
    ...dividerLinks(),
    ...buttonLinks(),
    ...audioRecLinks(),
];

export const loader: LoaderFunction = async (context) => {
    await SessionService.requireAuth(context.request);
    const foodLogId = context.params.id as string;
    const foodLogItems = await FoodLogItemService.findAllByLogId(foodLogId);
    console.log({ foodLogItems });
    return json({ foodLogItems });
}

export default function EditFoodLogPage() {
    const loaderData = useLoaderData<typeof loader>();
    const submitter = useFetcher();
    const params = useParams();
    const [hasScrolled, setHasScrolled] = useState(false);
    const { foodLogItems } = loaderData;
    const foodLogId = params.id as string;
    const isLoading = submitter.state === 'loading' || submitter.state === 'submitting';

    useEffect(() => {
        // Check for scroll position to add background box shadow
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    // Submits the audio blob to the server but doesn't change page
    const handleNewAudioLog = async (audioBlob: Blob) => {
        if (!audioBlob) return;
        const formData = new FormData();
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
            formData.append("audio", reader.result as string);
            formData.append("foodLogId", foodLogId)
            submitter.submit(formData, {
                method: RequestMethods.POST,
                action: APIRoutes.FOOD_ITEM_LOGS,
                navigate: false
            });
        }
    }

    return (
        <main className="EditLog">
            <Text size="xl" color="secondary" weight="bold" lineHeight="tight">
                {`Log Your Meal`}
            </Text>
            <header>
                <div className="background-box" data-visible={hasScrolled} />
                <FlexBox center col width="full" gap="xl">
                    <FlexBox col gap="md" width="full">
                        <Text size="xl">
                            {`1. What did you just eat?`}
                        </Text>
                        <Text size="xl">
                            {`2. Be specific.`}
                        </Text>
                        <Text size="xl">
                            {`3. Hold mic to speak.`}
                        </Text>
                    </FlexBox>
                    <AudioRecorder
                        onStart={() => console.log('Recording started')}
                        onStop={handleNewAudioLog}
                        isLoading={isLoading}
                    />
                </FlexBox>
            </header>
            <section>
                <FoodLogItemList
                    logItems={foodLogItems}
                    isLoading={isLoading}
                />
            </section>
        </main>
    );
}

interface FoodLogItemsProps {
    logItems: IFoodLogItemWithFoodItem[];
    isLoading: boolean;
}

const FoodLogItemList = ({ logItems, isLoading }: FoodLogItemsProps) => {
    const hasLogItems = Boolean(logItems?.length);
    if (!hasLogItems && !isLoading) {
        return <Text align="center">Your food logs will show up here...</Text>;
    }
    return (
        <FlexBox col gap="md" width="full" padBottom='1/3'>
            {logItems?.map((logItem, i) => (
                <FoodLogItem
                    key={logItem.id}
                    logItem={logItem}
                    isFirst={i === 0}
                />
            ))}
            {isLoading && (
                <Repeater count={3}>
                    {hasLogItems && <Divider />}
                    <FlexBox gap="md" width="full">
                        <Skeleton height="2rem" width="80px" />
                        <Skeleton height="2rem" width="100px" />
                        <Skeleton height="2rem" containerClassName="skeleton-flex-grow" />
                        <Skeleton height="2rem" width="60px" />
                    </FlexBox>
                </Repeater>
            )}
        </FlexBox>
    );
}

const FoodLogItem = ({ logItem, isFirst }: { logItem: IFoodLogItemWithFoodItem, isFirst: boolean; }) => {
    const quantity = logItem.quantity;
    const unit = logItem.unit.toLowerCase();
    const unitText = unit === 'none' ? '' : ` ${unit}`;
    const name = startCase(logItem.foodItem.name);
    const preparation = logItem.preparation.toLowerCase();

    return (
        <>
            {!isFirst && <Divider />}
            <FlexBox align="center" justify="between" width="full">
                <FlexBox gap="md" align="center">
                    <Text weight="bold" lineHeight="none">
                        {name}
                    </Text>
                    <Text>{` • `}</Text>
                    <Text lineHeight="none">
                        {quantity}{unitText}
                    </Text>
                    <Text>{` • `}</Text>
                    <Text lineHeight="none">
                        {preparation}
                    </Text>
                </FlexBox>

                <Form method={RequestMethods.DELETE} action={APIRoutes.FOOD_ITEM_LOGS} navigate={false}>
                    <input type="hidden" name="id" value={logItem.id} />
                    <Button
                        icon={IconNames.TrashIcon}
                        iconColor="destructive"
                        borderRadius="sm"
                        size="sm"
                        variant="muted"
                    />
                </Form>
            </FlexBox>
        </>
    );
}