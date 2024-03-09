import { LinksFunction } from "@remix-run/node";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { PageRoutes } from "~/enums/routes";
import styles from './home.styles.css';
import { IconNames } from "~/enums/icons";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...textLinks(),
    ...flexBoxLinks(),
    ...buttonLinks(),
];

export default function Home() {
    return (
        <div className="Home">
            <FlexBox center col gap="xl">
                <FlexBox col gap="md" align="center">
                <Text size="lg" weight="black" lineHeight="tight">{`Meal tracking made simple.`}</Text>
                <Text size="md" lineHeight="tight">{`[I'm a work in progress. Don't judge me.]`}</Text>
                </FlexBox>
                <Button
                    to={PageRoutes.LOGS}
                    variant="secondary"
                    icon={IconNames.ChevronCircleIcon}
                    iconSide="right"
                >
                    Go to Logs
                </Button>
            </FlexBox>
        </div>
    );
}