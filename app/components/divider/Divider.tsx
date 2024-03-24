import { LinksFunction } from "@remix-run/node";
import styles from './Divider.css';
import { Text, links as textLinks } from "../text/Text";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...textLinks(),
];

interface DividerProps {
    margin?: 'tight' | 'loose';
    color?: 'highlight' | 'muted' | 'primary';
    betweenText?: string;
}

export const Divider = ({ margin = 'tight', color = 'highlight', betweenText }: DividerProps) => {
    if (betweenText) {
        return (
            <div
                className='Divider'
                data-margin={margin}
                data-color='transparent'
            >
                <div className='line' />
                <Text size="sm" color={color}>{betweenText}</Text>
                <div className='line' />
            </div>
        );
    }

    return (
        <div
            className='Divider'
            data-margin={margin}
            data-color={color}
        />
    );
};