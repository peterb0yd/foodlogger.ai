import { Fragment, PropsWithChildren } from 'react';

interface RepeaterProps extends PropsWithChildren {
    count: number;
}

export const Repeater = ({ count, children }: RepeaterProps) => {
    return (
        <>
            {Array.from({ length: count })
                .map((_, i) => i)
                .map(i => (
                    <Fragment key={i}>{children}</Fragment>
                ))}
        </>
    );
};