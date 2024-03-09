import { LinksFunction } from '@remix-run/node';
import { PropsWithChildren } from 'react';
import { Logo, links as logoLinks } from '~/components/logo/Logo';
import styles from './MainLayout.css';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...logoLinks(),
];

export const MainLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="MainLayout">
            {children}
        </div>
    );
}

MainLayout.Content = ({ children }: PropsWithChildren) => {
    return (
        <div className="MainLayout-Content">
            {children}
        </div>
    );
}

MainLayout.Header = () => {
    return (
        <div className="MainLayout-Header">
            <Logo />
        </div>
    );
}