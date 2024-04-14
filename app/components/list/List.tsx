import { LinksFunction } from '@remix-run/node';
import styles from './List.css?url';
import { PropsWithChildren } from 'react';
import { PadXTypes } from '~/types/propTypes';

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: styles }];
}

interface ListProps extends PropsWithChildren {
    variant?: 'base' | 'compact' | 'spacious' | 'gap-tight' | 'gap-loose';
    bg?: 'none' | 'muted' | 'soft';
    divider?: 'none' | 'base' | 'strong';
}

export const List = ({ children, variant = 'base', divider = 'base', bg = 'muted' }: ListProps) => {
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

interface ListItemProps extends PropsWithChildren {
    padX?: PadXTypes;
}

List.Item = ({ children, padX }: ListItemProps) => {
    return (
        <li
            className='List-Item'
            data-padding-x={padX}
        >
            {children}
        </li>
    );
}