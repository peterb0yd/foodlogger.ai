import { useState, useRef, useEffect } from "react";

const MIME_TYPE = "audio/webm";

export const useAudioRecorder = (isRecording: boolean) => {
    const [audioURL, setAudioURL] = useState<string>("");
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const chunks = useRef<Blob[]>([]);

    useEffect(() => {
        if (!mediaRecorder.current) return;

        if (isRecording) {
            mediaRecorder.current.start();
        } else {
            mediaRecorder.current.stop();
        }
    }, [isRecording]);

    const setupAudioRecorder = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream as MediaStream);
            mediaRecorder.current.ondataavailable = (e) => {
                if (typeof e.data === "undefined") return;
                if (e.data.size === 0) return;
                chunks.current.push(e.data);
            }
            mediaRecorder.current.onstop = () => {
                //creates a blob file from the audiochunks data
                const audioBlob = new Blob(chunks.current, { type: mediaRecorder.current?.mimeType });
                //creates a playable URL from the blob file.
                const audioUrl = window.URL.createObjectURL(audioBlob);
                setAudioURL(audioUrl);
                chunks.current = [];
            };
        } catch (err) {
            console.error(`The following getUserMedia error occurred: ${err}`);
        }
    }

    return {
        audioURL,
        setupAudioRecorder,
    }
}