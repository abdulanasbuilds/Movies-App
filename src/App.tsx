import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Navbar } from './components/Navbar'
import { HeroBanner } from './components/HeroBanner'
import { Carousel } from './components/Carousel'
import { DetailsModal } from './components/DetailsModal'
import { SearchOverlay } from './components/SearchOverlay'
import { MOCK_DATA } from './data/mockData'
import type { MediaItem } from './types'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const trendingItems = MOCK_DATA.filter(item => item.isTrending)
  const popularAnime = MOCK_DATA.filter(item => item.type === 'anime' && item.isPopular)
  const popularMovies = MOCK_DATA.filter(item => item.type === 'movie' && item.isPopular)
  const searchResults = MOCK_DATA.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
  )

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
            {trendingItems.length > 0 && (
              <HeroBanner 
                item={trendingItems[0]} 
                onInfoClick={handleMediaClick} 
              />
            )}

            <div className="space-y-4">
              <Carousel 
                title="Trending Now" 
                items={trendingItems} 
                onItemClick={handleMediaClick} 
              />
              <Carousel 
                title="Popular Anime" 
                items={popularAnime} 
                onItemClick={handleMediaClick} 
              />
              <Carousel 
                title="Top Rated Movies" 
                items={popularMovies} 
                onItemClick={handleMediaClick} 
              />
            </div>
          </div>
        )}

        {activeTab === 'movies' && (
          <div className="max-w-[1600px] mx-auto">
            <h1 className="text-3xl font-black mb-8">MOVIES</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {MOCK_DATA.filter(i => i.type === 'movie').map(item => (
                <Carousel key={item.id} title={item.title} items={[item]} onItemClick={handleMediaClick} />
              ))}
              {/* Note: In a real app, this would be a proper grid, not a list of carousels. 
                  But for this shell, let's use a simple layout. */}
            </div>
          </div>
        )}

        {activeTab === 'anime' && (
          <div className="max-w-[1600px] mx-auto">
            <h1 className="text-3xl font-black mb-8">ANIME</h1>
             <Carousel 
                title="All Anime" 
                items={MOCK_DATA.filter(i => i.type === 'anime')} 
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
      </main>

      <SearchOverlay 
        isOpen={isSearchOpen && searchQuery.length > 0}
        onClose={() => {
          setIsSearchOpen(false)
          setSearchQuery('')
        }}
        results={searchResults}
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
