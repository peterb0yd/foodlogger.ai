import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from "@remix-run/react";
import globalStyles from "~/styles/global.css?url";
import variables from "~/styles/variables.css?url";
import fonts from "~/styles/fonts.css?url";
import { MainLayout, links as mainLayoutLinks } from "~/layout/main-layout/MainLayout";
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonTheme } from "react-loading-skeleton";
import { SessionService } from "./api/modules/session/session.service";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: variables },
    { rel: "stylesheet", href: fonts },
    ...mainLayoutLinks(),
];

export const loader: LoaderFunction = async (context) => {
    const userId = await SessionService.getUserIdFromRequest(context.request);
    return { userId };
}

export default function App() {
    const { userId } = useLoaderData<typeof loader>();

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <link rel="manifest" href="/manifest.webmanifest" />
                <Links />
            </head>
            <body>
                <SkeletonTheme
                    baseColor="var(--color-surface-muted)"
                    highlightColor="var(--color-surface-highlight)"
                >
                    <MainLayout>
                        <MainLayout.Header userId={userId} />
                        <MainLayout.Content>
                            <Outlet />
                        </MainLayout.Content>
                    </MainLayout>
                </SkeletonTheme>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
