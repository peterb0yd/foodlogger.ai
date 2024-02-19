import { useEffect, useState, useRef } from "react";
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
    const [audioSrc, setAudioSrc] = useState<string>("");
    const [chunks, setChunks] = useState<Blob[]>([]);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

    useEffect(() => {
        const setUpMediaRecorder = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRec = new MediaRecorder(stream);
                mediaRec.ondataavailable = (e) => {
                    setChunks((prev) => [...prev, e.data]);
                };
                mediaRec.onstop = () => {
                    const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
                    setChunks([]);
                    const audioURL = window.URL.createObjectURL(blob);
                    console.log("Audio URL: ", audioURL);
                    setAudioSrc(audioURL);
                };
                console.log("MediaRecorder: ", mediaRec);
                setMediaRecorder(mediaRec);
            } catch (err) {
                console.error(`The following getUserMedia error occurred: ${err}`);
            }
        }

        if (navigator.mediaDevices) {
            setUpMediaRecorder();
        } else {
            console.log("getUserMedia not supported on your browser!");
        }
    }, []);

    const handleRecordingStart = () => {
        if (!mediaRecorder) return;
        console.log('Recording started');
        mediaRecorder.start();
        setMediaRecorder(mediaRecorder);
    }

    const handleRecordingStop = () => {
        if (!mediaRecorder) return;
        console.log('Recording stopped');
        mediaRecorder.stop();
    }

    const getColor = () => {
        if (mediaRecorder?.state === 'recording') { 
            return 'red';
        } 
        return 'green';
    }

    return (
        <div className="AudioRecorder">
            <Button
                onTouchStart={handleRecordingStart}
                onMouseDown={handleRecordingStart}
                onTouchEnd={handleRecordingStop}
                onMouseUp={handleRecordingStop}
                icon={Icons.RecordIcon}
                iconColor={getColor()}
                iconSize="xl"
            />
            <audio controls src={audioSrc} />
        </div>
    );
}
