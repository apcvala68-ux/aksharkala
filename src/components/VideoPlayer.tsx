"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, X } from "lucide-react";

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  title?: string;
  subtitle?: string;
}

export default function VideoPlayer({
  src = "https://www.w3schools.com/html/mov_bbb.mp4",
  poster,
  title = "The Making of a Saree",
  subtitle = "A visual journey through our atelier.",
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeout = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setShowControls(true);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (!isExpanded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false);
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  return (
    <>
      {/* Compact View */}
      <div className="text-center mb-12">
        <h3
          className="text-[32px] md:text-[40px] text-on-surface mb-2"
          style={{ fontFamily: "var(--font-playfair-display)" }}
        >
          {title}
        </h3>
        <p
          className="text-[16px] text-on-surface-variant"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {subtitle}
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full aspect-video bg-surface-container overflow-hidden gold-border cursor-pointer group"
        onClick={() => setIsExpanded(true)}
        onMouseMove={handleMouseMove}
      >
        {/* Poster / Thumbnail */}
        {poster && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
            style={{
              backgroundImage: `url(${poster})`,
              opacity: isPlaying ? 0 : 0.6,
            }}
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30 z-[1]" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center z-[2]">
          <div className="relative">
            {/* Pulse ring */}
            <div className="absolute inset-0 w-20 h-20 rounded-full border border-secondary/40 animate-ping" />
            {/* Button */}
            <div className="w-20 h-20 rounded-full border border-secondary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-container/20 transition-all duration-300 backdrop-blur-sm">
              <Play size={32} className="text-on-surface ml-1" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-[2]">
          <p
            className="text-[11px] tracking-[0.15em] uppercase text-secondary mb-1"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
          >
            Watch the Film
          </p>
          <p
            className="text-[14px] text-on-surface-variant"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            2:34 min &middot; Behind the Loom
          </p>
        </div>
      </div>

      {/* Expanded Fullscreen Player */}
      {isExpanded && (
        <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
              videoRef.current?.pause();
              setIsPlaying(false);
            }}
            className="absolute top-6 right-6 z-[210] w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close video"
          >
            <X size={20} className="text-white" />
          </button>

          {/* Video */}
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className="w-full h-full object-contain"
            playsInline
            muted={isMuted}
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
          />

          {/* Controls Overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress Bar */}
            <div
              className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer group/progress"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-secondary rounded-full relative transition-all duration-100"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-secondary opacity-0 group-hover/progress:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause size={18} className="text-white" fill="white" />
                  ) : (
                    <Play size={18} className="text-white ml-0.5" fill="white" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX size={18} className="text-white" />
                  ) : (
                    <Volume2 size={18} className="text-white" />
                  )}
                </button>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const video = videoRef.current;
                  if (video?.requestFullscreen) {
                    video.requestFullscreen();
                  }
                }}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Fullscreen"
              >
                <Maximize size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
