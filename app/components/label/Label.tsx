import { PropsWithChildren } from 'react';
import styles from './Label.css?url'
import { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
];

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, PropsWithChildren {
    name?: string;
    uppercase?: boolean;
    noEvents?: boolean;
}

export const Label = ({ children, uppercase = true, name, noEvents, ...props }: LabelProps) => {
    return (
        <label 
            className={`Label ${name}`} 
            data-uppercase={uppercase}
            data-no-events={noEvents}
            {...props}
            >
            {children}
        </label>
    );
}