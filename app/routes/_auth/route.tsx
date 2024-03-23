import { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { MainLayout, links as layoutLinks } from "~/layout/main-layout/MainLayout";
import layoutStyles from './authLayout.styles.css';
import { Main, links as mainLinks } from "~/components/main/Main";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: layoutStyles },
    ...layoutLinks(),
    ...mainLinks(),
];

export default function AuthLayout() {
    return (
        <Main name="AuthLayout">
            <Outlet />
        </Main>
    );
}