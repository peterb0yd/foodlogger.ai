import { LinksFunction } from "@remix-run/node";
import styles from './Divider.css?url';
import { Text, links as textLinks } from "../text/Text";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...textLinks(),
];

interface DividerProps {
    margin?: 'sm' | 'md' | 'lg'
    color?: 'highlight' | 'muted' | 'primary';
    betweenText?: string;
}

export const Divider = ({ margin = 'sm', color = 'highlight', betweenText }: DividerProps) => {
    if (betweenText) {
        return (
            <div
                className='Divider'
                data-margin={margin}
                data-color='transparent'
            >
                <div className='line' data-color={color} />
                <Text size="sm" color='muted'>{betweenText}</Text>
                <div className='line' data-color={color} />
            </div>
        );
    }

    return (
        <div
            className='Divider line'
            data-margin={margin}
            data-color={color}
        />
    );
};