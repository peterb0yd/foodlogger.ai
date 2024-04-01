import { LinksFunction } from '@remix-run/node';
import styles from './Checkbox.css';
import { FlexBox } from '../flex-box/FlexBox';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles }
];

interface CheckboxProps {
    label?: string;
    name: string;
    disabled?: boolean;
    checked: boolean;
    onChange?: (checked: boolean) => void;
}

export const Checkbox = ({ label, name, disabled, checked, onChange }: CheckboxProps) => {
    return (
        <FlexBox gap="sm" name="Checkbox-Container">
            <input
                className="Checkbox"
                type="checkbox"
                data-disabled={!!disabled}
                id={name}
                value={name}
                checked={checked}
                onChange={(e) => onChange?.(e.target.checked)}
            />
            {label && (
                <label htmlFor={name}>{label}</label>
            )}
        </FlexBox>
    );
}