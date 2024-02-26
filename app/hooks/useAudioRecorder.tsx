import { useState, useRef, useEffect } from "react";
import { MIME_TYPE } from "~/api/utils/constants";

const audioTypes = ["webm", "mpeg", "ogg", "mp3", "x-matroska"];
const codecs = ["should-not-be-supported", "vp9", "vp9.0", "vp8", "vp8.0", "avc1", "av1", "h265", "h.265", "h264", "h.264", "opus", "pcm", "aac", "mpeg", "mp4a"];

function getSupportedAudioMimeType() {
    const isSupported = MediaRecorder.isTypeSupported;
    audioTypes.forEach((type) => {
        const mimeType = `audio/${type}`;
        codecs.forEach((codec) => [
            `${mimeType};codecs=${codec}`,
            `${mimeType};codecs=${codec.toUpperCase()}`,
        ].forEach(variation => {
            if (isSupported(variation))
                return variation;
        }));
    });
    return null;
};



export const useAudioRecorder = () => {
    const [audioFile, setAudioFile] = useState<File | null>(null); // [1
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        const setupAudioRecorder = async () => {
            try {
                let chunks: Blob[] = [];
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mimeType = getSupportedAudioMimeType();
                mediaRecorder.current = new MediaRecorder(stream as MediaStream, {
                    audioBitsPerSecond: 32000,
                    ...(mimeType ? { mimeType } : {}),
                });
                mediaRecorder.current.ondataavailable = (e) => {
                    if (typeof e.data === "undefined") return;
                    if (e.data.size === 0) return;
                    chunks.push(e.data);
                }
                mediaRecorder.current.onstop = async () => {
                    //creates a blob file from the audiochunks data
                    const audioBlob = new Blob(chunks);
                    const file = new File([audioBlob], "audio.mp3");
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