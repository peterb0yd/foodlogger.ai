import { LinksFunction } from '@remix-run/node';
import inputStyles from './Input.css';
import { IconNames } from '~/enums/icons';
import { PropsWithChildren } from 'react';
import { Icon } from '../icon/Icon';

interface InputProps {
    value?: string;
    name: string;
    label: string;
    size?: 'sm' | 'md' | 'lg';
    autoComplete?: string;
    pattern?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    icon?: IconNames;
    required?: boolean;
    fullWidth?: boolean;
    onChange?: (value: string) => void;
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: inputStyles },
];

export const Input = ({ value, icon, size = 'md', type = 'text', name, label, pattern, autoComplete, required, fullWidth, onChange }: InputProps) => {
    return (
        <Container icon={icon}>
            <label
                className="Input"
            >
                {label}
                <input
                    data-size={size}
                    data-full-width={fullWidth}
                    name={name}
                    type={type}
                    value={value}
                    pattern={pattern}
                    required={required}
                    onChange={(e) => onChange?.(e.target.value)}
                    autoComplete={autoComplete}
                />
            </label>
        </Container>
    );
}

interface ContainerProps extends PropsWithChildren {
    icon?: IconNames;
}

const Container = ({ icon, children }: ContainerProps) => {
    if (icon) {
        return (
            <div className="InputWithIcon">
                <Icon name={icon} size="lg" color="contrast" />
                {children}
            </div>
        );
    }
    return <>{children}</>;
}