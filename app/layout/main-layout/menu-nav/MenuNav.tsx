import { LinksFunction } from "@remix-run/node";
import styles from './MenuNav.css';
import { List, links as listLinks } from "~/components/list/List";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { IconNames } from "~/enums/icons";
import { FlexBox, links as flexboxLinks } from "~/components/flex-box/FlexBox";
import { Logo, links as logoLinks } from "~/components/logo/Logo";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...listLinks(),
    ...buttonLinks(),
    ...logoLinks(),
    ...flexboxLinks(),
];

interface MenuNavProps {
    visible: boolean;
}

export const MenuNav = ({ visible }: MenuNavProps) => {
    return (
        <nav
            className="MenuNav"
            data-visible={visible}
        >
            <FlexBox name="Content" width="global-max" col gap="lg">
                <List>
                    <List.Item>
                        <Button
                            icon={IconNames.PencilIcon}
                            name="Logs"
                            color="base"
                            iconColor="base"
                        >
                            Logs
                        </Button>
                    </List.Item>
                    <List.Item>
                        <Button icon={IconNames.Settings} name="Settings" color="base" iconColor="base">Settings</Button>
                    </List.Item>
                </List>
            </FlexBox>
            <Button icon={IconNames.LogOut} name="Sign Out" color="base" iconColor="base">Sign Out</Button>
        </nav>
    );
}