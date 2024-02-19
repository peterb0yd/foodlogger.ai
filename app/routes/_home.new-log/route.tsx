import { LinksFunction } from "@remix-run/node";
import newLogStyles from "./new-log.styles.css";
import { Overlay, links as overlayLinks } from "~/components/overlay/Overlay";
import { Modal, links as modalLinks } from "~/components/modal/Modal";
import { Text, links as textLinks } from "~/components/text/Text";
import { Routes } from "~/enums/routes";
import { AudioRecorder } from "~/components/audio-recorder/AudioRecorder";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: newLogStyles },
    ...overlayLinks(),
    ...modalLinks(),
    ...textLinks(),
];

export default function NewLog() {

    return (
        <Overlay>
            <Modal title="New Log" goBackRoute={Routes.HOME}>
                <div className="NewLog">
                    <Text size="lg" weight="light">
                        {`PRESS & HOLD RECORD BUTTON`}
                    </Text>
                    <AudioRecorder 
                        onStart={() => console.log('Recording started')}
                        onStop={() => console.log('Recording ended')}
                    />
                </div>
            </Modal>
        </Overlay>
    );
}