import { LinksFunction } from '@remix-run/node';
import overlayStyles from './Overlay.css';
import { PropsWithChildren } from 'react';
import { Routes } from '~/enums/routes';
import { useNavigate } from '@remix-run/react';
import { CloseIcon } from '../icon/Close';

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
