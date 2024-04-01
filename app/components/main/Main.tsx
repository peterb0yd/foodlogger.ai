import { LinksFunction } from '@remix-run/node';
import styles from './Main.css';
import { PropsWithChildren } from 'react';
import { Text, links as textLinks } from '../text/Text';
import { FlexBox, links as flexboxLinks } from '../flex-box/FlexBox';
import { IconNames } from '~/enums/icons';
import { Button, links as buttonLinks } from '../button/Button';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...textLinks(),
    ...flexboxLinks(),
    ...buttonLinks(),
];

interface MainProps extends PropsWithChildren {
    name: string;
    title?: string;
    subtitle?: React.ReactNode;
    hasMenu?: boolean;
}

export const Main = ({ children, name, title, subtitle, hasMenu }: MainProps) => {
    return (
        <main className={name}>
            <FlexBox justify="between">
                {title && (
                    <FlexBox col gap="md">
                        <Text color="primary" size="md" weight="bold">{title}</Text>
                        <SubtitleContent subtitle={subtitle} />
                    </FlexBox>
                )}
                {/* {hasMenu && (
                    <Button
                        variant="muted"
                        name="Menu"
                        icon={IconNames.Menu}
                        iconColor='base'
                        iconSize='lg'
                        borderRadius='sm'
                        size="flush"
                    />
                )} */}
            </FlexBox>
            {children}
        </main>
    );
}

const SubtitleContent = ({ subtitle }: { subtitle?: MainProps['subtitle'] }) => {
    if (!subtitle) return null;

    if (typeof subtitle === 'string') {
        return (
            <Text color="muted" size="sm">{subtitle}</Text>
        );
    }

    return subtitle;
}