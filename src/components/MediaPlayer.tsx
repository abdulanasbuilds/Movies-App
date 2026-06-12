import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { 
  Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, 
  Maximize, Minimize, X, SkipForward 
} from 'lucide-react';
import screenfull from 'screenfull';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MediaPlayerProps {
  url: string;
  title: string;
  onClose: () => void;
  onEnded?: () => void;
  hasNextEpisode?: boolean;
}

export const MediaPlayer: React.FC<MediaPlayerProps> = ({ 
  url, title, onClose, onEnded, hasNextEpisode 
}) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const [controlsTimeout, setControlsTimeout] = useState<number | null>(null);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout) window.clearTimeout(controlsTimeout);
    const timeout = window.setTimeout(() => {
      if (playing) setShowControls(false);
    }, 3000);
    setControlsTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeout) window.clearTimeout(controlsTimeout);
    };
  }, [playing, controlsTimeout]);

  const togglePlay = () => setPlaying(!playing);
  const toggleMute = () => setMuted(!muted);
  
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = () => setSeeking(true);
  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    playerRef.current?.seekTo(parseFloat((e.target as HTMLInputElement).value));
  };

  const handleProgress = (state: any) => {
    if (!seeking) setPlayed(state.played);
  };

  const skip = (amount: number) => {
    const currentTime = playerRef.current?.getCurrentTime() || 0;
    playerRef.current?.seekTo(currentTime + amount);
  };

  const toggleFullscreen = () => {
    if (screenfull.isEnabled && containerRef.current) {
      screenfull.toggle(containerRef.current);
      setIsFullscreen(!isFullscreen);
    }
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    return `${mm}:${ss}`;
  };

  const PlayerComponent = ReactPlayer as any;

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden group select-none"
      onMouseMove={handleMouseMove}
    >
      <PlayerComponent
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        onDuration={setDuration}
        onEnded={onEnded}
        config={{
          file: {
            attributes: {
              crossOrigin: 'anonymous',
            },
            forceHLS: url.includes('.m3u8'),
          }
        }}
      />

      {/* Overlay Controls */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-300 flex flex-col justify-between p-4",
        showControls ? "opacity-100" : "opacity-0 cursor-none"
      )}>
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg md:text-xl drop-shadow-md">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Center Controls */}
        <div className="flex items-center justify-center space-x-8 md:space-x-12">
          <button onClick={() => skip(-10)} className="p-2 hover:text-primary transition-colors">
            <RotateCcw className="w-8 h-8 md:w-10 md:h-10" />
          </button>
          <button 
            onClick={togglePlay} 
            className="p-4 bg-primary rounded-full hover:scale-110 transition-transform shadow-lg shadow-primary/20"
          >
            {playing ? <Pause className="w-8 h-8 md:w-10 md:h-10 fill-current" /> : <Play className="w-8 h-8 md:w-10 md:h-10 fill-current ml-1" />}
          </button>
          <button onClick={() => skip(10)} className="p-2 hover:text-primary transition-colors">
            <RotateCw className="w-8 h-8 md:w-10 md:h-10" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="flex items-center space-x-4">
            <span className="text-xs font-mono w-12">{formatTime(played * duration)}</span>
            <input
              type="range"
              min={0}
              max={0.999999}
              step="any"
              value={played}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
              className="flex-1 accent-primary h-1 bg-white/20 rounded-full cursor-pointer appearance-none"
            />
            <span className="text-xs font-mono w-12">{formatTime(duration)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 group/volume">
                <button onClick={toggleMute} className="hover:text-primary transition-colors">
                  {muted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </button>
                <input 
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-0 group-hover/volume:w-20 transition-all accent-white h-1 bg-white/20 rounded-full appearance-none"
                />
              </div>
              
              {hasNextEpisode && (
                <button 
                  onClick={onEnded}
                  className="flex items-center space-x-2 text-sm font-bold hover:text-primary transition-colors"
                >
                  <SkipForward className="w-5 h-5" />
                  <span className="hidden sm:inline">Next Episode</span>
                </button>
              )}
            </div>

            <button onClick={toggleFullscreen} className="hover:text-primary transition-colors">
              {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
