import { LinksFunction } from '@remix-run/node';
import modalStyles from './Modal.css';
import { PropsWithChildren } from 'react';
import { PageRoutes } from '~/enums/routes';
import { useNavigate } from '@remix-run/react';
import { Text, links as textLinks } from '../text/Text';
import { Button, links as buttonLinks } from '../button/Button';
import { IconNames } from '~/enums/icons';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: modalStyles },
    ...textLinks(),
    ...buttonLinks(),
];

const CloseButton = ({ goBackRoute }: { goBackRoute: PageRoutes }) => {
    const navigate = useNavigate();
    return (
        <div className="Modal-CloseButton">
            <Button
                variant="icon"
                icon={IconNames.CloseIcon}
                iconColor="contrast"
                iconSize='sm'
                onClick={() => navigate(goBackRoute)}
            />
        </div>
    );
}

interface ModalProps extends PropsWithChildren {
    goBackRoute?: PageRoutes;
    fullScreen?: boolean;
    contentWidth?: 'sm' | 'md' | 'lg';
}

export const Modal = ({ children, goBackRoute, contentWidth, fullScreen = false }: ModalProps) => {
    return (
        <div
            className="Modal"
            data-full-screen={fullScreen}
        >
            {goBackRoute && <CloseButton goBackRoute={goBackRoute} />}
            <div 
                className="container"
                data-content-width={contentWidth}
            >
                {children}
            </div>
        </div>
    );
}
