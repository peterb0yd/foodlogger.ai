import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
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

export const meta: MetaFunction = () => {
    const title = "FoodLogger.ai | The Easiest Meal Tracking App";
    const description = "Use FoodLogger.ai to quickly log your meals with voice recognition. The simplest way to track your diet!";
    const background = "https://www.foodlogger.ai/imgs/foodlogger-background.png";
    return [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width,initial-scale=1" },
        { name: "description", content: description },
        { name: "keywords", content: "meal tracking, voice recognition, nutrition, health, diet, food logging, ai" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:image", content: background },
        { property: "og:url", content: "https://www.foodlogger.ai" },
        { name: "twitter:card", content: background },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: background },
        // { name: "twitter:creator", content: "@yourtwitterhandle" },
        { rel: "icon", href: "/imgs/foodlogger-favicon-64.png", type:"image/png", sizes: "64x64" },
        { rel: "icon", href: "/imgs/foodlogger-favicon-128.png", type:"image/png", sizes: "128x128" },
        { rel: "icon", href: "/imgs/foodlogger-favicon-64.png", type:"image/png" },
        { rel: "apple-touch-icon", href: "/imgs/foodlogger-fav-128.png" },
        { rel: "manifest", href: "/manifest.webmanifest" }
    ];
};


export const loader: LoaderFunction = async (context) => {
    const userId = await SessionService.getUserIdFromRequest(context.request);
    return { userId };
}

export default function App() {
    const { userId } = useLoaderData<typeof loader>();

    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
                {/* png favicon */}
                <link rel="icon" type="image/png" href="/imgs/foodlogger-favicon-64.png" />
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
