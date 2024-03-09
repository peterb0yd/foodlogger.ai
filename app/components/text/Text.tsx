import { LinksFunction } from "@remix-run/node";
import textStyles from "./Text.css";
import { PropsWithChildren } from "react";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: textStyles },
];

interface TextProps extends PropsWithChildren {
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
    weight?: "thin" | "light" | "regular" | "bold" | "extra-bold" | "black";
    color?: "base" | 'muted' | "contrast" | "primary" | "secondary";
    lineHeight?: "none" | "tight" | "normal" | "loose";
    align?: "left" | "center" | "right";
    italic?: boolean;
    underline?: boolean;
}

export const Text = ({ 
    size = "sm", 
    weight = "regular", 
    color = "base", 
    lineHeight = "normal",
    align,
    italic,
    underline,
    children 
}: TextProps) => {
    return (
        <div
            className="Text"
            data-size={size}
            data-weight={weight}
            data-line-height={lineHeight}
            data-color={color}
            data-align={align}
            data-italic={italic}
            data-underline={underline}
        >
            {children}
        </div>
    );
}