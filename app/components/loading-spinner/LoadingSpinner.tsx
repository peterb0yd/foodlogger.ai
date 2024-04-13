import { LinksFunction } from "@remix-run/node";
import { ColorTypes } from "~/types/propTypes";
import styles from './LoadingSpinner.css?url';
import { IconNames } from "~/enums/icons";
import { Icon, links as iconLinks } from "../icon/Icon";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...iconLinks(),
];

interface LoadingSpinnerProps {
    color?: ColorTypes;
    position?: 'absolute' | 'relative';
}

export const LoadingSpinner = ({ color = 'muted', position = 'absolute' }: LoadingSpinnerProps) => (
    <div
        className="LoadingSpinner"
        data-position={position}
    >
        <Icon name={IconNames.LoadingDots} size="md" color={color} />
    </div>
)
