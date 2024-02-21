import { useEffect, useState, useRef, useMemo } from "react";
import { LinksFunction } from "@remix-run/node";
import audioRecorderStyles from "./AudioRecorder.css";
import { Button } from "../button/Button";
import { Icons } from "~/enums/icons";
import { useAudioRecorder } from "~/hooks/useAudioRecorder";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: audioRecorderStyles },
];

interface AudioRecorderProps {
    onStart: () => void;
    onStop: (audioBlob: Blob) => void;
}

export const AudioRecorder = ({ onStart, onStop }: AudioRecorderProps) => {
    const [startPressed, setStartPressed] = useState(false);
    const { startRecording, stopRecording, isRecording, audioBlob } = useAudioRecorder();

    useEffect(() => {
        if (audioBlob) {
            onStop(audioBlob);
        }
    }, [audioBlob]);

    const handleStartRecording = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (startPressed) return;
        setStartPressed(true);
        startRecording();
    }

    const handleStopRecording = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!startPressed) return;
        setStartPressed(false);
        stopRecording();
    }

    return (
        <div className="AudioRecorder">
            <Button
                onTouchStart={handleStartRecording}
                onMouseDown={handleStartRecording}
                onTouchEnd={handleStopRecording}
                onMouseUp={handleStopRecording}
                onTouchCancel={handleStopRecording}
                onMouseLeave={handleStopRecording}
                icon={Icons.RecordIcon}
                iconColor={isRecording ? 'red' : 'gray'}
                iconSize="2xl"
            />
        </div>
    );
}
