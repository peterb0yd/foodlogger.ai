import { LinksFunction } from "@remix-run/node";
import newLogStyles from "./new-log.styles.css";
import { Overlay, links as overlayLinks } from "~/components/overlay/Overlay";
import { Modal, links as modalLinks } from "~/components/modal/Modal";
import { Text, links as textLinks } from "~/components/text/Text";
import { Routes } from "~/enums/routes";
import { AudioRecorder, links as audioRecLinks } from "~/components/audio-recorder/AudioRecorder";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: newLogStyles },
    ...overlayLinks(),
    ...modalLinks(),
    ...textLinks(),
    ...flexBoxLinks(),
    ...audioRecLinks(),
];

export default function NewLog() {

    return (
        <Overlay>
            <Modal title="Record Food Log" goBackRoute={Routes.HOME}>
                <div className="NewLog">
                    <FlexBox align="center" justify="center" col gap="md">
                        <FlexBox col gap="sm" align="center">
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
                            onStop={(src: string) => console.log('Recording ended', src)}
                        />
                        <Text size="xs" color="muted">Your food logs will appear here...</Text>
                    </FlexBox>
                </div>
            </Modal>
        </Overlay>
    );
}