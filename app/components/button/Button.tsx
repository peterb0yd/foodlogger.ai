import { LinksFunction } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import { Component, PropsWithChildren } from 'react';
import { PageRoutes } from '~/enums/routes';
import buttonStyles from './Button.css';
import { Icon, IconProps } from '../icon/Icon';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: buttonStyles },
];

interface BaseButtonProps extends PropsWithChildren {
    icon?: IconProps['name'];
    iconColor?: IconProps['color'];
    iconSize?: IconProps['size'];
    iconSide?: 'left' | 'right';
    variant?: 'base' | 'primary' | 'secondary' | 'rounded' | 'icon';
}

interface ButtonProps extends BaseButtonProps, Omit<React.HTMLProps<HTMLButtonElement>, 'type' | 'size'> {
    href?: string;
    to?: PageRoutes;
    size?: 'flush' | 'sm' | 'md' | 'lg';
    rounded?: boolean;
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
 *      "rounded": a circular button with no other styles
 *      "icon": a button with an icon and no text 
 *          - if an icon is provided, the variant will be "icon" by default 
 */
export const Button = ({ href, to, size = "sm", icon, iconSide, iconColor, iconSize = "sm", children, variant = "base", onClick, ...rest }: ButtonProps) => {
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
            {...rest}
            onClick={handleClick}
            data-variant={variant}
            data-icon-side={iconSide}
            data-size={size}
            className="Button"
        >
            <ButtonContent
                icon={icon}
                iconColor={iconColor}
                iconSize={iconSize}
                iconSide={iconSide}
                variant={variant}
            >
                {children}
            </ButtonContent>
        </button>
    );
}

const ButtonContent = ({ icon, iconColor, iconSize, iconSide = 'right', variant, children }: BaseButtonProps) => {
    if (icon && variant === 'icon') {
        return (
            <Icon
                name={icon}
                color={iconColor}
                size={iconSize}
            />
        );
    }
    if (icon) {
        return (
            <div className='content-with-icon' data-row-direction={iconSide}>
                {children}
                <Icon name={icon} color={iconColor} size={iconSize} />
            </div>
        );
    }
    return children;
}