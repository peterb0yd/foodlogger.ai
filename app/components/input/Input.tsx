import { LinksFunction } from '@remix-run/node';
import inputStyles from './Input.css';
import { IconNames } from '~/enums/icons';
import { PropsWithChildren } from 'react';
import { Icon } from '../icon/Icon';
import { Label, links as labelLinks } from '../label/Label';

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
    defaultValue?: string;
    grow?: boolean;
    onChange?: (value: string) => void;
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: inputStyles },
    ...labelLinks(),
];

export const Input = ({ value, icon, size = 'md', type = 'text', defaultValue, name, label, pattern, grow, autoComplete, required, fullWidth, onChange }: InputProps) => {
    return (
        <Container icon={icon}>
            <Label
                name='Input-Label'
                data-full-width={fullWidth}
                data-flex-grow={grow}
            >
                {label}
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
                />
            </Label>
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