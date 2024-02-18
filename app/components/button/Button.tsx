import { LinksFunction } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import { Component, PropsWithChildren } from 'react';
import { Routes } from '~/enums/routes';
import buttonStyles from './Button.css';
import { Icons } from '~/enums/icons';
import { Icon, links as iconLinks } from '../icons/Icon';

interface ButtonProps extends PropsWithChildren {
    href?: string;
    to?: Routes;
    icon?: Icons;
    iconColor?: string;
    variant: 'primary' | 'secondary' | 'icon';
    onClick?: () => void;
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: buttonStyles },
    ...iconLinks(),
];

interface ButtonContentProps extends PropsWithChildren {
    icon?: Icons;
    iconColor?: string;
}

const ButtonContent = ({ icon, iconColor, children }: ButtonContentProps) => {
    if (icon) {
        return (
            <Icon
                name={icon}
                color={iconColor as string}
            />
        );
    }
    return children;
}

export const Button = ({ href, to, icon, iconColor, children, variant, onClick, }: ButtonProps) => {
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
            <ButtonContent
                icon={icon}
                iconColor={iconColor}
            >
                {children}
            </ButtonContent>
        </button>
    );
}