import { LinksFunction } from "@remix-run/node";
import styles from './MenuNav.css';
import { List, links as listLinks } from "~/components/list/List";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { IconNames } from "~/enums/icons";
import { FlexBox, links as flexboxLinks } from "~/components/flex-box/FlexBox";
import { Logo, links as logoLinks } from "~/components/logo/Logo";
import { useEffect } from "react";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...listLinks(),
    ...buttonLinks(),
    ...logoLinks(),
    ...flexboxLinks(),
];

interface MenuNavProps {
    visible: boolean;
    setIsVisible: (visible: boolean) => void;
}

export const MenuNav = ({ visible, setIsVisible }: MenuNavProps) => {

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
            document.body.onkeyup = onKeyUp;
            document.body.scrollIntoView();
        } else {
            document.body.style.overflow = 'auto';
            document.body.onkeyup = null;
        }
    }, [visible])

    const onKeyUp = (e: KeyboardEvent) => {
        console.log(e.key);
        if (e.key === 'Escape') {
            setIsVisible(false);
        }
    }

    return (
        <nav
            className="MenuNav"
            data-visible={visible}
        >
            <FlexBox name="Content" width="global-max" justify="between" col gap="lg">
                <List>
                    <List.Item>
                        <Button
                            icon={IconNames.Pencil}
                            name="Logs"
                            color="base"
                            size="xl"
                            iconColor="base"
                        >
                            Logs
                        </Button>
                    </List.Item>
                    <List.Item>
                        <Button
                            icon={IconNames.Settings}
                            name="Settings"
                            size="xl"
                            color="base"
                            iconColor="base"
                        >
                            Settings
                        </Button>
                    </List.Item>
                </List>
                <Button
                    icon={IconNames.LogOut}
                    name="Sign Out"
                    color="base"
                    iconColor="base"
                >
                    Sign Out
                </Button>
            </FlexBox>
        </nav>
    );
}