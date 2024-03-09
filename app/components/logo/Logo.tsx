import { LinksFunction } from '@remix-run/node';
import logoLinks from './Logo.css';
import { Text, links as textLinks } from '../text/Text';
import { FlexBox, links as flexBoxLinks } from '../flex-box/FlexBox';
import { Button, links as buttonLinks } from '../button/Button';
import { Icon, links as iconLinks } from '../icon/Icon';
import { PageRoutes } from '~/enums/routes';
import { IconNames } from '~/enums/icons';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: logoLinks },
    ...iconLinks(),
    ...flexBoxLinks(),
    ...buttonLinks(),
    ...textLinks(),
];

interface LogoProps {
    size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const Logo = ({ size = 'sm' }: LogoProps) => {
    return (
        <div
            className='Logo'
            data-size={size}
        >
            <Button
                to={PageRoutes.HOME}
                size='flush'
            >
                <FlexBox align="center" gap="sm">
                    <h4>foodlogger.ai</h4>
                    <Icon name={IconNames.PencilIcon} size="sm" color="secondary" />
                </FlexBox>
            </Button>
        </div>
    );
}