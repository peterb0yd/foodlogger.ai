import { LinksFunction } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import { PropsWithChildren } from 'react';
import { Routes } from '~/enums/routes';
import buttonStyles from './Button.css';

interface ButtonProps extends PropsWithChildren {
    href?: string;
    to?: Routes;
    variant: 'primary' | 'secondary';
    onClick?: () => void;
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: buttonStyles },
];

export const Button = ({ href, to, children, variant, onClick, }: ButtonProps) => {
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
        <button
            onClick={handleClick}
            data-variant={variant}
            className="Button"
        >
            {children}
        </button>
    );
}