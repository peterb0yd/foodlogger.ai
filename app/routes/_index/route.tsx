import { LinksFunction } from "@remix-run/node";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { PageRoutes } from "~/enums/routes";
import styles from './home.styles.css';
import { IconNames } from "~/enums/icons";
import { MainLayout, links as layoutLinks } from "~/layout/main-layout/MainLayout";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...layoutLinks(),
    ...textLinks(),
    ...flexBoxLinks(),
    ...buttonLinks(),
];

export default function Home() {
    return (
        <MainLayout>
            <MainLayout.Header />
            <MainLayout.Content>
                <div className="Home">
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
                </div>
            </MainLayout.Content>
        </MainLayout>
    );
}