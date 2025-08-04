'use client'

import { useState } from 'react'
import SearchForm from './components/SearchForm'
import NovelResults from './components/NovelResults'
import SavedNovels from './components/SavedNovels'
import { Novel } from './types'

export default function Home() {
  const [searchResults, setSearchResults] = useState<Novel[]>([])
  const [savedNovels, setSavedNovels] = useState<Novel[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'search' | 'saved'>('search')

  const handleSaveNovel = (novel: Novel) => {
    setSavedNovels(prev => {
      const exists = prev.find(n => n.title === novel.title && n.author === novel.author)
      if (exists) return prev
      return [...prev, novel]
    })
  }

  const handleRemoveNovel = (novel: Novel) => {
    setSavedNovels(prev => prev.filter(n => !(n.title === novel.title && n.author === novel.author)))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          📚 小说助手
        </h1>
        <p className="text-lg text-gray-600">
          AI智能搜索、分类和保存你喜爱的小说
        </p>
      </div>

      {/* 标签页切换 */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-white rounded-lg p-1 shadow-md">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'search'
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            搜索小说
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'saved'
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            我的收藏 ({savedNovels.length})
          </button>
        </div>
      </div>

      {activeTab === 'search' ? (
        <div className="space-y-8">
          <SearchForm 
            onSearch={setSearchResults} 
            setIsLoading={setIsLoading}
          />
          <NovelResults 
            novels={searchResults} 
            onSave={handleSaveNovel}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <SavedNovels 
          novels={savedNovels} 
          onRemove={handleRemoveNovel}
        />
      )}
    </div>
  )
} 