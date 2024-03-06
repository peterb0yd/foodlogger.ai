import { LinksFunction } from '@remix-run/node';
import logoLinks from './Logo.css';
import { Text, links as textLinks } from '../text/Text';
import { FlexBox, links as flexBoxLinks } from '../flex-box/FlexBox';
import { Button, links as buttonLinks } from '../button/Button';
import { PageRoutes } from '~/enums/routes';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: logoLinks },
    ...flexBoxLinks(),
    ...buttonLinks(),
    ...textLinks(),
];

interface LogoProps {
    size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const Logo = ({ size = 'sm' }: LogoProps) => {
    return (
        <div className='Logo'>
            <Button to={PageRoutes.HOME}>
                <h2>foodlogger.ai</h2>
            </Button>
        </div>
    );
}