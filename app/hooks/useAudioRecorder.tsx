import { useState, useRef, useEffect } from "react";

const MIME_TYPE = "audio/mpeg";

export const useAudioRecorder = () => {
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null); // [1
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const [isRecording, setIsRecording] = useState(false);

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
                    const audioBlob = new Blob(chunks, { type: MIME_TYPE });
                    setAudioBlob(audioBlob);
                    setIsRecording(false);
                    chunks = [];
                };
            } catch (err) {
                console.error(`The following getUserMedia error occurred: ${err}`);
            }
        }
        setupAudioRecorder();
    }, []);

    const startRecording = () => {
        setAudioBlob(null);
        setIsRecording(true);
        mediaRecorder.current?.start();
    }

    const stopRecording = () => {
        mediaRecorder.current?.stop();
    }

    return {
        audioBlob,
        isRecording,
        startRecording,
        stopRecording,
    }
}