import { IconNames } from "~/enums/icons"
import { CloseIcon } from "./CloseIcon"
import { RecordIcon } from "./RecordIcon"
import { TrashIcon } from "./TrashIcon";
import { Fragment } from "react";

const colorMap = {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    muted: 'var(--color-text-muted)',
    contrast: 'var(--color-text-contrast)',
    base: 'var(--color-text)',
    destructive: 'var(--color-text-destructive)',
}

const sizeMap = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
    '2xl': 96,
};

type SizeMapKey = keyof typeof sizeMap;
type ColorMapKey = keyof typeof colorMap;

export interface IconProps {
    name: IconNames;
    size?: SizeMapKey;
    color?: ColorMapKey;
}

export const Icon = ({ name, size = 'md', color }: IconProps) => {

    const IconData = (() => {
        switch (name) {
            case IconNames.CloseIcon: return CloseIcon;
            case IconNames.RecordIcon: return RecordIcon;
            case IconNames.TrashIcon: return TrashIcon;
            default: return Fragment;
        }
    })();

    return (
        <svg
            className="SvgWrapper"
            width={sizeMap[size as SizeMapKey]}
            height={sizeMap[size as SizeMapKey]}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 1200"
        >
            <IconData
                color={colorMap[color as ColorMapKey]}
            />
        </svg>
    );
}
