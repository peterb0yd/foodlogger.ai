import { useState, useRef, useEffect } from "react";

const MIME_TYPE = "audio/webm";

export const useAudioRecorder = (isRecording: boolean) => {
    const [audioURL, setAudioURL] = useState<string>("");
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const mediaRecorder = useRef<MediaRecorder | null>(null);

    useEffect(() => {
        if (isRecording) {
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
        } else {
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
    }, [isRecording]);

    const setupAudioRecorder = async () => {
        try {
            const initStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setStream(initStream);
        } catch (err) {
            console.error(`The following getUserMedia error occurred: ${err}`);
        }
    }

    return {
        audioURL,
        setupAudioRecorder,
    }
}