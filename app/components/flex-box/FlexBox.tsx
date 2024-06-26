import { LinksFunction } from '@remix-run/node';
import React, { PropsWithChildren } from 'react';
import styles from './FlexBox.css?url';
import { PadXTypes } from '~/types/propTypes';

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
    padX?: PadXTypes;
    border?: 'thin' | 'base' | 'muted' | 'contrast';
    borderRadius?: 'xs' | 'sm' | 'md' | 'rounded' | 'full';
    width?: 'full' | 'max' | 'global-max';
    height?: 'full' | 'max';
    reverse?: boolean;
    as?: 'main' | 'nav' | 'div' | 'ul' | 'ol' | 'span' | 'li' | 'section' | 'header' | 'aside';
    onClick?: () => void;
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
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
    reverse,
    border,
    borderRadius,
    padBottom,
    children,
    onClick,
    ...rest
}: FlexBoxProps) => {
    if (center) {
        align = "center";
        justify = "center";
    }
    const Component = as;
    const axis = col ? 'col' : 'row';
    const dir = reverse ? `${axis}-reverse` : axis;
    return (
        <Component
            className={`FlexBox ${name ?? ''}`.trim()}
            data-direction={dir}
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
            data-clickable={!!onClick}
            onClick={onClick}
            {...rest}
        >
            {children}
        </Component>
    );
}