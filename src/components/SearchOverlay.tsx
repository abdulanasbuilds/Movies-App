import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MediaItem } from '../types';
import { MediaCard } from './MediaCard';
import { X } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  results: MediaItem[];
  onItemClick: (item: MediaItem) => void;
  query: string;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, results, onItemClick, query }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl overflow-y-auto pt-24 px-6 md:px-12 pb-20 md:left-20 lg:left-64"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
            <div>
              <h2 className="text-2xl font-bold">Search Results</h2>
              <p className="text-gray-500 mt-1">Showing results for "{query}"</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
              {results.map((item) => (
                <MediaCard key={item.id} item={item} onClick={onItemClick} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <p className="text-lg italic">No results found for your search.</p>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
