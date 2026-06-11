import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Download, Star, Clock, Calendar } from 'lucide-react';
import type { MediaItem } from '../types';

interface DetailsModalProps {
  item: MediaItem | null;
  onClose: () => void;
}

export const DetailsModal: React.FC<DetailsModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl bg-surface rounded-3xl overflow-hidden shadow-2xl border border-white/5 max-h-[90vh] overflow-y-auto scrollbar-hide"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Banner Header */}
          <div className="relative w-full h-[40vh] md:h-[50vh]">
            <img 
              src={item.backdropUrl} 
              alt={item.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
            
            <div className="absolute bottom-8 left-8 md:left-12 right-8">
              <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">
                {item.title.toUpperCase()}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  {item.rating}
                </div>
                <div className="flex items-center text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  {item.releaseYear}
                </div>
                <div className="flex items-center text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  {item.type === 'anime' ? `${item.episodes} Episodes` : item.duration}
                </div>
                <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest text-white border border-white/10">
                  Ultra HD
                </span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-lg font-bold mb-4 text-gray-200">Synopsis</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.genres.map((genre) => (
                  <span key={genre} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm border border-white/5 transition-colors cursor-default">
                    {genre}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 flex items-center justify-center px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all active:scale-95">
                  <Play className="w-5 h-5 fill-current mr-2" />
                  Watch Now
                </button>
                <button className="flex-1 flex items-center justify-center px-8 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all active:scale-95">
                  <Download className="w-5 h-5 mr-2" />
                  Download Offline
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Cast</h4>
                <div className="space-y-3">
                  {['John Doe', 'Jane Smith', 'Alex Johnson'].map(name => (
                    <div key={name} className="flex items-center space-x-3 text-sm text-gray-300">
                      <div className="w-8 h-8 rounded-full bg-white/10" />
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Age Rating</h4>
                <p className="text-xl font-black">TV-MA</p>
                <p className="text-xs text-gray-500 mt-1">Adult themes, Intense violence</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
