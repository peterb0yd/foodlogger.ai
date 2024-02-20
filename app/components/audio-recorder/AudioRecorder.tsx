import { useEffect, useState, useRef } from "react";
import { LinksFunction } from "@remix-run/node";
import audioRecorderStyles from "./AudioRecorder.css";
import { Button } from "../button/Button";
import { Icons } from "~/enums/icons";
import { useAudioRecorder } from "~/hooks/useAudioRecorder";

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

    return (
        <div className="AudioRecorder">
            <p>test 21</p>
            <Button
                onTouchStart={() => startRecording?.()}
                onMouseDown={() => startRecording?.()}
                onTouchEnd={() => stopRecording?.()}
                onMouseUp={() => stopRecording?.()}
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
