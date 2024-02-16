import { LinksFunction } from "@remix-run/node";
import asideStyles from "./Aside.css";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: asideStyles },
]

export const Aside = () => {
    return (
        <div className="Aside">
            <h1>Aside</h1>
        </div>
    );
}