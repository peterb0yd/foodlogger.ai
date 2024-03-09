import { LinksFunction } from '@remix-run/node';
import selectStyles from './Select.css';

type Option = {
    value: string;
    label: string;
}

interface SelectProps {
    value: string;
    name: string;
    label: string;
    size?: 'sm' | 'md' | 'lg';
    options: Option[] | string[];
    autoComplete?: string;
    onSelect: (value: string) => void;
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: selectStyles },
];

export const Select = ({ value, name, size = 'md', label, options, autoComplete, onSelect }: SelectProps) => {
    let optionItems: Option[] = [];
    if (typeof options[0] === 'string') {
        optionItems = (options as string[]).map((option) => ({ value: option, label: option }));
    } else {
        optionItems = options as Option[];
    }

    return (
        <label
            className='Select'
            data-size={size}
        >
            {label}
            <select
                name={name}
                value={value}
                onChange={(e) => onSelect(e.target.value)}
                autoComplete={autoComplete}
            >
                {optionItems.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </label>
    );
}