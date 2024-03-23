import { LinksFunction } from '@remix-run/node';
import styles from './Main.css';
import { PropsWithChildren } from 'react';
import { Text, links as textLinks } from '../text/Text';
import { FlexBox } from '../flex-box/FlexBox';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...textLinks(),
];

interface MainProps extends PropsWithChildren {
    name: string;
    title?: string;
}

export const Main = ({ children, name, title }: MainProps) => {
    return (
        <main className={name}>
            <FlexBox col gap="xl" width="full">
                {title && (
                    <Text color="primary" size="md" weight="bold">{title}</Text>
                )}
                {children}
            </FlexBox>
        </main>
    );
}