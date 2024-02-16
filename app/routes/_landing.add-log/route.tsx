import { LinksFunction } from "@remix-run/node";
import { Aside, links as asideLinks } from "./aside/Aside";

export const links: LinksFunction = () => [
    ...asideLinks(),
];

export default function AddLog() {

    return (
        <div>
            <h1>Nest One</h1>
            <Aside />
        </div>
    );
}