import { LinksFunction } from '@remix-run/node';
import styles from './Input.css?url';
import { IconNames } from '~/enums/icons';
import { PropsWithChildren } from 'react';
import { Icon } from '../icon/Icon';
import { Label, links as labelLinks } from '../label/Label';
import { FlexBox, links as flexboxLinks } from '../flex-box/FlexBox';

interface InputProps {
    value?: string;
    name: string;
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    autoComplete?: string;
    pattern?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date';
    icon?: IconNames;
    required?: boolean;
    fullWidth?: boolean;
    defaultValue?: string;
    placeholder?: string;
    grow?: boolean;
    dark?: boolean;
    min?: number | string;
    max?: number | string;
    row?: boolean;
    onChange?: (val: string) => void;
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...labelLinks(),
    ...flexboxLinks(),
];

export const Input = ({ value, icon, placeholder, dark, min, max, size = 'md', type = 'text', defaultValue, name, label, pattern, grow, autoComplete, required, fullWidth, onChange }: InputProps) => {
    return (
        <Container icon={icon}>
            <FlexBox
                name='Input-Wrapper'
                width={fullWidth ? 'full' : undefined}
                grow={grow}
                col
            >
                {label && (
                    <Label text={label} name={name} />
                )}
                <input
                    data-size={size}
                    name={name}
                    type={type}
                    value={value}
                    defaultValue={defaultValue}
                    pattern={pattern}
                    required={required}
                    onChange={(e) => onChange?.(e.target.value)}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                />
            </FlexBox>
        </Container>
    );
}

interface ContainerProps extends PropsWithChildren {
    icon?: IconNames;
    grow?: boolean;
    fullWidth?: boolean;
}

const Container = ({ icon, children, grow, fullWidth }: ContainerProps) => {
    if (icon) {
        return (
            <div
                className="Input-With-Icon"
                data-full-width={fullWidth}
                data-flex-grow={grow}
            >
                <Icon name={icon} size="lg" color="contrast" />
                {children}
            </div>
        );
    }
    return <>{children}</>;
}