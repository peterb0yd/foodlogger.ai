import { LinksFunction } from "@remix-run/node";
import textStyles from "./Text.css?url";
import { PropsWithChildren } from "react";
import { ColorTypes, FontWeights } from "~/types/propTypes";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: textStyles },
];

interface TextProps extends PropsWithChildren {
    size?: "xs" | "sm" | "base" | "md" | "lg" | "xl" | "2xl" | "3xl";
    weight?: FontWeights;
    color?: ColorTypes;
    width?: "full" | "auto";
    lineHeight?: "none" | "tight" | "normal" | "loose";
    align?: "left" | "center" | "right";
    truncate?: boolean;
    italic?: boolean;
    underline?: boolean;
    uppercase?: boolean;
}

export const Text = ({ 
    size = "base", 
    weight = "regular", 
    color = "base", 
    lineHeight = "normal",
    truncate,
    align,
    width,
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
            data-width={width}
            data-truncate={truncate}
            data-italic={italic}
            data-underline={underline}
            data-uppercase={uppercase}
        >
            {children}
        </div>
    );
}