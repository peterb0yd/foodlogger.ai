import { LinksFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import { Overlay, links as overlayLinks } from "~/components/overlay/Overlay";
import { Modal, links as modalLinks } from "~/components/modal/Modal";
import { Text } from "~/components/text/Text";
import { APIRoutes, PageRoutes } from "~/enums/routes";
import { AudioRecorder, links as audioRecLinks } from "~/components/audio-recorder/AudioRecorder";
import { FlexBox } from "~/components/flex-box/FlexBox";
import { Form, useLoaderData, useParams, useSubmit } from "@remix-run/react";
import { FoodLogItemService } from "~/api/modules/food-log-item/food-log-item.service";
import { IFoodLogItemWithFoodItem } from "~/api/modules/food-log-item/food-log-item.interfaces";
import { SessionService } from "~/api/modules/session/session.service";
import { startCase } from "lodash-es";
import { Button } from "~/components/button/Button";
import { IconNames } from "~/enums/icons";
import { RequestMethods } from "~/enums/requests";
import pageStyles from './edit-log.styles.css';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: pageStyles },
    ...overlayLinks(),
    ...modalLinks(),
    ...audioRecLinks(),
];

export const loader: LoaderFunction = async (context) => {
    await SessionService.requireAuth(context.request);
    const foodLogId = context.params.id as string;
    const foodLogItems = await FoodLogItemService.findAllByLogId(foodLogId);
    return json({ foodLogItems });
}

export default function EditFoodLogPage() {
    const loaderData = useLoaderData<typeof loader>();
    const submitLogItem = useSubmit();
    const params = useParams();
    const { foodLogItems } = loaderData;
    const foodLogId = params.id as string;

    const handleNewAudioLog = async (audioBlob: Blob) => {
        if (!audioBlob) return;
        const formData = new FormData();
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
            formData.append("audio", reader.result as string);
            formData.append("foodLogId", foodLogId)
            submitLogItem(formData, {
                method: RequestMethods.POST,
                action: APIRoutes.FOOD_ITEM_LOGS,
                navigate: false
            });
        }
    }

    return (
        <div className="EditLog">
            <FlexBox center col width="full" gap="md">
                <FlexBox col gap="md" align="center">
                    <Text size="lg" weight="bold" align="center" lineHeight="tight">
                        {`Log Your Meal`}
                    </Text>
                    <FlexBox col gap="sm" center>
                        <Text align="center" lineHeight="tight">
                            {`Hold down the mic button and speak the name and quantity for each item in your meal."`}
                        </Text>
                        <Text size="xs" color="muted" align="center" lineHeight="tight">
                            {`Example: "I had a cup of steamed brocolli, a cup of hash browns and two eggs."`}
                        </Text>
                    </FlexBox>
                    <Text size="2xl" lineHeight="tight">👇</Text>
                </FlexBox>
                <AudioRecorder
                    onStart={() => console.log('Recording started')}
                    onStop={handleNewAudioLog}
                />
                <FoodLogItemList
                    logItems={foodLogItems}
                />
            </FlexBox>
        </div>
    );
}

interface FoodLogItemsProps {
    logItems: IFoodLogItemWithFoodItem[]
}

const FoodLogItemList = ({ logItems }: FoodLogItemsProps) => {
    if (!logItems?.length) {
        return <Text>No food logs yet...</Text>;
    }
    return (
        <FlexBox col gap="md" bg="muted">
            {logItems.map(logItem => <FoodLogItem logItem={logItem} />)}
        </FlexBox>
    );
}

const FoodLogItem = ({ logItem }: { logItem: IFoodLogItemWithFoodItem }) => {
    const quantity = logItem.quantity;
    const unit = logItem.unit.toLowerCase();
    const name = startCase(logItem.foodItem.name);
    const preparation = logItem.preparation.toLowerCase();

    return (
        <FlexBox justify="between" bg="base" border="thin">
            <Text
                size="sm"
                weight="light"
                align="center"
                lineHeight="tight"
            >
                {name}: {quantity} {unit} - {preparation}
            </Text>
            <Form method={RequestMethods.DELETE} action={APIRoutes.FOOD_ITEM_LOGS} navigate={false}>
                <input type="hidden" name="id" value={logItem.id} />
                <Button
                    icon={IconNames.TrashIcon}
                    iconColor="destructive"
                />
            </Form>
        </FlexBox>
    );
}