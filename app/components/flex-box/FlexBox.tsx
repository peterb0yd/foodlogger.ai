import { LinksFunction } from '@remix-run/node';
import React, { PropsWithChildren } from 'react';
import flexBoxStyles from './FlexBox.css';

interface FlexBoxProps extends PropsWithChildren {
    col?: boolean;
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
    align?: 'start' | 'end' | 'center' | 'stretch';
    wrap?: 'wrap' | 'reverse' | 'nowrap';
    gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    bg?: 'base' | 'muted' | 'contrast';
    border?: 'thin' | 'base' | 'muted' | 'contrast';
    borderRadius?: 'xs' | 'sm' | 'md' | 'rounded';
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: flexBoxStyles },
];

export const FlexBox = ({
    col = false,
    justify = 'start',
    align = 'start',
    wrap = 'nowrap',
    gap,
    bg,
    border,
    borderRadius,
    children,
}: FlexBoxProps) => {
    return (
        <div
            className="FlexBox"
            data-col={col}
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