import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Navbar } from './components/Navbar'
import { HeroBanner } from './components/HeroBanner'
import { Carousel } from './components/Carousel'
import { DetailsModal } from './components/DetailsModal'
import { SearchOverlay } from './components/SearchOverlay'
import { Settings } from './components/Settings'
import { useHomeMedia, useSearchMedia } from './hooks/useMedia'
import type { MediaItem } from './types'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const { trending, anime, isLoading } = useHomeMedia()
  const { data: searchResults } = useSearchMedia(searchQuery)

  const hasApiKey = !!localStorage.getItem('tmdb_api_key')

  const handleMediaClick = (item: MediaItem) => {
    setSelectedMedia(item)
  }

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Navbar 
        onSearch={setSearchQuery} 
        isSearchOpen={isSearchOpen} 
        setIsSearchOpen={setIsSearchOpen} 
      />

      <main className="pt-24 pb-20 md:pb-10 md:ml-20 lg:ml-64 px-6 md:px-12 transition-all">
        {activeTab === 'home' && (
          <div className="space-y-12 max-w-[1600px] mx-auto">
            {!hasApiKey && (
              <div className="bg-primary/10 border border-primary/20 p-6 rounded-3xl flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-primary">TMDB API Key Missing</h3>
                  <p className="text-sm text-gray-400">Connect your TMDB account in Settings to see trending movies and shows.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold"
                >
                  Setup Now
                </button>
              </div>
            )}

            {trending.length > 0 && (
              <HeroBanner 
                item={trending[0]} 
                onInfoClick={handleMediaClick} 
              />
            )}

            <div className="space-y-4">
              {isLoading && (
                 <div className="animate-pulse flex space-x-4 overflow-x-hidden">
                    {[1,2,3,4,5].map((i: number) => (
                      <div key={i} className="w-56 aspect-[2/3] bg-surface rounded-2xl shrink-0" />
                    ))}
                 </div>
              )}
              
              {trending.length > 0 && (
                <Carousel 
                  title="Trending Now" 
                  items={trending} 
                  onItemClick={handleMediaClick} 
                />
              )}
              {anime.length > 0 && (
                <Carousel 
                  title="Popular Anime" 
                  items={anime} 
                  onItemClick={handleMediaClick} 
                />
              )}
            </div>
          </div>
        )}

        {activeTab === 'movies' && (
          <div className="max-w-[1600px] mx-auto">
            <h1 className="text-3xl font-black mb-8">MOVIES</h1>
            <Carousel 
                title="Trending Movies" 
                items={trending.filter((i: MediaItem) => i.type === 'movie')} 
                onItemClick={handleMediaClick} 
              />
          </div>
        )}

        {activeTab === 'anime' && (
          <div className="max-w-[1600px] mx-auto">
            <h1 className="text-3xl font-black mb-8">ANIME</h1>
             <Carousel 
                title="Top Trending Anime" 
                items={anime} 
                onItemClick={handleMediaClick} 
              />
          </div>
        )}

        {activeTab === 'downloads' && (
          <div className="flex flex-col items-center justify-center py-40 text-gray-500">
            <h2 className="text-2xl font-bold mb-2">No Downloads</h2>
            <p>Movies and shows you download will appear here.</p>
          </div>
        )}

        {activeTab === 'settings' && <Settings />}
      </main>

      <SearchOverlay 
        isOpen={isSearchOpen && searchQuery.length > 0}
        onClose={() => {
          setIsSearchOpen(false)
          setSearchQuery('')
        }}
        results={searchResults || []}
        onItemClick={handleMediaClick}
        query={searchQuery}
      />

      <DetailsModal 
        item={selectedMedia} 
        onClose={() => setSelectedMedia(null)} 
      />
    </div>
  )
}

export default App
