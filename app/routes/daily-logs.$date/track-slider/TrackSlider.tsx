import { LinksFunction } from '@remix-run/node';
import styles from './TrackSlider.css?url';
import { useState } from 'react';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
];

interface TrackSliderProps {
    value: number;
    onChange: (value: number) => void;
}

export const TrackSlider = ({ value = 50, onChange }: TrackSliderProps) => {
    
    // Determine the class for the emoji based on value
    const getEmojiClass = (value: number) => {
        const oneFifth = 100 / 5;
        if (value < oneFifth) return 'emoji-sad';
        if (value < (oneFifth * 2)) return 'emoji-kinda-sad';
        if (value < (oneFifth * 3)) return 'emoji-neutral';
        if (value < (oneFifth * 4)) return 'emoji-kinda-happy';
        return 'emoji-happy';
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.valueAsNumber);
    };

    return (
        <div className="slider-container">
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={handleChange}
                className={`range-slider ${getEmojiClass(value)}`}
            />
        </div>
    );
};