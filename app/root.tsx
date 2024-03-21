import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import { useSWEffect, LiveReload } from '@remix-pwa/sw';
import globalStyles from "~/styles/global.css";
import variables from "~/styles/variables.css";
import fonts from "~/styles/fonts.css";
import { MainLayout, links as mainLayoutLinks } from "~/layout/main-layout/MainLayout";
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonTheme } from "react-loading-skeleton";

export const links: LinksFunction = () => [
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: variables },
    { rel: "stylesheet", href: fonts },
    ...mainLayoutLinks(),
];

export default function App() {
    useSWEffect();
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
                        <MainLayout.Header />
                        <MainLayout.Content>
                            <Outlet />
                        </MainLayout.Content>
                    </MainLayout>
                </SkeletonTheme>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
