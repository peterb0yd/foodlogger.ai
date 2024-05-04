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
                <FlexBox center col gap="xl" width="full">
                    <FlexBox col gap="md" align="center" width="full">
                        <Text size="xl" align="center" weight="black" lineHeight="tight">{`Meal tracking made simple.`}</Text>
                        <Text size="md" align="center" lineHeight="tight">{`Tell AI what you ate and let it do your tracking for you.`}</Text>
                    </FlexBox>
                    <Button
                        to={PageRoutes.LOGS}
                        variant="secondary"
                        size="lg"
                        icon={IconNames.ChevronCircle}
                        iconSide="right"
                    >
                        Go to Logs
                    </Button>
                </FlexBox>

                <List variant="gap-loose">
                    <List.Item col align="left" padX="md">
                        <Text size="lg" color="muted" weight="black">Voice</Text>
                        <Text size="md">
                            {`We use voice recognition to make it easy to log your meals. Just tell us what you ate and we'll take care of the rest.`}
                        </Text>
                    </List.Item>
                    <List.Item col align="left" padX="md">
                        <Text size="lg" color="muted" weight="black">AI</Text>
                        <Text size="md">
                            {`Our AI will analyze your meals and provide you with insights on your diet and how you can improve it.`}
                        </Text>
                    </List.Item>
                    <List.Item col align="left" padX="md">
                        <Text size="lg" color="muted" weight="black">Privacy</Text>
                        <Text size="md">
                            {`This app is designed to respect your privacy. We don't store your data and we don't share it with anyone.`}
                        </Text>
                    </List.Item>
                </List>
            </FlexBox>
        </Main>
    );
}