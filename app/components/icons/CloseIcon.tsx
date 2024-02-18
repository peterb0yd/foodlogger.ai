import { LinksFunction } from "@remix-run/node";
import { SvgWrapper, SvgWrapperProps, links as svgLinks } from "./svg-wrapper/SvgWrapper";

export const links: LinksFunction = () => [
    ...svgLinks(),
];

export const CloseIcon = ({ size = 'md', color }: SvgWrapperProps) => (
    <SvgWrapper size={size} viewBox="0 0 1200 1200">
        <path fill={color} d="m726 600 417.6-417.6c34.801-34.801 34.801-91.199 0-126-34.801-34.801-91.199-34.801-126 0l-417.6 417.6-417.6-417.6c-34.801-34.801-91.199-34.801-126 0-34.801 34.801-34.801 91.199 0 126l417.6 417.6-417.6 417.6c-34.801 34.801-34.801 91.199 0 126 16.801 16.801 39.602 26.398 62.398 26.398 22.801 0 45.602-8.3984 62.398-26.398l418.8-417.6 417.6 417.6c16.801 16.801 39.602 26.398 62.398 26.398 22.801 0 45.602-8.3984 62.398-26.398 34.801-34.801 34.801-91.199 0-126z" />
    </SvgWrapper>
)