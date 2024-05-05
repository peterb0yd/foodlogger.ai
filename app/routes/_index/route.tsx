import { LinksFunction } from "@remix-run/node";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { PageRoutes } from "~/enums/routes";
import styles from './home.styles.css?url';
import { IconNames } from "~/enums/icons";
import { links as layoutLinks } from "~/layout/main-layout/MainLayout";
import { Main, links as mainLinks } from "~/components/main/Main";
import { List, links as listLinks } from "~/components/list/List";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...mainLinks(),
    ...layoutLinks(),
    ...textLinks(),
    ...flexBoxLinks(),
    ...buttonLinks(),
    ...listLinks(),
];

export default function Home() {
    return (
        <Main name="Home">
            <FlexBox col gap="2xl" center>
                <FlexBox col gap="md" align="center" width="full">
                    <Text size="xl" align="center" weight="black" lineHeight="tight">{`Meal tracking made simple.`}</Text>
                    <Text size="md" align="center" weight="bold" color="muted" lineHeight="tight">{`Tell AI what you ate and let it do your tracking for you.`}</Text>
                </FlexBox>
                <Button
                    to={PageRoutes.LOGS}
                    variant="secondary"
                    size="lg"
                    width="full"
                    icon={IconNames.ChevronCircle}
                    iconSide="right"
                >
                    Go to Logs
                </Button>

                <List variant="gap-loose" bg="none">
                    <List.Item col align="left" padX="md">
                        <Text size="lg" color="muted" weight="black">1. Voice</Text>
                        <Text size="md">
                            {`Voice recognition is easier than navigating a bunch of dropdowns and inputs. Say what you ate and let AI figure out the details.`}
                        </Text>
                    </List.Item>
                    <List.Item col align="left" padX="md">
                        <Text size="lg" color="muted" weight="black">2. Privacy</Text>
                        <Text size="md">
                            {`Tell us your name and email... or don't. We don't care. Log in and sign up with only a phone number. Password and personal info is not required.`}
                        </Text>
                    </List.Item>
                    <List.Item col align="left" padX="md">
                        <Text size="lg" color="muted" weight="black">3. Template</Text>
                        <Text size="md">
                            {`Use templates to speed up your tracking. Save your favorite snacks, drinks and meals and log them with a single button. Modify the log any way you want.`}
                        </Text> 
                    </List.Item>
                </List>
            </FlexBox>
        </Main>
    );
}