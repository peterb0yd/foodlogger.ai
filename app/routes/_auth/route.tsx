import { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { MainLayout, links as layoutLinks } from "~/layout/main-layout/MainLayout";
import layoutStyles from './authLayout.styles.css';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: layoutStyles },
    ...layoutLinks(),
];

export default function AuthLayout() {
    return (
        <main className="AuthLayout">
            <Outlet />
        </main>
    );
}