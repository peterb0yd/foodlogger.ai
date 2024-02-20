import { useState, useEffect } from 'react';

function useAudioRecorder(isRecording: boolean) {
  const [audioUrl, setAudioUrl] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<BlobPart[]>([]);

  useEffect(() => {
    // Request access to the microphone
    async function setupMediaRecorder() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.ondataavailable = (event) => {
          setAudioChunks((currentChunks) => [...currentChunks, event.data]);
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { 'type': 'audio/wav' });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
        };
      }
    }

    if (isRecording) {
      setAudioChunks([]); // Reset chunks on new recording
      setupMediaRecorder().then(() => {
        mediaRecorder?.start();
      });
    } else if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }

    // Cleanup on component unmount
    return () => {
      mediaRecorder?.stream.getTracks().forEach(track => track.stop());
    };
  }, [isRecording, mediaRecorder]);

  return audioUrl;
}

export default useAudioRecorder;
