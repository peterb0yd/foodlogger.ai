import { IconNames } from "~/enums/icons";
import { Button, links as buttonLinks } from "../button/Button";
import { FlexBox, links as flexboxLinks } from "../flex-box/FlexBox";
import bottomBarStyles from './BottomBar.css'
import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: bottomBarStyles },
    ...buttonLinks(),
    ...flexboxLinks(),
];

interface BottomBarProps {
    primaryActionText?: string;
    secondaryActionText?: string;
    primaryActionIcon?: IconNames;
    secondaryActionIcon?: IconNames;
    primaryActionDisabled?: boolean;
    secondaryActionDisabled?: boolean;
    primaryActionLoading?: boolean;
    secondaryActionLoading?: boolean;
    primaryAction?: () => void;
    secondaryAction?: () => void;
}

export const BottomBar = ({
    primaryActionText,
    secondaryActionText,
    primaryActionIcon,
    secondaryActionIcon,
    primaryActionDisabled,
    secondaryActionDisabled,
    primaryActionLoading,
    secondaryActionLoading,
    primaryAction,
    secondaryAction
}: BottomBarProps) => {
    return (
        <footer className="BottomBar">
            <FlexBox gap="lg" width="full" padX="md">
                <Button
                    variant="muted"
                    width="1/2"
                    size="sm"
                    border="muted"
                    borderRadius="md"
                    iconSide="left"
                    icon={secondaryActionIcon}
                    onClick={secondaryAction}
                    disabled={secondaryActionDisabled}
                    loading={secondaryActionLoading}
                >
                    {secondaryActionText}
                </Button>
                <Button
                    variant="primary"
                    width="1/2"
                    size="sm"
                    border="muted"
                    borderRadius="md"
                    iconSide="left"
                    icon={primaryActionIcon}
                    onClick={primaryAction}
                    disabled={primaryActionDisabled}
                    loading={primaryActionLoading}
                >
                    {primaryActionText}
                </Button>
            </FlexBox>
        </footer>
    );
}