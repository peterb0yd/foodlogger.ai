import { LinksFunction } from "@remix-run/node";
import styles from './MenuNav.css';
import { List, links as listLinks } from "~/components/list/List";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { IconNames } from "~/enums/icons";
import { FlexBox, links as flexboxLinks } from "~/components/flex-box/FlexBox";
import { Logo, links as logoLinks } from "~/components/logo/Logo";
import { useEffect } from "react";
import { PageRoutes } from "~/enums/routes";
import { useNavigate } from "@remix-run/react";

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
    const navigate = useNavigate();

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
        if (e.key === 'Escape') {
            setIsVisible(false);
        }
    }

    const navigateTo = (route: PageRoutes) => {
        setIsVisible(false);
        navigate(route);
    }

    return (
        <nav
            className="MenuNav"
            data-visible={visible}
        >
            <FlexBox
                name="Menu-Content"
                width="global-max"
                justify="between"
                height="full"
                gap="lg"
                col
            >
                <List>
                    <List.Item>
                        <Button
                            icon={IconNames.Logs}
                            onClick={() => navigateTo(PageRoutes.LOGS)}
                            name="Logs"
                            variant="menu"
                            size="lg"
                            iconSize="lg"
                            iconSide="left"
                        >
                            Logs
                        </Button>
                    </List.Item>
                    <List.Item>
                        <Button
                            icon={IconNames.Settings}
                            onClick={() => navigateTo(PageRoutes.SETTINGS)}
                            name="Settings"
                            size="lg"
                            variant="menu"
                            iconSize="lg"
                            iconSide="left"
                        >
                            Settings
                        </Button>
                    </List.Item>
                </List>
                <Button
                    icon={IconNames.LogOut}
                    name="Sign Out"
                    size="md"
                    variant="menu"
                    iconSize="sm"
                    iconSide="left"
                >
                    Sign Out
                </Button>
            </FlexBox>
        </nav>
    );
}