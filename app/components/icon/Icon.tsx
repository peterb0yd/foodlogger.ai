import { IconNames } from "~/enums/icons"
import { Close } from "./Close"
import { Record } from "./Record"
import { Trash } from "./Trash";
import { ForwardedRef, Fragment, forwardRef } from "react";
import { ChevronCircle } from "./ChevronCircle";
import { Pencil } from "./Pencil";
import styles from './Icon.css?url';
import { LinksFunction } from "@remix-run/node";
import { Mic } from "./Mic";
import { LoadingDots } from "./LoadingDots";
import { Plus } from "./Plus";
import { ChevronUp } from "./ChevronUp";
import { ChevronDown } from "./ChevronDown";
import { ColorTypes } from "~/types/propTypes";
import { RobotHead } from "./RobotHead";
import { ChevronLeft } from "./ChevronLeft";
import { ChevronRight } from "./ChevronRight";
import { CheckMark } from "./CheckMark";
import { Template } from "./Template";
import { Menu } from "./Menu";
import { LogOut } from "./LogOut";
import { Settings } from "./Settings";
import { Logs } from "./Logs";

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
    { rel: 'stylesheet', href: styles },
];

export const Icon = forwardRef(({ name, size = 'md', color }: IconProps, ref: ForwardedRef<SVGSVGElement>) => {

    const IconData = (() => {
        switch (name) {
            case IconNames.Close: return Close;
            case IconNames.Record: return Record;
            case IconNames.Trash: return Trash;
            case IconNames.ChevronCircle: return ChevronCircle;
            case IconNames.Pencil: return Pencil;
            case IconNames.Mic: return Mic;
            case IconNames.LoadingDots: return LoadingDots;
            case IconNames.Plus: return Plus;
            case IconNames.ChevronUp: return ChevronUp;
            case IconNames.ChevronDown: return ChevronDown;
            case IconNames.ChevronLeft: return ChevronLeft;
            case IconNames.ChevronRight: return ChevronRight;
            case IconNames.CheckMark: return CheckMark;
            case IconNames.Template: return Template;
            case IconNames.RobotHead: return RobotHead;
            case IconNames.Menu: return Menu;
            case IconNames.LogOut: return LogOut;
            case IconNames.Settings: return Settings;
            case IconNames.Logs: return Logs;
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
