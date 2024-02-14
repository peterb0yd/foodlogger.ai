import { LinksFunction } from '@remix-run/node';
import logoLinks from './Logo.css';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: logoLinks },
];

export const Logo = ({ size = 'md' }: LogoProps) => {
    return (
        <div
            className="Logo"
            data-size={size}
        >
            <h2>FoodLogger.ai</h2>
        </div>
    );
}