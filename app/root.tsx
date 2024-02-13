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

export const links: LinksFunction = () => [
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: variables },
    { rel: "stylesheet", href: fonts },
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
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
