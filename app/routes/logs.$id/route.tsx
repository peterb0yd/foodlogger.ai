import { LinksFunction, LoaderFunction, json } from "@remix-run/node";
import { Text } from "~/components/text/Text";
import { APIRoutes, PageRoutes } from "~/enums/routes";
import { AudioRecorder, links as audioRecLinks } from "~/components/audio-recorder/AudioRecorder";
import { FlexBox } from "~/components/flex-box/FlexBox";
import { Form, useFetcher, useLoaderData, useNavigate, useNavigationType, useParams, useSubmit } from "@remix-run/react";
import { FoodLogItemService } from "~/api/modules/food-log-item/food-log-item.service";
import { IFoodLogItemWithFoodItem } from "~/api/modules/food-log-item/food-log-item.interfaces";
import { SessionService } from "~/api/modules/session/session.service";
import { IconNames } from "~/enums/icons";
import { RequestMethods } from "~/enums/requests";
import styles from './logs.$id.css?url';
import { Divider, links as dividerLinks } from "~/components/divider/Divider";
import { useEffect, useState } from "react";
import { PromptModal, links as promptModalLinks } from "./PromptModal";
import { BottomBar, links as bottomBarLinks } from "~/components/bottom-bar/BottomBar";
import { FoodItemList, links as foodListLinks } from "~/components/food-item-list/FoodItemList";
import { isFetcherLoading } from "~/utils/fetcherLoading";
import { Main, links as mainLinks } from "~/components/main/Main";
import { Label, links as labelLinks } from "~/components/label/Label";
import { TemplateService } from "~/api/modules/template/template.service";
import { TemplateSelector } from "./template-selector/TemplateSelector";

// This is the response type when a prompt error occurs, but not on success
type BadAudioResponse = { suggestion: string };
type SubmitterResponse = IFoodLogItemWithFoodItem | BadAudioResponse;

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...mainLinks(),
    ...dividerLinks(),
    ...audioRecLinks(),
    ...promptModalLinks(),
    ...bottomBarLinks(),
    ...foodListLinks(),
    ...labelLinks(),
];

export const loader: LoaderFunction = async (context) => {
    const userId = await SessionService.requireAuth(context.request);
    const foodLogId = context.params.id as string;
    const foodLogItemsFetch = FoodLogItemService.findAllByLogId(foodLogId);
    const templatesFetch = TemplateService.findAllByUserId(userId);
    const [foodLogItems, templates] = await Promise.all([foodLogItemsFetch, templatesFetch]);
    return json({ userId, foodLogItems, templates });
}

export default function EditFoodLogPage() {
    const loaderData = useLoaderData<typeof loader>();
    const { foodLogItems, userId, templates } = loaderData;
    const fetcher = useFetcher<SubmitterResponse>();
    const navigate = useNavigate();
    const submitTemplate = useSubmit();
    const params = useParams();
    const [promptText, setPromptText] = useState('');
    const foodLogId = params.id as string;
    const isLoading = isFetcherLoading(fetcher);
    const navigationType = useNavigationType();
    const backLink = navigationType === 'PUSH' ? -1 : PageRoutes.LOGS;
    const hasFoodItems = Boolean(foodLogItems?.length > 0);
    const hasTemplates = Boolean(templates?.length > 0);
    const canShowTemplates = hasTemplates && !hasFoodItems;

    useEffect(() => {
        const fetcherData = fetcher.data as BadAudioResponse;
        console.log({fetcherData});
        if (fetcherData?.suggestion) {
            setPromptText(fetcherData.suggestion);
        }
    }, [fetcher.data])

    // Submits the audio blob to the server but doesn't change page
    const handleNewAudioLog = async (audioBlob: Blob) => {
        if (!audioBlob) return;
        const formData = new FormData();
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
            formData.append("audio", reader.result as string);
            formData.append("foodLogId", foodLogId)
            fetcher.submit(formData, {
                method: RequestMethods.POST,
                action: APIRoutes.FOOD_ITEM_LOGS,
                navigate: false
            });
        }
    }

    // Creates food log items for food log from a template
    const handleTemplateSelect = async (templateId: string) => {
        const formData = new FormData();
        formData.append('templateId', templateId);
        formData.append('foodLogId', foodLogId);
        fetcher.submit(formData, {
            method: RequestMethods.POST,
            action: APIRoutes.FOOD_ITEM_LOGS,
            navigate: false,
        });
    }

    // Create a new template and redirect to it
    const handleCreateTemplate = async () => {
        const formData = new FormData();
        formData.append('foodLogId', foodLogId);
        formData.append('userId', userId);
        submitTemplate(formData, {
            method: RequestMethods.POST,
            action: APIRoutes.TEMPLATES,
        });
    }

    return (
        <Main name="EditLog" title="Log Your Meal" padBottom="1/3">
            <EditLogHeader
                isLoading={isLoading}
                handleNewAudioLog={handleNewAudioLog}
            />
            <FlexBox col gap="md" width="full">
                <Label padLeft text={`Food Items`} />
                <FoodItemList
                    items={foodLogItems}
                    isLoading={isLoading}
                    canDelete
                />
            </FlexBox>
            {canShowTemplates && (
                <FlexBox col gap="lg" width="full">
                    <Divider
                        betweenText="or select a template"
                        color="highlight"
                        margin="lg"
                    />
                    <TemplateSelector
                        templates={templates}
                        onSelect={(template) => handleTemplateSelect(template.id)}
                    />
                </FlexBox>
            )}
            {promptText && (
                <PromptModal
                    promptText={promptText}
                    closeModal={() => setPromptText('')}
                />
            )}
            <BottomBar>
                <BottomBar.SecondaryButton
                    text="Create Template"
                    icon={IconNames.Template}
                    onClick={handleCreateTemplate}
                    disabled={isLoading || !hasFoodItems}
                    loading={isLoading}
                />
                <BottomBar.PrimaryButton
                    text="Done Editing"
                    icon={IconNames.CheckMark}
                    onClick={() => navigate(backLink as string)}
                    disabled={isLoading}
                />
            </BottomBar>
        </Main>
    );
}

interface EditLogHeaderProps {
    isLoading: boolean;
    handleNewAudioLog: (audioBlob: Blob) => void;
}

const EditLogHeader = ({ isLoading, handleNewAudioLog }: EditLogHeaderProps) => {
    const [hasScrolled, setHasScrolled] = useState(false);

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

    return (
        <header>
            <div className="background-box" data-visible={hasScrolled} />
            <FlexBox center col gap="xl" width="full">
                <FlexBox col gap="md" width="full">
                    <Text size="xl">
                        {`1. What did you just eat?`}
                    </Text>
                    <Text size="xl">
                        {`2. Hold mic to speak.`}
                    </Text>
                    <Text size="xl">
                        {`3. Be specific.`}
                    </Text>
                </FlexBox>
                <FlexBox center width="full">
                    <AudioRecorder
                        onStart={() => console.log('Recording started')}
                        onStop={handleNewAudioLog}
                        isLoading={isLoading}
                    />
                </FlexBox>
            </FlexBox>
        </header>
    );
}

