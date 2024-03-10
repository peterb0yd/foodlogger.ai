import { LinksFunction } from "@remix-run/node";
import textStyles from "./Text.css";
import { PropsWithChildren } from "react";
import { ColorTypes } from "~/types/propTypes";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: textStyles },
];

interface TextProps extends PropsWithChildren {
    size?: "xs" | "sm" | "base" | "md" | "lg" | "xl" | "2xl" | "3xl";
    weight?: "thin" | "light" | "regular" | "bold" | "extra-bold" | "black";
    color?: ColorTypes;
    lineHeight?: "none" | "tight" | "normal" | "loose";
    align?: "left" | "center" | "right";
    italic?: boolean;
    underline?: boolean;
    uppercase?: boolean;
}

export const Text = ({ 
    size = "base", 
    weight = "regular", 
    color = "base", 
    lineHeight = "normal",
    align,
    italic,
    underline,
    uppercase,
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
            data-uppercase={uppercase}
        >
            {children}
        </div>
    );
}