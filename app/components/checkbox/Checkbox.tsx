import { LinksFunction } from '@remix-run/node';
import styles from './Checkbox.css?url';
import { FlexBox } from '../flex-box/FlexBox';
import { Label } from '../label/Label';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles }
];

interface CheckboxProps {
    label?: string;
    name: string;
    disabled?: boolean;
    checked: boolean;
    gap?: 'sm' | 'md' | 'lg' | 'xl';
    spaced?: boolean;
    checkSide?: 'left' | 'right';
    padX?: 'sm' | 'md' | 'lg';
    onChange?: (checked: boolean) => void;
}

export const Checkbox = ({ label, name, gap = "sm", checkSide = 'left', spaced, padX = 'sm', disabled, checked, onChange }: CheckboxProps) => {
    const isReverse = checkSide === 'right';
    const justify = spaced ? 'between' : 'start';

    const handleClick = () => {
        onChange?.(!checked);
    }

    return (
        <FlexBox
            gap={gap}
            name="Checkbox-Container"
            width="full"
            justify={justify}
            align="center"
            reverse={isReverse}
            onClick={handleClick}
            data-pad-x={padX}
        >
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
                <Label htmlFor={name} uppercase={false}>{label}</Label>
            )}
        </FlexBox>
    );
}