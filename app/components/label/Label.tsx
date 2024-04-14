import { PropsWithChildren } from 'react';
import styles from './Label.css?url'
import { LinksFunction } from '@remix-run/node';
import { FlexBox, links as flexboxLinks } from '../flex-box/FlexBox';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...flexboxLinks(),
];

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, PropsWithChildren {
    text: string;
    name?: string;
    uppercase?: boolean;
    noEvents?: boolean;
    padLeft?: boolean;
}

export const Label = ({ text, padLeft, uppercase = true, name, noEvents, ...props }: LabelProps) => {
    return (
        <label
            className={`Label ${name ?? ''}`.trim()}
            data-uppercase={uppercase}
            data-no-events={noEvents}
            data-pad-left={padLeft}
            htmlFor={name}
            {...props}
        >
            {text}
        </label>
    );
}