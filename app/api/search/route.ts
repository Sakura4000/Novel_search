import { NextRequest, NextResponse } from 'next/server'
import { Novel } from '../../types'
import { searchNovels } from '../../utils/search'
import { classifyNovel } from '../../utils/ai'



export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()
    
    if (!query) {
      return NextResponse.json(
        { error: '搜索关键词不能为空' },
        { status: 400 }
      )
    }

    // 搜索小说
    const searchResults = await searchNovels(query)
    
    // 处理搜索结果
    const novels: Novel[] = await Promise.all(
      searchResults.map(async (result) => {
        const category = await classifyNovel(result.description)
        
        return {
          title: result.title,
          author: result.author,
          description: result.description,
          category: category as any,
          searchDate: new Date().toLocaleString('zh-CN')
        }
      })
    )

    return NextResponse.json({ novels })
  } catch (error) {
    console.error('搜索错误:', error)
    return NextResponse.json(
      { error: '搜索失败，请稍后重试' },
      { status: 500 }
    )
  }
} 