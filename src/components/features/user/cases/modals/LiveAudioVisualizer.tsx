"use client";

import React, { useEffect, useRef } from "react";

interface LiveAudioVisualizerProps {
  mediaRecorder: MediaRecorder | null;
  width?: number;
  height?: number;
  barWidth?: number;
  gap?: number;
  barColor?: string;
}

const LiveAudioVisualizer = ({
  mediaRecorder,
  width = 60,
  height = 18,
  barWidth = 1,
  gap = 2,
  barColor = "#3b82f6",
}: LiveAudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const prevHeightsRef = useRef<number[]>([]);

  useEffect(() => {
    if (!mediaRecorder || !mediaRecorder.stream) return;

    const audioContext =
      new // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window.AudioContext || (window as any).webkitAudioContext)();

    const source = audioContext.createMediaStreamSource(mediaRecorder.stream);
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 64;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);

    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;

    const barCount = Math.floor(width / (barWidth + gap));
    prevHeightsRef.current = new Array(barCount).fill(0);

    const draw = () => {
      if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current)
        return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);

      ctx.clearRect(0, 0, width, height);

      const mid = Math.floor(barCount / 2);

      for (let i = 0; i < barCount; i++) {
        // Symmetric/Mirrored Wave: distance from center
        const distFromCenter = Math.abs(i - mid);
        const normalizedDist = distFromCenter / (mid || 1);

        // Map frequency data - lower frequencies (usually first few indices) map to center
        // This creates a "mountain" effect in the middle
        const dataIndex = Math.floor(
          normalizedDist * (dataArrayRef.current.length - 1),
        );
        const frequencyValue = dataArrayRef.current[dataIndex];

        // Scale the value to the canvas height, edge falloff for better wave shape
        const targetHeight = Math.max(
          (frequencyValue / 255) * height * (1 - normalizedDist * 0.4),
          2,
        );

        // Smoothing for height transitions (Lerp)
        const prevHeight = prevHeightsRef.current[i] || 0;
        const smoothedHeight = prevHeight + (targetHeight - prevHeight) * 0.15;
        prevHeightsRef.current[i] = smoothedHeight;

        const x = i * (barWidth + gap);
        const y = (height - smoothedHeight) / 2;

        // Vertical gradient for the bar
        const gradient = ctx.createLinearGradient(x, y, x, y + smoothedHeight);
        gradient.addColorStop(0, barColor + "aa"); // Semi-transparent top
        gradient.addColorStop(0.5, barColor); // Solid middle
        gradient.addColorStop(1, barColor + "aa"); // Semi-transparent bottom

        ctx.fillStyle = gradient;

        // Glow effect for higher intensities
        if (smoothedHeight > height * 0.4) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = barColor + "88";
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x, y, barWidth, smoothedHeight, barWidth / 2);
        } else {
          ctx.rect(x, y, barWidth, smoothedHeight);
        }
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (audioContext.state !== "closed") {
        audioContext.close();
      }
    };
  }, [mediaRecorder, width, height, barWidth, gap, barColor]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="block opacity-90"
    />
  );
};

export default LiveAudioVisualizer;
