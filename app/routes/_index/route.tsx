import { LinksFunction } from "@remix-run/node";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { PageRoutes } from "~/enums/routes";
import styles from './home.styles.css';
import { IconNames } from "~/enums/icons";
import { links as layoutLinks } from "~/layout/main-layout/MainLayout";
import { Main, links as mainLinks } from "~/components/main/Main";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...mainLinks(),
    ...layoutLinks(),
    ...textLinks(),
    ...flexBoxLinks(),
    ...buttonLinks(),
];

export default function Home() {
    return (
        <Main name="Home">
            <FlexBox center col gap="xl" width="full">
                <FlexBox col gap="md" align="center" width="full">
                    <Text size="lg" align="center" weight="black" lineHeight="tight">{`Meal tracking made simple.`}</Text>
                    <Text size="sm" align="center" lineHeight="tight">{`[I'm a work in progress. Don't judge me.]`}</Text>
                </FlexBox>
                <Button
                    to={PageRoutes.LOGS}
                    variant="secondary"
                    size="lg"
                    icon={IconNames.ChevronCircleIcon}
                    iconSide="right"
                >
                    Go to Logs
                </Button>
            </FlexBox>
        </Main>
    );
}