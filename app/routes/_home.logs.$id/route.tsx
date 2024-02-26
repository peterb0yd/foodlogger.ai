import { LinksFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import { Overlay, links as overlayLinks } from "~/components/overlay/Overlay";
import { Modal, links as modalLinks } from "~/components/modal/Modal";
import { Text } from "~/components/text/Text";
import { PageRoutes } from "~/enums/routes";
import { AudioRecorder, links as audioRecLinks } from "~/components/audio-recorder/AudioRecorder";
import { FlexBox } from "~/components/flex-box/FlexBox";
import { useLoaderData, useParams, useSubmit } from "@remix-run/react";
import { FoodLogItemService } from "~/api/modules/food-log-item/food-log-item.service";
import { IFoodLogItemWithFoodItem } from "~/api/modules/food-log-item/food-log-item.interfaces";
import { SessionService } from "~/api/modules/session/session.service";
import { useEffect, useState } from "react";

export const links: LinksFunction = () => [
    ...overlayLinks(),
    ...modalLinks(),
    ...audioRecLinks(),
];

export const loader: LoaderFunction = async (context) => {
    const userId = await SessionService.getUserIdFromRequest(context.request);
    if (!userId) {
        redirect(PageRoutes.LOGIN);
    }
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

    const handleNewAudioLog = async (file: File) => {
        if (!file) return;
        const formData = new FormData();
        formData.append("audio", file, 'audio.mp3');
        submitLogItem(formData, {
            method: "POST",
            action: `/api/food-logs/${foodLogId}/food-item-logs`,
            encType: "multipart/form-data",
            navigate: false
        });
    }

    return (
        <Overlay>
            <Modal title="Record Food Log" goBackRoute={PageRoutes.HOME}>
                <div className="NewLog">
                    <FlexBox align="center" justify="center" col gap="md">
                        <FlexBox col gap="md" align="center">
                            <Text size="lg" weight="light" align="center" lineHeight="tight">
                                {`Press & hold the mic button to record a food item.`}
                            </Text>
                            <Text size="xs" color="muted" align="center" lineHeight="tight" italic>
                                {`Ex: Hold button and say "One cup steamed broccoli"`}
                            </Text>
                            <Text size="2xl" lineHeight="tight">👇</Text>
                        </FlexBox>
                        <AudioRecorder
                            onStart={() => console.log('Recording started')}
                            onStop={handleNewAudioLog}
                        />
                        <FoodLogItems
                            logItems={foodLogItems}
                        />
                    </FlexBox>
                </div>
            </Modal>
        </Overlay>
    );
}

interface FoodLogItemsProps {
    logItems: IFoodLogItemWithFoodItem[]
}

const FoodLogItems = ({ logItems }: FoodLogItemsProps) => {
    if (!logItems?.length) {
        return <Text>No food logs yet...</Text>;
    }
    return logItems.map(logItem => (
        <Text
            key={logItem.id}
            size="sm"
            weight="light"
            align="center"
            lineHeight="tight"
        >
            {logItem.foodItem.name} - {logItem.quantity} - ${logItem.preparation} - {logItem.unit.toLowerCase()}
        </Text>
    ))
}