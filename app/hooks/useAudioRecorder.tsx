import { useState, useRef, useEffect } from "react";
import FFmpeg from "@ffmpeg/ffmpeg";

const INPUT_NAME = "audio.webm";
const FILE_EXT = "mp3";
const OUTPUT_NAME = `audio.${FILE_EXT}`;

const convertToMp3Blob = async (
    webmBlob: Blob
): Promise<Blob> => {
    const ffmpeg = FFmpeg.createFFmpeg({ log: false });
    await ffmpeg.load();
    ffmpeg.FS(
        "writeFile",
        INPUT_NAME,
        new Uint8Array(await webmBlob.arrayBuffer())
    );
    await ffmpeg.run("-i", INPUT_NAME, OUTPUT_NAME);
    const outputData = ffmpeg.FS("readFile", OUTPUT_NAME);
    const outputBlob = new Blob([outputData.buffer], {
        type: `audio/${FILE_EXT}`,
    });
    return outputBlob;
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
                mediaRecorder.current = new MediaRecorder(stream as MediaStream);
                mediaRecorder.current.ondataavailable = (e) => {
                    if (typeof e.data === "undefined") return;
                    if (e.data.size === 0) return;
                    chunks.push(e.data);
                    mediaRecorder.current?.stream.getTracks().forEach((t) => t.stop());
                }
                mediaRecorder.current.onstop = async () => {
                    //creates a blob file from the audiochunks data
                    const audioBlob = new Blob(chunks);
                    if (!crossOriginIsolated) {
                        console.warn(
                            `This website is not "cross-origin isolated". Audio will be downloaded in webm format, since mp3/wav encoding requires cross origin isolation. Please visit https://web.dev/cross-origin-isolation-guide/ and https://web.dev/coop-coep/ for information on how to make your website "cross-origin isolated"`
                        );
                    }
                    let blob = audioBlob;
                    if (crossOriginIsolated) {
                        blob = await convertToMp3Blob(audioBlob);
                    }
                    const fileExt = crossOriginIsolated ? FILE_EXT : "webm";
                    const file = new File([blob], OUTPUT_NAME, { type: `audio/${fileExt}` });
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