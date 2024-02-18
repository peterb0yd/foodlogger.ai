import { LinksFunction } from "@remix-run/node";
import { PropsWithChildren } from "react";
import svgStyles from './SvgWrapper.css';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: svgStyles },
];
export interface SvgWrapperProps extends PropsWithChildren {
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    color?: string;
    viewBox?: string;
}

const sizeMap = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
    '2xl': 96,
};

export const SvgWrapper = ({ children, viewBox, size = 'md' }: SvgWrapperProps) => {
    return (
        <svg
            className="SvgWrapper"
            width={sizeMap[size]}
            height={sizeMap[size]}
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
        >
            {children}
        </svg>
    );
}