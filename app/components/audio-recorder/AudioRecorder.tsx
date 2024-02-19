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
    const buttonColor = isRecording ? "red" : "green";

    useEffect(() => {
        const setupAudioStream = async () => {
            try {
                const initStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setStream(initStream);
                alert(initStream);
            } catch (err) {
                console.error(`The following getUserMedia error occurred: ${err}`);
                alert(JSON.stringify(err));
            }
        }

        if (navigator.mediaDevices) {
            setupAudioStream();
        } else {
            console.log("getUserMedia not supported on your browser!");
            alert("getUserMedia not supported on your browser!")
        }
    }, [navigator.mediaDevices]);

    const handleRecordingStart = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        setIsRecording(true);
        alert(stream);
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
    }

    const handleRecordingStop = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        setIsRecording(false);
        alert(mediaRecorder.current);
        if (!mediaRecorder.current) return;
        //stops the recording instancee
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: MIME_TYPE });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioURL(audioUrl);
            setAudioChunks([]);
        };
    }

    return (
        <div className="AudioRecorder">
            <p>test 5</p>
            <Button
                onTouchStart={handleRecordingStart}
                // onMouseDown={handleRecordingStart}
                onTouchEnd={handleRecordingStop}
                // onMouseUp={handleRecordingStop}
                icon={Icons.RecordIcon}
                iconColor={buttonColor}
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
