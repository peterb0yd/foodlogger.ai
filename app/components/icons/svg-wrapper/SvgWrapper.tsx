import { PropsWithChildren } from "react";

export interface SvgWrapperProps extends PropsWithChildren {
    size?: 'sm' | 'md' | 'lg';
    viewBox?: string;
}

const sizeMap = {
    sm: 24,
    md: 32,
    lg: 48,
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