'use client'

import { useState } from 'react'
import { TrashIcon, DocumentTextIcon, ShareIcon } from '@heroicons/react/24/outline'
import { Novel } from '../types'

interface SavedNovelsProps {
  novels: Novel[]
  onRemove: (novel: Novel) => void
}

export default function SavedNovels({ novels, onRemove }: SavedNovelsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')
  const [isExporting, setIsExporting] = useState(false)

  const categories = ['全部', ...Array.from(new Set(novels.map(n => n.category)))]

  const filteredNovels = selectedCategory === '全部' 
    ? novels 
    : novels.filter(n => n.category === selectedCategory)

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

  const handleExportToFeishu = async () => {
    if (novels.length === 0) {
      alert('没有小说可以导出')
      return
    }

    setIsExporting(true)
    try {
      const response = await fetch('/api/export-feishu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ novels }),
      })

      if (!response.ok) {
        throw new Error('导出失败')
      }

      const data = await response.json()
      alert(`成功导出到飞书文档！文档链接：${data.documentUrl}`)
    } catch (error) {
      console.error('导出错误:', error)
      alert('导出失败，请稍后重试')
    } finally {
      setIsExporting(false)
    }
  }

  if (novels.length === 0) {
    return (
      <div className="card max-w-4xl mx-auto text-center py-12">
        <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">还没有收藏的小说</h3>
        <p className="text-gray-600">搜索并保存你喜欢的小说吧！</p>
      </div>
    )
  }

  return (
    <div className="card max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          我的收藏 ({novels.length})
        </h2>
        
        <button
          onClick={handleExportToFeishu}
          disabled={isExporting}
          className="btn-primary flex items-center space-x-2"
        >
          <ShareIcon className="h-5 w-5" />
          <span>{isExporting ? '导出中...' : '导出到飞书'}</span>
        </button>
      </div>

      {/* 分类筛选 */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredNovels.map((novel, index) => (
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
                onClick={() => onRemove(novel)}
                className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <TrashIcon className="h-5 w-5" />
                <span>删除</span>
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">简介：</h4>
              <p className="text-gray-700 leading-relaxed">
                {novel.description}
              </p>
            </div>
            
            <div className="mt-4 text-sm text-gray-500 flex justify-between">
              <span>搜索时间：{novel.searchDate}</span>
              {novel.savedDate && (
                <span>保存时间：{novel.savedDate}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredNovels.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          该分类下没有收藏的小说
        </div>
      )}
    </div>
  )
} 