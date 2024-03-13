import { LinksFunction } from "@remix-run/node";
import textStyles from "./Text.css";
import { PropsWithChildren } from "react";
import { ColorTypes, FontWeights } from "~/types/propTypes";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: textStyles },
];

interface TextProps extends PropsWithChildren {
    size?: "xs" | "sm" | "base" | "md" | "lg" | "xl" | "2xl" | "3xl";
    weight?: FontWeights;
    color?: ColorTypes;
    lineHeight?: "none" | "tight" | "normal" | "loose";
    align?: "left" | "center" | "right";
    truncate?: boolean;
    italic?: boolean;
    underline?: boolean;
    uppercase?: boolean;
    customWidth?: string;
}

export const Text = ({ 
    size = "base", 
    weight = "regular", 
    color = "base", 
    lineHeight = "normal",
    customWidth,
    truncate,
    align,
    italic,
    underline,
    uppercase,
    children 
}: TextProps) => {
    const customWidthStyleProps = customWidth ? { width: customWidth } : {};

    return (
        <div
            className="Text"
            data-size={size}
            data-weight={weight}
            data-line-height={lineHeight}
            data-color={color}
            data-align={align}
            data-truncate={truncate}
            data-italic={italic}
            data-underline={underline}
            data-uppercase={uppercase}
            style={customWidthStyleProps}
        >
            {children}
        </div>
    );
}