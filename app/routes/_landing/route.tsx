import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { Logo, links as logoLinks } from "~/components/logo/Logo";
import { Routes } from "~/enums/routes";
import { MainLayout, links as mainLayoutLinks } from "~/layout/main-layout/MainLayout";

export const meta: MetaFunction = () => {
    return [
        { title: "FoodLogger.ai" },
        { name: "description", content: "The easiest food logger ever made" },
    ];
};

export const links: LinksFunction = () => [
    ...mainLayoutLinks(),
    ...logoLinks(),
    ...flexBoxLinks(),
    ...buttonLinks(),
]

export default function Index() {
    return (
        <MainLayout>
            <MainLayout.Header />
            <MainLayout.Content>
                <Button variant="secondary" to={Routes.NEW_LOG}>Add Log</Button>
                <Outlet />
            </MainLayout.Content>
        </MainLayout>
    );
}
