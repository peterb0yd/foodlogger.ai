import { useEffect, useState, useRef, useMemo } from "react";
import { LinksFunction } from "@remix-run/node";
import audioRecorderStyles from "./AudioRecorder.css";
import { Button } from "../button/Button";
import { Icons } from "~/enums/icons";
import { useAudioRecorder } from "~/hooks/useAudioRecorder";
import { useMobileDevice } from "~/hooks/useMobileDevice";

const MIME_TYPE = "audio/webm";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: audioRecorderStyles },
];

interface AudioRecorderProps {
    onStart: () => void;
    onStop: () => void;
}

export const AudioRecorder = ({ onStart, onStop }: AudioRecorderProps) => {
    const { startRecording, stopRecording, isRecording, audioURL } = useAudioRecorder();
    const isMobile = useMobileDevice();
    const clickProps = useMemo(() => {
        if (isMobile) {
            return {
                onTouchStart: startRecording,
                onTouchEnd: stopRecording,
            };
        }
        return {
            onMouseDown: startRecording,
            onMouseUp: stopRecording,
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
            <audio controls={!!audioURL} src={audioURL} />
            {audioURL && (
                <a download href={audioURL}>
                    Download Recording
                </a>
            )}
        </div>
    );
}
