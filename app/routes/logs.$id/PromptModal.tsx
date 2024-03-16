import { LinksFunction } from "@remix-run/node";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { Modal, links as modalLinks } from "~/components/modal/Modal";
import { Text, links as textLinks } from "~/components/text/Text";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { IconNames } from "~/enums/icons";
import { Icon } from "~/components/icon/Icon";

export const links: LinksFunction = () => [
    ...flexBoxLinks(),
    ...modalLinks(),
    ...textLinks(),
    ...buttonLinks(),
];

interface PromptModalProps {
    promptText: string;
    closeModal: () => void;
}

export const PromptModal = ({ promptText, closeModal }: PromptModalProps) => {
    return (
        <Modal fullScreen contentWidth="lg">
            <FlexBox col gap="xl" center>
                <Icon name={IconNames.RobotHead} size="3xl" color="muted" />
                <Text size="lg">{promptText}</Text>
                <Button variant="primary" size="lg" onClick={closeModal}>{`Try Again`}</Button>
            </FlexBox>
        </Modal>
    );
}
