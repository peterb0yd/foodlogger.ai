import { LinksFunction } from '@remix-run/node';
import React, { PropsWithChildren } from 'react';
import flexBoxStyles from './FlexBox.css';

interface FlexBoxProps extends PropsWithChildren {
    col?: boolean;
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
    flexWrap?: 'wrap' | 'wrap-reverse' | 'nowrap';
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: flexBoxStyles },
];

export const FlexBox = ({
    col = false,
    justifyContent = 'flex-start',
    alignItems = 'flex-start',
    flexWrap = 'nowrap',
    children,
}: FlexBoxProps) => {
    return (
        <div
            className="FlexBox"
            data-flex-col={col}
            data-flex-center={alignItems === 'center'}
            data-flex-end={justifyContent === 'flex-end'}
            data-flex-start={justifyContent === 'flex-start'}
            data-flex-space-between={justifyContent === 'space-between'}
            data-flex-space-around={justifyContent === 'space-around'}
            data-flex-space-evenly={justifyContent === 'space-evenly'}
            data-flex-wrap={flexWrap === 'wrap'}
            data-flex-wrap-reverse={flexWrap === 'wrap-reverse'}
            data-flex-nowrap={flexWrap === 'nowrap'}
            data-flex-stretch={alignItems === 'stretch'}
        >
            {children}
        </div>
    );       
}