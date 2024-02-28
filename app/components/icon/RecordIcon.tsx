
import { IIconDataProps } from "./icon.interfaces";

export const RecordIcon = ({ color }: IIconDataProps) => (
    <>
        <circle cx="600" cy="600" r="590" stroke={color} strokeWidth="20" fill="none" />
        <circle cx="600" cy="600" r="500" fill={color} />
    </>
)