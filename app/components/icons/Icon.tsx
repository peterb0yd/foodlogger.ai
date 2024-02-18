import { Icons } from "~/enums/icons"
import { CloseIcon, links as closeIconLinks } from "./CloseIcon"
import { RecordIcon, links as recordIconLinks } from "./RecordIcon"
import { SvgWrapperProps } from "./svg-wrapper/SvgWrapper";

export const links = () => [
    ...closeIconLinks(),
    ...recordIconLinks(),
];

export interface IconProps extends SvgWrapperProps {
    name: Icons;
}

export const Icon = ({ name, ...rest }: IconProps) => {
    switch (name) {
        case Icons.CloseIcon:
            return <CloseIcon {...rest} />;
        case Icons.RecordIcon:
            return <RecordIcon {...rest} />;
        default:
            return null;
    }
}
