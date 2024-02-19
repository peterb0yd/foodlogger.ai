import { useState, useRef, useEffect } from "react";

const MIME_TYPE = "audio/webm";

export const useAudioRecorder = (isRecording: boolean) => {
    const [audioURL, setAudioURL] = useState<string>("");
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const mediaRecorder = useRef<MediaRecorder | null>(null);

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
            const media = new MediaRecorder(stream as MediaStream);
            mediaRecorder.current = media;
            mediaRecorder.current.ondataavailable = (e) => {
                if (typeof e.data === "undefined") return;
                if (e.data.size === 0) return;
                setAudioChunks(prev => [...prev, e.data]);
            }
            mediaRecorder.current.onstop = () => {
                //creates a blob file from the audiochunks data
                const audioBlob = new Blob(audioChunks, { type: mediaRecorder.current?.mimeType });
                //creates a playable URL from the blob file.
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioURL(audioUrl);
                setAudioChunks([]);
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