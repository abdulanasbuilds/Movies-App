import React from 'react';
import type { MediaItem } from '../types';
import { MediaCard } from './MediaCard';

interface CarouselProps {
  title: string;
  items: MediaItem[];
  onItemClick: (item: MediaItem) => void;
}

export const Carousel: React.FC<CarouselProps> = ({ title, items, onItemClick }) => {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
        <button className="text-primary text-sm font-semibold hover:underline">View All</button>
      </div>
      <div className="flex space-x-4 md:space-x-6 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:-mx-0 md:px-0">
        {items.map((item) => (
          <MediaCard key={item.id} item={item} onClick={onItemClick} />
        ))}
      </div>
    </section>
  );
};
