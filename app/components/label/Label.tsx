import { PropsWithChildren } from 'react';
import styles from './Label.css'
import { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
];

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, PropsWithChildren {
    name?: string;
    uppercase?: boolean;
}

export const Label = ({ children, uppercase = true, name, ...props }: LabelProps) => {
    return (
        <label 
            className={`Label ${name}`} 
            data-uppercase={uppercase}
            {...props}
            >
            {children}
        </label>
    );
}