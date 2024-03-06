import { LinksFunction } from '@remix-run/node';
import React, { PropsWithChildren } from 'react';
import flexBoxStyles from './FlexBox.css';

interface FlexBoxProps extends PropsWithChildren {
    col?: boolean;
    center?: boolean;
    grow?: boolean;
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
    align?: 'start' | 'end' | 'center' | 'stretch';
    wrap?: 'wrap' | 'reverse' | 'nowrap';
    gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    bg?: 'base' | 'muted' | 'contrast';
    border?: 'thin' | 'base' | 'muted' | 'contrast';
    borderRadius?: 'xs' | 'sm' | 'md' | 'rounded' | 'full';
    width?: 'full' | 'max';
    height?: 'full' | 'max';
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: flexBoxStyles },
];

export const FlexBox = ({
    col = false,
    justify = 'start',
    align = 'start',
    wrap = 'nowrap',
    width = 'max',
    height = 'max',
    grow,
    center,
    gap,
    bg,
    border,
    borderRadius,
    children,
}: FlexBoxProps) => {
    if (center) {
        align = "center";
        justify = "center";
    }
    return (
        <div
            className="FlexBox"
            data-col={col}
            data-grow={grow}
            data-width={width}
            data-height={height}
            data-justify={justify}
            data-align={align}
            data-wrap={wrap}
            data-gap={gap}
            data-bg={bg}
            data-border={border}
            data-border-radius={borderRadius}
        >
            {children}
        </div>
    );
}