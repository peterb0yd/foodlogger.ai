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
    grow?: boolean;
    onChange?: (value: string) => void;
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: inputStyles },
];

export const Input = ({ value, icon, size = 'md', type = 'text', name, label, pattern, grow, autoComplete, required, fullWidth, onChange }: InputProps) => {
    return (
        <Container icon={icon}>
            <label
                className="Input"
                data-full-width={fullWidth}
                data-flex-grow={grow}
            >
                {label}
                <input
                    data-size={size}
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
    grow?: boolean;
    fullWidth?: boolean;
}

const Container = ({ icon, children, grow, fullWidth }: ContainerProps) => {
    if (icon) {
        return (
            <div
                className="InputWithIcon"
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