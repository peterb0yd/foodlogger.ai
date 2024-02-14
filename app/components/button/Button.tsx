import React from 'react';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

export const Button = ({ onClick, children }: ButtonProps) => {
    return (
        <button onClick={onClick} className="Button">
            {children}
        </button>
    );
}