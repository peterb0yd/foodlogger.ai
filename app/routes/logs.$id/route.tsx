import { LinksFunction, LoaderFunction, json } from "@remix-run/node";
import { Text } from "~/components/text/Text";
import { APIRoutes, PageRoutes } from "~/enums/routes";
import { AudioRecorder, links as audioRecLinks } from "~/components/audio-recorder/AudioRecorder";
import { FlexBox } from "~/components/flex-box/FlexBox";
import { Form, useFetcher, useLoaderData, useNavigate, useNavigationType, useParams, useSubmit } from "@remix-run/react";
import { FoodLogItemService } from "~/api/modules/food-log-item/food-log-item.service";
import { IFoodLogItemWithFoodItem } from "~/api/modules/food-log-item/food-log-item.interfaces";
import { SessionService } from "~/api/modules/session/session.service";
import { startCase } from "lodash-es";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { IconNames } from "~/enums/icons";
import { RequestMethods } from "~/enums/requests";
import pageStyles from './logs.$id.css';
import { Repeater } from "~/components/repeater/Repeater";
import Skeleton from "react-loading-skeleton";
import { Divider, links as dividerLinks } from "~/components/divider/Divider";
import { useEffect, useState } from "react";
import { PromptModal, links as promptModalLinks } from "./PromptModal";
import { BottomBar, links as bottomBarLinks } from "~/components/bottom-bar/BottomBar";
import { FoodItemList, links as foodListLinks } from "~/components/food-item-list/FoodItemList";
import { isFetcherLoading } from "~/utils/fetcherLoading";
import { Main, links as mainLinks } from "~/components/main/Main";
import { TemplateService } from "~/api/modules/template/template.service";
import { TemplateSelector } from "./template-selector/TemplateSelector";


// This is the response type when a prompt error occurs, but not on success
type SubmitterBadAudioResponse = { suggestion: string };

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: pageStyles },
    ...mainLinks(),
    ...dividerLinks(),
    ...buttonLinks(),
    ...audioRecLinks(),
    ...promptModalLinks(),
    ...bottomBarLinks(),
    ...foodListLinks(),
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
    const logFetcher = useFetcher<SubmitterBadAudioResponse>();
    const navigate = useNavigate();
    const submitTemplate = useSubmit();
    const params = useParams();
    const [showPrompt, setShowPrompt] = useState(true);
    const foodLogId = params.id as string;
    const isLoading = isFetcherLoading(logFetcher);
    const promptErrorText = logFetcher.data?.suggestion ?? null;
    const navigationType = useNavigationType();
    const backLink = navigationType === 'PUSH' ? -1 : PageRoutes.LOGS;
    const shouldShowPrompt = Boolean(promptErrorText && showPrompt);
    const hasFoodItems = Boolean(foodLogItems?.length > 0);
    const hasTemplates = Boolean(templates?.length > 0);
    const canShowTemplates = hasTemplates && !hasFoodItems;


    // Submits the audio blob to the server but doesn't change page
    const handleNewAudioLog = async (audioBlob: Blob) => {
        if (!audioBlob) return;
        const formData = new FormData();
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
            formData.append("audio", reader.result as string);
            formData.append("foodLogId", foodLogId)
            logFetcher.submit(formData, {
                method: RequestMethods.POST,
                action: APIRoutes.FOOD_ITEM_LOGS,
                navigate: false
            });
        }
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
        <Main name="EditLog" title="Log Your Meal">
            <EditLogHeader
                isLoading={isLoading}
                handleNewAudioLog={handleNewAudioLog}
            />
            <FoodItemList
                items={foodLogItems}
                isLoading={isLoading}
                canDelete
            />
            {canShowTemplates && (
                <FlexBox col gap="sm">
                    <Text>or select a template</Text>
                    <TemplateSelector 
                        templates={templates}
                        onSelect={(template) => navigate(`${PageRoutes.TEMPLATES}/${template.id}`)}
                    />
                </FlexBox>
            )}
            {shouldShowPrompt && (
                <PromptModal
                    promptText={promptErrorText as string}
                    closeModal={() => setShowPrompt(false)}
                />
            )}
            <BottomBar>
                <BottomBar.SecondaryButton
                    text="Template"
                    icon={IconNames.Template}
                    onClick={handleCreateTemplate}
                    disabled={isLoading || !hasFoodItems}
                    loading={isLoading}
                />
                <BottomBar.PrimaryButton
                    text="Done"
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
            <FlexBox col gap="sm">
                <FlexBox center col width="full" gap="xl">
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

