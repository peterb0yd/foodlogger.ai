import { LinksFunction } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import { ForwardedRef, PropsWithChildren, forwardRef, useMemo, useRef } from 'react';
import { PageRoutes } from '~/enums/routes';
import buttonStyles from './Button.css';
import { Icon, IconProps } from '../icon/Icon';
import { LoadingSpinner, links as loadingSpinnerLinks } from '../loading-spinner/LoadingSpinner';
import { ColorTypes } from '~/types/propTypes';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: buttonStyles },
    ...loadingSpinnerLinks(),
];

interface BaseButtonProps extends PropsWithChildren {
    icon?: IconProps['name'];
    iconColor?: IconProps['color'];
    iconSize?: IconProps['size'];
    iconSide?: 'left' | 'right';
    variant?: 'base' | 'primary' | 'secondary' | 'muted' | 'icon';
    loading?: boolean;
    color?: ColorTypes;
    buttonDimensions?: {
        innerWidth: number;
        innerHeight: number;
    };
}

interface ButtonProps extends BaseButtonProps, Omit<React.HTMLProps<HTMLButtonElement>, 'type' | 'size' | 'color'> {
    href?: string;
    to?: PageRoutes;
    size?: 'flush' | 'xs' | 'sm' | 'md' | 'lg';
    border?: 'none' | 'thin' | 'base' | 'thick' | 'muted' | 'contrast';
    borderRadius?: 'xs' | 'sm' | 'md' | 'rounded' | 'full';
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
        "muted": a button with muted background
 *      "rounded": a circular button with no other styles
 *      "icon": a button with an icon and no text 
 *          - if an icon is provided, the variant will be "icon" by default 
 */
export const Button = ({
    href,
    to,
    size = "sm",
    icon,
    iconSide,
    iconColor,
    border = 'none',
    borderRadius,
    iconSize = "sm",
    children,
    variant = "base",
    loading,
    disabled,
    color,
    onClick,
    ...rest
}: ButtonProps) => {
    const navigate = useNavigate();
    const buttonRef = useRef<HTMLDivElement>(null);
    const buttonDimensions = useMemo(() => {
        if (buttonRef.current) {
            return {
                innerWidth: buttonRef.current.offsetWidth,
                innerHeight: buttonRef.current.offsetHeight,
            }
        }
    }, [buttonRef.current]);

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
            data-border={border}
            data-border-radius={borderRadius}
            disabled={disabled || loading}
            className="Button"
        >
            <ButtonContent
                icon={icon}
                iconColor={iconColor}
                iconSize={iconSize}
                iconSide={iconSide}
                variant={variant}
                loading={loading}
                color={color}
                buttonDimensions={buttonDimensions}
                ref={buttonRef}
            >
                {children}
            </ButtonContent>
        </button>
    );
}

const ButtonContent = forwardRef(({ icon, iconColor, iconSize, iconSide = 'right', buttonDimensions, color, loading, variant, children }: BaseButtonProps, ref: ForwardedRef<HTMLDivElement | SVGSVGElement>) => {
    if (loading) {
        const { innerWidth, innerHeight } = buttonDimensions ?? {};
        return (
            <div style={{ width: innerWidth, height: innerHeight }}>
                <LoadingSpinner color="contrast" />
            </div>
        );
    }
    if (icon && variant === 'icon') {
        return (
            <Icon
                name={icon}
                color={iconColor ?? color}
                size={iconSize}
                ref={ref as ForwardedRef<SVGSVGElement>}
            />
        );
    }
    if (icon) {
        return (
            <div
                className='content-with-icon'
                data-row-direction={iconSide}
                data-color={color}
                ref={ref as ForwardedRef<HTMLDivElement>}
            >
                {children}
                <Icon name={icon} color={iconColor} size={iconSize} />
            </div>
        );
    }
    return (
        <div data-color={color} ref={ref as ForwardedRef<HTMLDivElement>}>
            {children}
        </div>
    );
});