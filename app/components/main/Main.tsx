import { LinksFunction } from '@remix-run/node';
import styles from './Main.css';
import { PropsWithChildren } from 'react';
import { Text, links as textLinks } from '../text/Text';
import { FlexBox, links as flexboxLinks } from '../flex-box/FlexBox';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...textLinks(),
    ...flexboxLinks(),
];

interface MainProps extends PropsWithChildren {
    name: string;
    title?: string;
    subtitle?: React.ReactNode;
}

export const Main = ({ children, name, title, subtitle }: MainProps) => {
    return (
        <main className={name}>
            {title && (
                <FlexBox col gap="md">
                    <Text color="primary" size="md" weight="bold">{title}</Text>
                    {subtitle}
                </FlexBox>
            )}
            {children}
        </main>
    );
}