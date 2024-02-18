import { Icons } from "~/enums/icons"
import { CloseIcon, links as closeIconLinks } from "./CloseIcon"

export const links = () => [
    ...closeIconLinks(),
];

interface IconProps {
    name: Icons;
    color: string;
}

export const Icon = ({ name, ...rest }: IconProps) => {
    switch (name) {
        case Icons.CloseIcon:
            return <CloseIcon {...rest} />;
        default:
            return null;
    }
}
