import { IconNames } from "~/enums/icons"
import { CloseIcon } from "./CloseIcon"
import { RecordIcon } from "./RecordIcon"
import { TrashIcon } from "./TrashIcon";
import { Fragment } from "react";
import { ChevronCircleIcon } from "./ChevronCircleIcon";
import { PencilIcon } from "./PencilIcon";
import iconStyles from './Icon.css';
import { LinksFunction } from "@remix-run/node";

type ColorTypes = 'primary' | 'secondary' | 'base' | 'muted' | 'contrast' | 'destructive';

const sizeMap = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
    '2xl': 96,
};

type SizeMapKey = keyof typeof sizeMap;

export interface IconProps {
    name: IconNames;
    size?: SizeMapKey;
    color?: ColorTypes;
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: iconStyles },
];

export const Icon = ({ name, size = 'md', color }: IconProps) => {

    const IconData = (() => {
        switch (name) {
            case IconNames.CloseIcon: return CloseIcon;
            case IconNames.RecordIcon: return RecordIcon;
            case IconNames.TrashIcon: return TrashIcon;
            case IconNames.ChevronCircleIcon: return ChevronCircleIcon;
            case IconNames.PencilIcon: return PencilIcon;
            default: return Fragment;
        }
    })();

    return (

        <svg
            className="Icon"
            data-color={color}
            width={sizeMap[size as SizeMapKey]}
            height={sizeMap[size as SizeMapKey]}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 1200"
        >
            <IconData />
        </svg>
    );
}
