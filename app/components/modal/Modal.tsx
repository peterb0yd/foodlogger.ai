import { LinksFunction } from '@remix-run/node';
import modalStyles from './Modal.css';
import { PropsWithChildren } from 'react';
import { PageRoutes } from '~/enums/routes';
import { useNavigate } from '@remix-run/react';
import { Text, links as textLinks } from '../text/Text';
import { Button, links as buttonLinks } from '../button/Button';
import { IconNames } from '~/enums/icons';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: modalStyles },
    ...textLinks(),
    ...buttonLinks(),
];

const CloseButton = ({ goBackRoute }: { goBackRoute: PageRoutes }) => {
    const navigate = useNavigate();
    return (
        <div className="Modal-CloseButton">
            <Button
                variant="icon"
                icon={IconNames.CloseIcon}
                iconColor="contrast"
                iconSize='sm'
                onClick={() => navigate(goBackRoute)}
            />
        </div>
    );
}

interface ModalProps extends PropsWithChildren {
    goBackRoute?: PageRoutes;
    title?: string;
}

export const Modal = ({ children, title, goBackRoute }: ModalProps) => {
    return (
        <div className="Modal">
            {goBackRoute && <CloseButton goBackRoute={goBackRoute} />}
            {title && (
                <div className="title">
                    <Text size="xl" weight="bold" lineHeight='none'>{title}</Text>
                </div>
            )}
            <div className="container" data-has-title={!!title}>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
}
