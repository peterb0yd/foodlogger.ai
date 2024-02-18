import { useEffect, useRef } from "react";
import { LinksFunction } from "@remix-run/node";
import audioRecorderStyles from "./AudioRecorder.css";
import { Button } from "../button/Button";
import { Icons } from "~/enums/icons";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: audioRecorderStyles },
];

interface AudioRecorderProps {
    onStart: () => void;
    onStop: () => void;
}

export const AudioRecorder = ({ onStart, onStop }: AudioRecorderProps) => {
    const mediaRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!audioRef.current) {
            return;
        }

        const setUpMediaRecorder = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRef.current = new MediaRecorder(stream);
                mediaRef.current.ondataavailable = (e) => {
                    chunksRef.current.push(e.data);
                };
                mediaRef.current.onstop = () => {
                    const blob = new Blob(chunksRef.current, { type: "audio/ogg; codecs=opus" });
                    console.log(chunksRef.current);
                    chunksRef.current = [];
                    const audioURL = window.URL.createObjectURL(blob);
                    console.log("Audio URL: ", audioURL);
                    audioRef.current!.src = audioURL;
                };
            } catch (err) {
                console.error(`The following getUserMedia error occurred: ${err}`);
            }
        }

        if (navigator.mediaDevices) {
            setUpMediaRecorder();
        } else {
            console.log("getUserMedia not supported on your browser!");
        }
    }, [mediaRef.current, audioRef.current]);

    const handleRecordingStart = () => {
        console.log('Recording started');
        mediaRef.current?.start();
        console.log(mediaRef.current);
    }

    const handleRecordingStop = () => {
        console.log('Recording stopped');
        mediaRef.current?.stop();
    }

    return (
        <div className="AudioRecorder">
            <Button
                onTouchStart={handleRecordingStart}
                onMouseDown={handleRecordingStart}
                onTouchEnd={handleRecordingStop}
                onMouseUp={handleRecordingStop}
                icon={Icons.RecordIcon}
                iconColor="red"
                iconSize="xl"
            />
            <audio controls ref={audioRef} />
        </div>
    );
}
