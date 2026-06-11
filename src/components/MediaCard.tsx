import React from 'react';
import type { MediaItem } from '../types';
import { Play, Star } from 'lucide-react';

interface MediaCardProps {
  item: MediaItem;
  onClick: (item: MediaItem) => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, onClick }) => {
  return (
    <div 
      onClick={() => onClick(item)}
      className="flex-none w-40 md:w-56 group cursor-pointer"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl mb-3">
        <img 
          src={item.posterUrl} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-6 h-6 fill-current text-white" />
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center text-xs font-bold text-yellow-500">
          <Star className="w-3 h-3 fill-current mr-1" />
          {item.rating}
        </div>
      </div>
      <h3 className="font-semibold text-sm md:text-base line-clamp-1 group-hover:text-primary transition-colors">
        {item.title}
      </h3>
      <p className="text-gray-500 text-xs mt-1">
        {item.releaseYear} • {item.type === 'anime' ? `${item.episodes} Eps` : item.duration}
      </p>
    </div>
  );
};
