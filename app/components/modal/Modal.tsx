import { LinksFunction } from '@remix-run/node';
import modalStyles from './Modal.css';
import { PropsWithChildren } from 'react';
import { Routes } from '~/enums/routes';
import { useNavigate } from '@remix-run/react';
import { CloseIcon } from '../icons/CloseIcon';
import { Button } from '../button/Button';
import { Icons } from '~/enums/icons';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: modalStyles },
];

const CloseButton = ({ goBackRoute }: { goBackRoute: Routes }) => {
    const navigate = useNavigate();
    return (
        <div className="Modal-CloseButton">
            <Button
                variant="icon"
                icon={Icons.CloseIcon}
                iconColor="var(--color-text)"
                onClick={() => navigate(goBackRoute)}
            />
        </div>
    );
}

interface ModalProps extends PropsWithChildren {
    goBackRoute?: Routes;
}

export const Modal = ({ children, goBackRoute }: ModalProps) => {
    return (
        <div className="Modal">
            {goBackRoute && <CloseButton goBackRoute={goBackRoute} />}
            {children}
        </div>
    );
}
