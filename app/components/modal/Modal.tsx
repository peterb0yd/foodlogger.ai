import { LinksFunction } from '@remix-run/node';
import modalStyles from './Modal.css';
import { PropsWithChildren } from 'react';
import { Routes } from '~/enums/routes';
import { useNavigate } from '@remix-run/react';
import { CloseIcon } from '../icons/CloseIcon';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: modalStyles },
];

const CloseButton = ({ goBackRoute }: { goBackRoute: Routes }) => {
    const navigate = useNavigate();
    return (
        <button
            className="close-button"
            onClick={() => navigate(goBackRoute)}
        >
            <CloseIcon size="md" />
        </button>
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
