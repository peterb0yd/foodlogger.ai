import { useEffect, useState, useRef } from "react";
import { LinksFunction } from "@remix-run/node";
import audioRecorderStyles from "./AudioRecorder.css";
import { Button } from "../button/Button";
import { Icons } from "~/enums/icons";

const MIME_TYPE = "audio/webm";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: audioRecorderStyles },
];

interface AudioRecorderProps {
    onStart: () => void;
    onStop: () => void;
}

export const AudioRecorder = ({ onStart, onStop }: AudioRecorderProps) => {
    const [audioURL, setAudioURL] = useState<string>("");
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const mediaRecorder = useRef<MediaRecorder | null>(null);

    useEffect(() => {
        const setupAudioStream = async () => {
            try {
                const initStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setStream(initStream);
            } catch (err) {
                console.error(`The following getUserMedia error occurred: ${err}`);
            }
        }

        if (navigator.mediaDevices) {
            setupAudioStream();
        } else {
            console.log("getUserMedia not supported on your browser!");
        }
    }, []);

    const handleRecordingStart = () => {
        if (!stream) return;
        const media = new MediaRecorder(stream as MediaStream, { mimeType: MIME_TYPE });
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        let localAudioChunks: Blob[] = [];
        mediaRecorder.current.ondataavailable = (e) => {
            if (typeof e.data === "undefined") return;
            if (e.data.size === 0) return;
            localAudioChunks.push(e.data);
        }
        setAudioChunks(localAudioChunks);
        setIsRecording(true);
    }

    const handleRecordingStop = () => {
        if (!mediaRecorder.current) return;
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: MIME_TYPE });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioURL(audioUrl);
            setAudioChunks([]);
        };
        setIsRecording(false);
    }

    const getColor = () => {
        if (mediaRecorder.current?.state === 'recording') {
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
            <audio controls src={audioURL} />
            {audioURL && (
                <a download href={audioURL}>
                    Download Recording
                </a>
            )}
        </div>
    );
}
