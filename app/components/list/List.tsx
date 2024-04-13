import { LinksFunction } from '@remix-run/node';
import styles from './List.css';
import { PropsWithChildren } from 'react';

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: styles }];
}

interface ListProps extends PropsWithChildren {
    variant?: 'base' | 'compact' | 'spacious' | 'gap-tight' | 'gap-loose';
    bg?: 'none' | 'muted' | 'soft';
    divider?: 'none' | 'base' | 'strong';
}

export const List = ({ children, variant = 'base', divider = 'base', bg='muted' }: ListProps) => {
    return (
        <ul 
            className={'List'} 
            data-background={bg}
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