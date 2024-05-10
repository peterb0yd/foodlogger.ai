import { LinksFunction } from '@remix-run/node';
import styles from './TextBox.css?url';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
];

interface TextBoxProps {
    value: string;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    rows?: number;
    onChange: (value: string) => void;
}

export const TextBox = ({ name, rows = 4, required, placeholder, disabled, value, onChange }: TextBoxProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
    };

    return (
        <textarea
            required={required}
            placeholder={placeholder}
            value={value}
            rows={rows}
            disabled={disabled}
            onChange={handleChange}
            className={`TextBox ${name ?? ''}`.trim()}
        />
    );
};