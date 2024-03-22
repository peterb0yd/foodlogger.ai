import { IconNames } from "~/enums/icons";
import { Button, links as buttonLinks } from "../button/Button";
import { FlexBox, links as flexboxLinks } from "../flex-box/FlexBox";
import bottomBarStyles from './BottomBar.css'
import { LinksFunction } from "@remix-run/node";
import { PropsWithChildren } from "react";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: bottomBarStyles },
    ...buttonLinks(),
    ...flexboxLinks(),
];

export const BottomBar = ({
    children
}: PropsWithChildren) => {
    return (
        <footer className="BottomBar">
            <FlexBox gap="lg" width="full" padX="md">
                {children}
            </FlexBox>
        </footer>
    );
}

interface ButtonProps {
    text: string;
    icon: IconNames;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
}

BottomBar.PrimaryButton = ({ text, icon, onClick, disabled, loading }: ButtonProps) => (
    <Button
        variant="primary"
        width="1/2"
        size="sm"
        border="muted"
        borderRadius="md"
        iconSide="left"
        icon={icon}
        onClick={onClick}
        disabled={disabled}
        loading={loading}
    >
        {text}
    </Button>
)

BottomBar.SecondaryButton = ({ text, icon, onClick, disabled, loading }: ButtonProps) => (
    <Button
        variant="muted"
        width="1/2"
        size="sm"
        border="muted"
        borderRadius="md"
        iconSide="left"
        icon={icon}
        onClick={onClick}
        disabled={disabled}
        loading={loading}
    >
        {text}
    </Button>
)