import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Outlet, json } from "@remix-run/react";
import { SessionService } from "~/api/modules/session/session.service";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { Logo, links as logoLinks } from "~/components/logo/Logo";
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

export const loader: LoaderFunction = async (context) => {
    const { request } = context;
    const userId = await SessionService.getUserIdFromRequest(request) as string;
    return json({ userId });
}

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
