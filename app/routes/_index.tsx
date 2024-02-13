import type { LinksFunction, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "FoodLogger.ai" },
        { name: "description", content: "The easiest food logger ever made" },
    ];
};

export default function Index() {
    return (
        <div>
            <h1>FoodLogger.ai</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
        </div>
    );
}
