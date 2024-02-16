import { useNavigate } from '@remix-run/react';
import {PropsWithChildren} from 'react';
import { Routes } from '~/enums/routes';

interface ButtonProps extends PropsWithChildren {
    href?: string;
    to?: Routes;
    onClick?: () => void;
}

export const Button = ({ href, to, children, onClick, }: ButtonProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (href) {
            window.location.href = href;
        } else if (to) {
            navigate(to);
        } else if (onClick) {
            onClick();
        }
    }

    return (
        <button onClick={handleClick} className="Button">
            {children}
        </button>
    );
}