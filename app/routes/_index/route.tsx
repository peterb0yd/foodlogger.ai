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
                <FlexBox col gap="md" align="center" width="full">
                    <Text size="xl" align="center" weight="black" lineHeight="tight">{`Meal tracking made simple.`}</Text>
                    <Text size="md" align="center" weight="bold" color="muted" lineHeight="tight">{`Tell AI what you ate and let it do your tracking for you.`}</Text>
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
                        <Text size="xl" color="primary" weight="bold">{`1. Fast logging using voice`}</Text>
                        <Text size="md" color="highlight">
                            {`Voice recognition is easier than navigating a bunch of dropdowns and inputs. Say what you ate and let AI figure out the details.`}
                        </Text>
                    </List.Item>
                    <List.Item col align="left" padX="md">
                        <Text size="xl" color="primary" weight="bold">{`2. Save time with templates`}</Text>
                        <Text size="md" color="highlight">
                            {`It's true, logging everything you eat is time-consuming. Use templates to speed it up. Save your favorite snacks, drinks and meals and log them with a single button.`}
                        </Text> 
                    </List.Item>
                    <List.Item col align="left" padX="md">
                        <Text size="xl" color="primary" weight="bold">{`3. Track mood, energy, bowels and more`}</Text>
                        <Text size="md" color="highlight">
                            {`It turns out what we eat impacts more than just our weight. Track your mood, bowel movements, energy levels, sleep and more to see how your diet affects your overall mood and health.`}
                        </Text> 
                    </List.Item>
                    <List.Item col align="left" padX="md">
                        <Text size="xl" color="primary" weight="bold">{`4. Easy sign up & log in`}</Text>
                        <Text size="md" color="highlight">
                            {`Input your name and email... or not. We don't care. Log in and sign up with only a phone number. Password and personal info is not required.`}
                        </Text>
                    </List.Item>
                    <List.Item col align="left" padX="md">
                        <Text size="xl" color="primary" weight="bold">{`5. Image recognition (coming soon)`}</Text>
                    </List.Item>
                    <List.Item col align="left" padX="md">
                        <Text size="xl" color="primary" weight="bold">{`6. Calorie & macronutrient breakdown (coming soon)`}</Text>
                    </List.Item>
                </List>
            </FlexBox>
        </Main>
    );
}