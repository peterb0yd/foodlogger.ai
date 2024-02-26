import { useState, useRef, useEffect } from "react";
import { MIME_TYPE } from "~/api/utils/constants";

export const useAudioRecorder = () => {
    const [audioFile, setAudioFile] = useState<File | null>(null); // [1
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        const setupAudioRecorder = async () => {
            try {
                let chunks: Blob[] = [];
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder.current = new MediaRecorder(stream as MediaStream, {
                    mimeType: MIME_TYPE,
                    audioBitsPerSecond: 128000,
                    bitsPerSecond: 128000,
                });
                mediaRecorder.current.ondataavailable = (e) => {
                    if (typeof e.data === "undefined") return;
                    if (e.data.size === 0) return;
                    chunks.push(e.data);
                }
                mediaRecorder.current.onstop = async () => {
                    //creates a blob file from the audiochunks data
                    const audioBlob = new Blob(chunks, { type: MIME_TYPE });
                    const file = new File([audioBlob], "audio.mp3", { type: MIME_TYPE });
                    setAudioFile(file as File);
                    setIsRecording(false);
                    chunks = [];
                };
                mediaRecorder.current.onerror = (err) => {
                    console.error(`The following MediaRecorder error occurred: ${err}`);
                }
            } catch (err) {
                console.error(`The following getUserMedia error occurred: ${err}`);
            }
        }
        setupAudioRecorder();
    }, []);

    const startRecording = () => {
        setAudioFile(null);
        setIsRecording(true);
        mediaRecorder.current?.start();
    }

    const stopRecording = () => {
        mediaRecorder.current?.stop();
    }

    return {
        audioFile,
        isRecording,
        startRecording,
        stopRecording,
    }
}