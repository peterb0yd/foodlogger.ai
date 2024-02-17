import { LinksFunction } from "@remix-run/node";
import newLogStyles from "./styles.css";
import { Overlay, links as overlayLinks } from "~/components/overlay/Overlay";
import { Modal } from "~/components/modal/Modal";
import { Routes } from "~/enums/routes";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: newLogStyles },
    ...overlayLinks(),
];

export default function NewLog() {

    return (
        <Overlay>
            <Modal goBackRoute={Routes.HOME}>
                <div className="NewLog">
                    <h1>New Loger</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc nec lacinia tincidunt, nunc nunc.</p>
                </div>
            </Modal>
        </Overlay>
    );
}