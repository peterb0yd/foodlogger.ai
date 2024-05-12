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
            <FlexBox col gap="2xl" center padBottom="1/3">
                <FlexBox col gap="lg" align="center" width="full">
                    <Text size="2xl" align="center" weight="black" lineHeight="tight">{`Enhance your well-being.`}</Text>
                    <Text size="md" align="center" weight="bold" color="muted" lineHeight="tight">
                        {`Discover the foods that boost your mood and energy with the help of AI.`}
                    </Text>
                </FlexBox>
                <Button
                    to={PageRoutes.LOGS}
                    variant="primary"
                    size="lg"
                    width="full"
                    icon={IconNames.ChevronCircle}
                    iconSide="right"
                >
                    Start tracking
                </Button>

                <List variant="gap-loose" bg="none">
                    <List.Item col align="left" padX="md">
                        <Text size="xl" color="primary" weight="bold">
                            {`Mood & Energy tracking`}
                        </Text>
                        <Text size="md" color="highlight">
                            {`It turns out what we eat impacts more than just our weight. Track your mood, energy levels, sleep and more to see how your diet affects your overall mood and health.`}
                        </Text>
                    </List.Item>
                    <List.Item col align="left" padX="md">
                        <Text size="xl" color="primary" weight="bold">
                            {`IBS & FODMAP tracking`}
                        </Text>
                        <Text size="md" color="highlight">
                            {`Find the foods that trigger your IBS symptoms. Track your FODMAP intake and see how it affects your digestion and overall well-being.`}
                        </Text>
                    </List.Item>
                    <List.Item col align="left" padX="md">
                        <Text size="xl" color="primary" weight="bold">
                            {`AI-powered food logging`}
                        </Text>
                        <Text size="md" color="highlight">
                            {`Log your snacks, drinks and meals faster than ever with the help of AI. Don't waste time typing food names and selecting quantities from dropdowns. There is an easier way.`}
                        </Text>
                    </List.Item>
                    <List.Item col align="left" padX="md">
                        <Text size="xl" color="primary" weight="bold">
                            {`Save time with templates`}
                        </Text>
                        <Text size="md" color="highlight">
                            {`It's true, logging everything you eat is time-consuming. Use templates to speed it up. Save your favorite snacks, drinks and meals and log them with a single button.`}
                        </Text>
                    </List.Item>
                    <List.Item col align="left" padX="md">
                        <Text size="xl" color="primary" weight="bold">
                            {`Sign up in seconds`}
                        </Text>
                        <Text size="md" color="highlight">
                            {`Input your name and email... or not. We don't care. Log in and sign up with only a phone number. Password and personal info is not required.`}
                        </Text>
                    </List.Item>
                    <List.Item col align="left" padX="md">
                        <Text size="xl" color="primary" weight="bold">
                            {`Calorie & macronutrient breakdown (coming soon)`}
                        </Text>
                    </List.Item>
                    <List.Item col align="left" padX="md">
                        <Text size="xl" color="primary" weight="bold">
                            {`Image recognition (coming soon)`}
                        </Text>
                    </List.Item>
                </List>
            </FlexBox>
        </Main>
    );
}