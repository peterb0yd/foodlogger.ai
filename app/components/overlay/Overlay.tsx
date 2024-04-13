import { LinksFunction } from '@remix-run/node';
import overlayStyles from './Overlay.css?url';
import { PropsWithChildren } from 'react';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: overlayStyles },
];

interface OverlayProps extends PropsWithChildren {
}

export const Overlay = ({ children }: OverlayProps) => {
    return (
        <div className="Overlay">
            {children}
        </div>
    );
}
