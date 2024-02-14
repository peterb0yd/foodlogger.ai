import type { LinksFunction, MetaFunction } from "@remix-run/node";
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
]

export default function Index() {
    return (
        <MainLayout>
            <MainLayout.Header />
            <MainLayout.Content>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </MainLayout.Content>
        </MainLayout>
    );
}
