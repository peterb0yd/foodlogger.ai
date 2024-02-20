import { useState, useRef, useEffect } from "react";
import { useClient } from "./useClient";

const MIME_TYPE = "audio/webm";

export const useAudioRecorder = () => {
    const [audioURL, setAudioURL] = useState<string>("");
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const isClient = useClient();

    useEffect(() => {
        const setupAudioRecorder = async () => {
            try {
                let chunks: Blob[] = [];
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder.current = new MediaRecorder(stream as MediaStream);
                mediaRecorder.current.ondataavailable = (e) => {
                    if (typeof e.data === "undefined") return;
                    if (e.data.size === 0) return;
                    chunks.push(e.data);
                }
                mediaRecorder.current.onstop = () => {
                    //creates a blob file from the audiochunks data
                    const audioBlob = new Blob(chunks, { type: mediaRecorder.current?.mimeType });
                    //creates a playable URL from the blob file.
                    const audioUrl = window.URL.createObjectURL(audioBlob);
                    setAudioURL(audioUrl);
                    chunks = [];
                };
            } catch (err) {
                console.error(`The following getUserMedia error occurred: ${err}`);
            }
        }
        if (navigator?.mediaDevices) {
            setupAudioRecorder();
        }
    }, []);

    return {
        audioURL,
        isRecording,
        startRecording: () => {
            setIsRecording(true);
            mediaRecorder.current?.start();
        },
        stopRecording: () => {
            setIsRecording(false);
            mediaRecorder.current?.stop();
        }
    }
}