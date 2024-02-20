import { useEffect, useState, useRef, useMemo } from "react";
import { LinksFunction } from "@remix-run/node";
import audioRecorderStyles from "./AudioRecorder.css";
import { Button } from "../button/Button";
import { Icons } from "~/enums/icons";
import { useAudioRecorder } from "~/hooks/useAudioRecorder";
import { useMobileDevice } from "~/hooks/useMobileDevice";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: audioRecorderStyles },
];

interface AudioRecorderProps {
    onStart: () => void;
    onStop: (url: string) => void;
}

export const AudioRecorder = ({ onStart, onStop }: AudioRecorderProps) => {
    const { startRecording, stopRecording, isRecording, audioURL } = useAudioRecorder();
    const isMobile = useMobileDevice();
    const clickProps = useMemo(() => {
        if (isMobile) {
            return {
                onTouchStart: startRecording,
                onTouchEnd: stopRecording,
                onTouchCancel: stopRecording,
            };
        }
        return {
            onMouseDown: startRecording,
            onMouseUp: stopRecording,
            onMouseLeave: stopRecording,
        };
    }, [isMobile, startRecording, stopRecording]);

    return (
        <div className="AudioRecorder">
            <Button
                {...clickProps}
                icon={Icons.RecordIcon}
                iconColor={isRecording ? 'red' : 'gray'}
                iconSize="xl"
            />
        </div>
    );
}
