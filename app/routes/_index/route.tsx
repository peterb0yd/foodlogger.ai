import { LinksFunction } from "@remix-run/node";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { PageRoutes } from "~/enums/routes";
import styles from './home.styles.css';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...textLinks(),
    ...flexBoxLinks(),
    ...buttonLinks(),
];

export default function Home() {
    return (
        <div className="Home">
            <FlexBox center col gap="lg">
                <Text size="lg" weight="bold">foodlogger.ai</Text>
                <Button
                    to={PageRoutes.LOGS}
                    variant="secondary"
                >
                    Go to Logs
                </Button>
            </FlexBox>
        </div>
    );
}