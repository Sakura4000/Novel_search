'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Novel } from '../types'

interface SearchFormProps {
  onSearch: (novels: Novel[]) => void
  setIsLoading: (loading: boolean) => void
}

export default function SearchForm({ onSearch, setIsLoading }: SearchFormProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query.trim() }),
      })

      if (!response.ok) {
        throw new Error('搜索失败')
      }

      const data = await response.json()
      onSearch(data.novels)
    } catch (error) {
      console.error('搜索错误:', error)
      alert('搜索失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        搜索小说
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入小说名称..."
            className="input-field pl-10"
            required
          />
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={!query.trim()}
        >
          开始搜索
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 输入小说名称，AI会自动搜索相关信息</li>
          <li>• 系统会自动分析小说简介并分类</li>
          <li>• 确认信息后可以保存到收藏夹</li>
          <li>• 支持导出到飞书文档</li>
        </ul>
      </div>
    </div>
  )
} 