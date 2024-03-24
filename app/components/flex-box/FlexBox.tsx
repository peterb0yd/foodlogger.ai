import { LinksFunction } from '@remix-run/node';
import React, { PropsWithChildren } from 'react';
import flexBoxStyles from './FlexBox.css';

interface FlexBoxProps extends PropsWithChildren {
    col?: boolean;
    name?: string;
    padBottom?: '1/4' | '1/3' | '1/2';
    center?: boolean;
    grow?: boolean;
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
    align?: 'start' | 'end' | 'center' | 'stretch';
    wrap?: 'wrap' | 'reverse' | 'nowrap';
    gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    bg?: 'base' | 'muted' | 'contrast';
    padX?: 'xs' | 'sm' | 'md' | 'lg';
    border?: 'thin' | 'base' | 'muted' | 'contrast';
    borderRadius?: 'xs' | 'sm' | 'md' | 'rounded' | 'full';
    width?: 'full' | 'max';
    height?: 'full' | 'max';
    as?: 'main' | 'div' | 'ul' | 'ol' | 'span' | 'li' | 'section' | 'header' | 'aside';
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: flexBoxStyles },
];

export const FlexBox = ({
    col = false,
    name,
    justify = 'start',
    align = 'start',
    wrap = 'nowrap',
    as = 'div',
    height,
    width,
    padX,
    grow,
    center,
    gap,
    bg,
    border,
    borderRadius,
    padBottom,
    children,
}: FlexBoxProps) => {
    if (center) {
        align = "center";
        justify = "center";
    }
    const Component = as;
    return (
        <Component
            className={`FlexBox ${name ?? ''}`}
            data-col={col}
            data-grow={grow}
            data-width={width}
            data-height={height}
            data-justify={justify}
            data-align={align}
            data-padding-x={padX}
            data-wrap={wrap}
            data-gap={gap}
            data-bg={bg}
            data-border={border}
            data-border-radius={borderRadius}
            data-bottom-padding={padBottom}
        >
            {children}
        </Component>
    );
}