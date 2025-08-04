'use client'

import { useState } from 'react'
import { HeartIcon, BookmarkIcon, CheckIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { Novel } from '../types'

interface NovelResultsProps {
  novels: Novel[]
  onSave: (novel: Novel) => void
  isLoading: boolean
}

export default function NovelResults({ novels, onSave, isLoading }: NovelResultsProps) {
  const [savedNovels, setSavedNovels] = useState<Set<string>>(new Set())

  const handleSave = (novel: Novel) => {
    const key = `${novel.title}-${novel.author}`
    setSavedNovels(prev => new Set([...prev, key]))
    onSave(novel)
  }

  const isSaved = (novel: Novel) => {
    const key = `${novel.title}-${novel.author}`
    return savedNovels.has(key)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      '暗恋文': 'bg-pink-100 text-pink-800',
      '救赎文': 'bg-purple-100 text-purple-800',
      '豪门文': 'bg-yellow-100 text-yellow-800',
      '先婚后爱文': 'bg-red-100 text-red-800',
      '校园文': 'bg-green-100 text-green-800',
      '都市文': 'bg-blue-100 text-blue-800',
      '古言文': 'bg-orange-100 text-orange-800',
      '现言文': 'bg-indigo-100 text-indigo-800',
      '其他': 'bg-gray-100 text-gray-800',
    }
    return colors[category] || colors['其他']
  }

  if (isLoading) {
    return (
      <div className="card max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          <span className="ml-3 text-gray-600">正在搜索中...</span>
        </div>
      </div>
    )
  }

  if (novels.length === 0) {
    return null
  }

  return (
    <div className="card max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        搜索结果 ({novels.length})
      </h2>
      
      <div className="space-y-6">
        {novels.map((novel, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {novel.title}
                </h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">作者：</span>
                  {novel.author}
                </p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(novel.category)}`}>
                  {novel.category}
                </span>
              </div>
              
              <button
                onClick={() => handleSave(novel)}
                disabled={isSaved(novel)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isSaved(novel)
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                }`}
              >
                {isSaved(novel) ? (
                  <>
                    <CheckIcon className="h-5 w-5" />
                    <span>已保存</span>
                  </>
                ) : (
                  <>
                    <BookmarkIcon className="h-5 w-5" />
                    <span>保存</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">简介：</h4>
              <p className="text-gray-700 leading-relaxed">
                {novel.description}
              </p>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              搜索时间：{novel.searchDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 