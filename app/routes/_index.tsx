
// export const links: LinksFunction = () => [
//     { rel: "stylesheet", href: styles },
// ];

import { Button } from "~/components/button/Button";
import { PageRoutes } from "~/enums/routes";

export default function Home() {
    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            <Button
                to={PageRoutes.LOGS}
            >
                Go to Logs
            </Button>
        </div>
    );
}