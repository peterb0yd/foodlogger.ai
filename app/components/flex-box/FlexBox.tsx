import { LinksFunction } from '@remix-run/node';
import React, { PropsWithChildren } from 'react';
import flexBoxStyles from './FlexBox.css';

interface FlexBoxProps extends PropsWithChildren {
    col?: boolean;
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
    align?: 'start' | 'end' | 'center' | 'stretch';
    wrap?: 'wrap' | 'reverse' | 'nowrap';
    gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
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
        >
            {children}
        </div>
    );       
}