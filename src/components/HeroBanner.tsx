import React from 'react';
import { Play, Info, Star } from 'lucide-react';
import type { MediaItem } from '../types';

interface HeroBannerProps {
  item: MediaItem;
  onInfoClick: (item: MediaItem) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ item, onInfoClick }) => {
  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden rounded-3xl group">
      {/* Background Image with Gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${item.backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-12 lg:p-20 max-w-3xl">
        <div className="flex items-center space-x-3 mb-4">
          <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Trending</span>
          <div className="flex items-center text-yellow-500 text-sm">
            <Star className="w-4 h-4 fill-current mr-1" />
            <span className="font-bold">{item.rating}</span>
          </div>
          <span className="text-gray-300 text-sm">{item.releaseYear}</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight drop-shadow-2xl italic tracking-tighter">
          {item.title.toUpperCase()}
        </h2>

        <p className="text-gray-300 text-sm md:text-lg mb-8 line-clamp-3 md:line-clamp-none max-w-xl">
          {item.description}
        </p>

        <div className="flex items-center space-x-4">
          <button className="flex items-center px-8 py-4 bg-white text-black rounded-2xl font-bold hover:bg-white/90 transition-all active:scale-95">
            <Play className="w-5 h-5 fill-current mr-2" />
            Watch Now
          </button>
          <button 
            onClick={() => onInfoClick(item)}
            className="flex items-center px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-2xl font-bold hover:bg-white/20 transition-all active:scale-95"
          >
            <Info className="w-5 h-5 mr-2" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};
