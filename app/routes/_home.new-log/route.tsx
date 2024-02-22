import { LinksFunction } from "@remix-run/node";
import newLogStyles from "./new-log.styles.css";
import { Overlay, links as overlayLinks } from "~/components/overlay/Overlay";
import { Modal, links as modalLinks } from "~/components/modal/Modal";
import { Text, links as textLinks } from "~/components/text/Text";
import { Routes } from "~/enums/routes";
import { AudioRecorder, links as audioRecLinks } from "~/components/audio-recorder/AudioRecorder";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { useFetcher, useLoaderData, useSubmit } from "@remix-run/react";
import { useState } from "react";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: newLogStyles },
    ...overlayLinks(),
    ...modalLinks(),
    ...textLinks(),
    ...flexBoxLinks(),
    ...audioRecLinks(),
];

interface FoodLogsProps {
    log: string | undefined;
    isLoading: boolean;
}

const FoodLogs = ({ log, isLoading }: FoodLogsProps) => {
    if (isLoading) {
        return <Text>Loading...</Text>;
    }
    if (!log) {
        return <Text>No food logs yet...</Text>;
    }
    return (
        <Text>{log}</Text>
    );
}

export default function NewLog() {
    const submit = useSubmit();
    const fetcher = useFetcher();

    const handleNewAudioLog = (audioBlob: Blob) => {
        if (!audioBlob) return;
        const formData = new FormData();
        const file = new File([audioBlob], "audio.wav", { type: "audio/wav" });
        formData.append("audio", file);
        submit(formData, {
            method: "POST",
            action: "/api/food-logs",
            encType: "multipart/form-data",
            navigate: false,
        });
    }

    console.log({data: fetcher.data});

    return (
        <Overlay>
            <Modal title="Record Food Log" goBackRoute={Routes.HOME}>
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
                        <FoodLogs
                            log={fetcher.data as string}
                            isLoading={fetcher.state === 'loading'}
                        />
                    </FlexBox>
                </div>
            </Modal>
        </Overlay>
    );
}