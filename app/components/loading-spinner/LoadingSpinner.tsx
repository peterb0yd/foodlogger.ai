import { LinksFunction } from "@remix-run/node";
import { ColorTypes } from "~/types/propTypes";
import styles from './LoadingSpinner.css';
import { IconNames } from "~/enums/icons";
import { Icon, links as iconLinks } from "../icon/Icon";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...iconLinks(),
];

interface LoadingSpinnerProps {
    color?: ColorTypes;
}

export const LoadingSpinner = ({ color = 'muted' }: LoadingSpinnerProps) => (
    <div className="LoadingSpinner">
        <Icon name={IconNames.LoadingDots} size="md" color={color} />
    </div>
)
