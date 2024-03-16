import { IconNames } from "~/enums/icons"
import { CloseIcon } from "./CloseIcon"
import { RecordIcon } from "./RecordIcon"
import { TrashIcon } from "./TrashIcon";
import { ForwardedRef, Fragment, forwardRef } from "react";
import { ChevronCircleIcon } from "./ChevronCircleIcon";
import { PencilIcon } from "./PencilIcon";
import iconStyles from './Icon.css';
import { LinksFunction } from "@remix-run/node";
import { MicIcon } from "./MicIcon";
import { LoadingDots } from "./LoadingDots";
import { PlusIcon } from "./PlusIcon";
import { ChevronUp } from "./ChevronUp";
import { ChevronDown } from "./ChevronDown";
import { ColorTypes } from "~/types/propTypes";
import { RobotHead } from "./RobotHead";

const sizeMap = {
    xs: 16,
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
    '2xl': 96,
    '3xl': 128,
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

export const Icon = forwardRef(({ name, size = 'md', color }: IconProps, ref: ForwardedRef<SVGSVGElement>) => {

    const IconData = (() => {
        switch (name) {
            case IconNames.CloseIcon: return CloseIcon;
            case IconNames.RecordIcon: return RecordIcon;
            case IconNames.TrashIcon: return TrashIcon;
            case IconNames.ChevronCircleIcon: return ChevronCircleIcon;
            case IconNames.PencilIcon: return PencilIcon;
            case IconNames.MicIcon: return MicIcon;
            case IconNames.LoadingDots: return LoadingDots;
            case IconNames.PlusIcon: return PlusIcon;
            case IconNames.ChevronUp: return ChevronUp;
            case IconNames.ChevronDown: return ChevronDown;
            case IconNames.RobotHead: return RobotHead;
            default: return Fragment;
        }
    })();

    return (
        <svg
            className={`Icon ${name}`}
            data-color={color}
            width={sizeMap[size as SizeMapKey]}
            height={sizeMap[size as SizeMapKey]}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 1200"
            ref={ref}
        >
            <IconData />
        </svg>
    );
});
