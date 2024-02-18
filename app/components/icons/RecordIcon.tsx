import { LinksFunction } from "@remix-run/node";
import { SvgWrapper, SvgWrapperProps, links as svgLinks } from "./svg-wrapper/SvgWrapper";

export const links: LinksFunction = () => [
    ...svgLinks(),
];

export const RecordIcon = ({ size = 'md', color }: SvgWrapperProps) => (
    <SvgWrapper size={size} viewBox="0 0 1200 1200">
        <circle cx="600" cy="600" r="590" stroke={color} strokeWidth="20" fill="none" />
        <circle cx="600" cy="600" r="500" fill={color} />
    </SvgWrapper>
)