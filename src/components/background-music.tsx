'use client';

import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Volume2, VolumeX } from 'lucide-react';

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      // play() returns a promise which can be rejected if autoplay is disallowed.
      audio.play().catch(e => console.error("Audio playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* 
        IMPORTANT: You need to add your music file to the `public` directory.
        For example, create a file at `public/flute-music.mp3`.
        The audio player below will not work without it.
      */}
      <audio ref={audioRef} src="/flute-music.mp3" loop preload="auto" />
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="secondary"
          size="icon"
          onClick={togglePlayPause}
          className="rounded-full shadow-lg w-12 h-12"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
        </Button>
      </div>
    </>
  );
}
