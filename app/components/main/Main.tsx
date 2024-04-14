import { LinksFunction } from '@remix-run/node';
import styles from './Main.css?url';
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
    padBottom?: 'none' | '1/2' | '1/3';
}

export const Main = ({ children, name, title, subtitle, padBottom = 'none' }: MainProps) => {
    return (
        <main className={name} data-pad-bottom={padBottom}>
            <FlexBox justify="between">
                {title && (
                    <FlexBox col gap="md">
                        <Text color="primary" size="md" weight="bold">{title}</Text>
                        <SubtitleContent subtitle={subtitle} />
                    </FlexBox>
                )}
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