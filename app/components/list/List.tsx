import { LinksFunction } from '@remix-run/node';
import styles from './List.css';
import { PropsWithChildren } from 'react';

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: styles }];
}

interface ListProps extends PropsWithChildren {
    variant?: 'base' | 'compact' | 'spacious';
    divider?: 'none' | 'base' | 'strong';
}

export const List = ({ children, variant = 'base', divider = 'base' }: ListProps) => {
    return (
        <ul 
            className={'List'} 
            data-variant={variant}
            data-divider={divider}
        >
            {children}
        </ul>
    );
}

List.Item = ({ children }: PropsWithChildren) => {
    return (
        <li className='List-Item'>
            {children}
        </li>
    );
}