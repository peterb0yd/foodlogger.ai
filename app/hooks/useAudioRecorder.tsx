import { useState, useEffect } from 'react';

const useAudioRecorder = (isRecording: boolean) => {
  const [audioUrl, setAudioUrl] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<BlobPart[]>([]);

  useEffect(() => {
    // Check for MediaRecorder availability in the global object
    if (!window.MediaRecorder) {
      console.error('MediaRecorder not supported in this browser.');
      return;
    }

    // Request microphone access
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.ondataavailable = (event) => {
          setAudioChunks(currentChunks => [...currentChunks, event.data]);
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          // Reset chunks for the next recording
          setAudioChunks([]);
        };
      })
      .catch(error => console.error('Error accessing the microphone:', error));
  }, [audioChunks]);

  useEffect(() => {
    if (mediaRecorder) {
      if (isRecording) {
        mediaRecorder.start();
      } else if (mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
    }
  }, [isRecording, mediaRecorder]);

  return audioUrl;
};

export default useAudioRecorder;
