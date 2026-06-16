"use client";

import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  // Manage timer with useEffect for better stability
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, isPaused]);

  const startRecording = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error(
          "Microphone access is not supported in this environment. This usually happens if the site is not served over HTTPS."
        );
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = new MediaRecorder(stream);

      const chunks: Blob[] = [];
      newRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      newRecorder.onstop = () => {
        const mimeTypes = ["audio/webm", "audio/mp4", "audio/ogg", "audio/aac"];
        let selectedMimeType = "audio/webm";
        for (const type of mimeTypes) {
          if (MediaRecorder.isTypeSupported(type)) {
            selectedMimeType = type;
            break;
          }
        }
        const blob = new Blob(chunks, { type: selectedMimeType });
        setAudioBlob(blob);
        // Don't reset time here if you want to keep it until next start
      };

      setMediaStream(stream);
      setRecorder(newRecorder);
      newRecorder.start();
      setRecordingTime(0);
      setIsRecording(true);
      setIsPaused(false);
    } catch (err: unknown) {
      console.error("Error accessing microphone:", err);
      const error = err as Error;
      toast.error(
        error.name === "NotAllowedError" || error.name === "SecurityError"
          ? "Microphone access denied. Please ensure your site is served over HTTPS and you have granted microphone permissions."
          : "Failed to access microphone. Please check your device settings."
      );
    }
  }, []);

  const pauseRecording = useCallback(() => {
    if (recorder && recorder.state === "recording") {
      recorder.pause();
      setIsPaused(true);
    }
  }, [recorder]);

  const resumeRecording = useCallback(() => {
    if (recorder && recorder.state === "paused") {
      recorder.resume();
      setIsPaused(false);
    }
  }, [recorder]);

  const stopRecording = useCallback(() => {
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
      mediaStream?.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      setIsPaused(false);
    }
  }, [recorder, mediaStream]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  useEffect(() => {
    return () => {
      mediaStream?.getTracks().forEach((track) => track.stop());
    };
  }, [mediaStream]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return {
    isRecording,
    isPaused,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    toggleRecording,
    recordingTime: formatTime(recordingTime),
    mediaRecorder: recorder,
    audioBlob,
    mediaStream,
  };
};
