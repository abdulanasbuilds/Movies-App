import React from 'react';
import { Home, Film, Tv, Download, User } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'movies', icon: Film, label: 'Movies' },
    { id: 'anime', icon: Tv, label: 'Anime' },
    { id: 'downloads', icon: Download, label: 'Downloads' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-20 lg:w-64 bg-surface border-r border-white/5 z-50 transition-all duration-300">
        <div className="p-6 mb-8">
          <h1 className="text-primary font-bold text-2xl hidden lg:block tracking-tight">STREAM<span className="text-white">FUSION</span></h1>
          <div className="w-8 h-8 bg-primary rounded lg:hidden" />
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center p-3 rounded-xl transition-all duration-200 group",
                activeTab === tab.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <tab.icon className={cn("w-6 h-6", activeTab === tab.id ? "scale-110" : "group-hover:scale-110 transition-transform")} />
              <span className="ml-4 font-medium hidden lg:block">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <button className="w-full flex items-center p-3 text-gray-400 hover:text-white transition-colors">
            <User className="w-6 h-6" />
            <span className="ml-4 font-medium hidden lg:block">Profile</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-2 z-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-col items-center justify-center w-16 h-full transition-colors",
              activeTab === tab.id ? "text-primary" : "text-gray-500"
            )}
          >
            <tab.icon className={cn("w-6 h-6", activeTab === tab.id && "animate-pulse")} />
            <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};
