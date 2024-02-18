import { LinksFunction } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import { Component, PropsWithChildren } from 'react';
import { Routes } from '~/enums/routes';
import buttonStyles from './Button.css';
import { Icons } from '~/enums/icons';
import { Icon, IconProps, links as iconLinks } from '../icons/Icon';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: buttonStyles },
    ...iconLinks(),
];

interface ButtonContentProps extends PropsWithChildren {
    icon?: IconProps['name'];
    iconColor?: IconProps['color'];
    iconSize?: IconProps['size'];
}

const ButtonContent = ({ icon, iconColor, iconSize, children }: ButtonContentProps) => {
    if (icon) {
        return (
            <Icon
                name={icon}
                color={iconColor}
                size={iconSize}
            />
        );
    }
    return children;
}

interface ButtonProps extends ButtonContentProps, Omit<React.HTMLProps<HTMLButtonElement>, 'type' | 'size'> {
    href?: string;
    to?: Routes;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'base' | 'primary' | 'secondary' | 'icon';
    onClick?: () => void;
}

/**
 * Button 
 * 
 * @param href
 *      The URL to navigate to when the button is clicked
 * @param to
 *      The app route to navigate to when the button is clicked
 * @param variant
 *      "base": a simple button with no styles
 *      "primary": a button with primary styles
 *      "secondary": a button with secondary styles
 *      "icon": a button with an icon and no text 
 *          - if an icon is provided, the variant will be "icon" by default 
 */
export const Button = ({ href, to, size, icon, iconColor, iconSize, children, variant = "base", onClick, ...rest }: ButtonProps) => {
    const navigate = useNavigate();

    // If the button has an icon, it should be an icon variant
    if (Boolean(icon)) {
        variant = 'icon';
    }

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
            {...rest}
            onClick={handleClick}
            data-variant={variant}
            data-size={size}
            className="Button"
        >
            <ButtonContent
                icon={icon}
                iconColor={iconColor}
                iconSize={iconSize}
            >
                {children}
            </ButtonContent>
        </button>
    );
}