import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Outlet, json, redirect } from "@remix-run/react";
import { SessionService } from "~/api/modules/session/session.service";
import { links as buttonLinks } from "~/components/button/Button";
import { links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { links as logoLinks } from "~/components/logo/Logo";
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
                <Outlet />
            </MainLayout.Content>
        </MainLayout>
    );
}
