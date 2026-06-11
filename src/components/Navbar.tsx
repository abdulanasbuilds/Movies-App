import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavbarProps {
  onSearch: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, isSearchOpen, setIsSearchOpen }) => {
  return (
    <nav className="fixed top-0 left-0 md:left-20 lg:left-64 right-0 h-20 bg-background/60 backdrop-blur-xl z-40 px-6 md:px-12 flex items-center justify-between border-b border-white/5">
      <div className="flex items-center flex-1 max-w-2xl">
        <div className="relative w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
          <input 
            type="text"
            placeholder="Search movies, anime, actors..."
            onFocus={() => setIsSearchOpen(true)}
            onChange={(e) => onSearch(e.target.value)}
            className={cn(
              "w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white/10 transition-all",
              isSearchOpen && "bg-white/10 ring-2 ring-primary/20"
            )}
          />
        </div>
      </div>

      <div className="flex items-center space-x-6 ml-6">
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
        </button>
        <button className="md:hidden p-2 text-gray-400 hover:text-white transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden md:block w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary border-2 border-white/10" />
      </div>
    </nav>
  );
};
