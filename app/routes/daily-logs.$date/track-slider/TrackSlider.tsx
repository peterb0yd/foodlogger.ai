import { LinksFunction } from '@remix-run/node';
import styles from './TrackSlider.css?url';
import { Icon, links as iconLinks } from '~/components/icon/Icon';
import { IconNames } from '~/enums/icons';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    ...iconLinks(),
];

interface TrackSliderProps {
    value: number | null;
    onChange: (value: number) => void;
}

export const TrackSlider = ({ value, onChange }: TrackSliderProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.valueAsNumber);
    };

    // Determine the class for the emoji based on value
    const getEmojiClass = (value: number | null) => {
        if (value === null) return 'circle';
        const oneFifth = 100 / 5;
        if (value < oneFifth) return 'emoji-sad';
        if (value < (oneFifth * 2)) return 'emoji-kinda-sad';
        if (value < (oneFifth * 3)) return 'emoji-neutral';
        if (value < (oneFifth * 4)) return 'emoji-kinda-happy';
        return 'emoji-happy';
    };

    return (
        <div className="TrackSlider-Container">
            <input
                type="range"
                min="0"
                max="100"
                value={value ?? 50}
                onChange={handleChange}
                className={`TrackSlider ${getEmojiClass(value)}`}
            />
            {value === null && (
                <>
                    <Icon name={IconNames.ChevronLeft} size="md" color='soft' />
                    <Icon name={IconNames.ChevronLeft} size="md" color='soft' />
                    <Icon name={IconNames.ChevronLeft} size="md" color='soft' />
                    <Icon name={IconNames.ChevronRight} size="md" color='soft' />
                    <Icon name={IconNames.ChevronRight} size="md" color='soft' />
                    <Icon name={IconNames.ChevronRight} size="md" color='soft' />
                </>
            )}
        </div>
    );
};