import { LinksFunction } from "@remix-run/node";
import styles from './Divider.css';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
];

interface DividerProps {
    margin?: 'tight' | 'loose';
    color?: 'highlight' | 'muted' | 'primary';
}

export const Divider = ({ margin = 'tight', color = 'highlight' }: DividerProps) => {
    return (
        <div
            className='Divider'
            data-margin={margin}
            data-color={color}
        />
    );
};