import { useEffect, useState, useRef, useMemo } from "react";
import { LinksFunction } from "@remix-run/node";
import audioRecorderStyles from "./AudioRecorder.css";
import { Button } from "../button/Button";
import { IconNames } from "~/enums/icons";
import { useAudioRecorder } from "~/hooks/useAudioRecorder";
import { Icon } from "../icon/Icon";
import { ColorTypes } from "~/types/propTypes";
import { LoadingSpinner, links as loadingSpinnerLinks } from "../loading-spinner/LoadingSpinner";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: audioRecorderStyles },
    ...loadingSpinnerLinks(),
];

interface AudioRecorderProps {
    onStart: () => void;
    onStop: (audioData: Blob) => void;
    isLoading: boolean;
}

export const AudioRecorder = ({ onStart, onStop, isLoading }: AudioRecorderProps) => {
    const [startPressed, setStartPressed] = useState(false);
    const { startRecording, stopRecording, isRecording, audioBlob } = useAudioRecorder();
    let color = 'primary';
    if (isLoading) {
        color = 'muted';
    } else if (isRecording) {
        color = 'destructive';
    }

    useEffect(() => {
        if (audioBlob) {
            onStop(audioBlob);
        }
    }, [audioBlob]);

    const handleStartRecording = (e: React.MouseEvent | React.TouchEvent) => {
        if (isLoading) return;
        e.preventDefault();
        e.stopPropagation();
        if (startPressed) return;
        setStartPressed(true);
        startRecording();
    }

    const handleStopRecording = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isLoading) return;
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
                size="flush"
                borderRadius="full"
                icon={IconNames.RecordIcon}
                iconColor={color as ColorTypes}
                iconSize="2xl"
            />
            <IconContent isLoading={isLoading} />
        </div>
    );
}

const IconContent = ({ isLoading }: { isLoading: boolean }) => {
    if (isLoading) {
        return (
            <LoadingSpinner color="contrast" />
        );
    }
    return <Icon name={IconNames.MicIcon} size="lg" color="contrast" />;
}
