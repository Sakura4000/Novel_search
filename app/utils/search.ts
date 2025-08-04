import { Novel } from '../types'

// 模拟小说数据
const mockNovels = [
  {
    title: '霸道总裁的契约娇妻',
    author: '佚名',
    description: '一个普通女孩因为家族债务被迫嫁给霸道总裁，两人从互相看不顺眼到慢慢相爱，最终收获真爱。这是一个先婚后爱的甜蜜故事。'
  },
  {
    title: '校园青春恋歌',
    author: '青春作家',
    description: '高中校园里，学霸女主和校草男主的青春恋爱故事。从同桌到恋人，经历了高考、分离、重逢，最终在大学里重逢并相爱。'
  },
  {
    title: '暗恋十年终成眷属',
    author: '暗恋专家',
    description: '女主暗恋男主十年，从高中到大学再到工作，默默守护着这份感情。男主终于发现女主的真心，两人开始了一段甜蜜的恋爱。'
  },
  {
    title: '重生之都市修仙',
    author: '修仙大神',
    description: '主角重生回到十年前，带着前世的记忆和修仙功法，在都市中崛起。通过修仙改变命运，同时收获了真挚的爱情。'
  },
  {
    title: '古代宫廷权谋',
    author: '古言大师',
    description: '古代宫廷中，女主从一个普通宫女成长为权倾朝野的皇后。在复杂的宫廷斗争中，她不仅要保护自己，还要守护心爱的人。'
  },
  {
    title: '职场女强人的爱情',
    author: '都市作家',
    description: '现代都市中，一个事业有成的女强人遇到了一个温柔体贴的男人。在职场和爱情之间，她学会了平衡，最终收获了事业和爱情的双丰收。'
  },
  {
    title: '救赎之恋',
    author: '治愈系作家',
    description: '男主因为过去的创伤而封闭内心，女主用温暖和爱意慢慢治愈他。这是一个关于救赎、治愈和重生的感人故事。'
  },
  {
    title: '豪门世家的联姻',
    author: '豪门专家',
    description: '两个豪门世家为了商业利益而联姻，男女主从互相排斥到慢慢了解，最终在豪门斗争中携手共进，收获了真挚的爱情。'
  }
]

// 搜索关键词匹配
function matchKeywords(query: string, description: string): number {
  const queryWords = query.toLowerCase().split(/\s+/)
  const descWords = description.toLowerCase()
  
  let matchCount = 0
  queryWords.forEach(word => {
    if (descWords.includes(word)) {
      matchCount++
    }
  })
  
  return matchCount
}

// 使用模拟数据搜索
export async function searchNovelsWithMock(query: string): Promise<Novel[]> {
  const results = mockNovels
    .map(novel => ({
      ...novel,
      matchScore: matchKeywords(query, novel.description)
    }))
    .filter(novel => novel.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5) // 返回前5个结果
  
  return results.map(novel => ({
    title: novel.title,
    author: novel.author,
    description: novel.description,
    category: '其他' as any,
    searchDate: new Date().toLocaleString('zh-CN')
  }))
}

// 百度搜索API（需要申请）
export async function searchNovelsWithBaidu(query: string): Promise<Novel[]> {
  const apiKey = process.env.BAIDU_SEARCH_API_KEY
  
  if (!apiKey) {
    throw new Error('百度搜索API密钥未配置')
  }

  try {
    // 这里需要根据百度搜索API的具体文档来实现
    // 由于需要申请API，这里只提供框架代码
    const response = await fetch(`https://api.baidu.com/search?q=${encodeURIComponent(query)}&key=${apiKey}`)
    const data = await response.json()
    
    // 处理百度API返回的数据
    return data.results?.map((item: any) => ({
      title: item.title,
      author: item.author || '佚名',
      description: item.description,
      category: '其他' as any,
      searchDate: new Date().toLocaleString('zh-CN')
    })) || []
  } catch (error) {
    console.error('百度搜索API错误:', error)
    throw error
  }
}

// 必应搜索API（需要申请）
export async function searchNovelsWithBing(query: string): Promise<Novel[]> {
  const apiKey = process.env.BING_SEARCH_API_KEY
  
  if (!apiKey) {
    throw new Error('必应搜索API密钥未配置')
  }

  try {
    // 这里需要根据必应搜索API的具体文档来实现
    const response = await fetch(`https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey
      }
    })
    const data = await response.json()
    
    return data.webPages?.value?.map((item: any) => ({
      title: item.name,
      author: '佚名',
      description: item.snippet,
      category: '其他' as any,
      searchDate: new Date().toLocaleString('zh-CN')
    })) || []
  } catch (error) {
    console.error('必应搜索API错误:', error)
    throw error
  }
}

// 主要搜索函数
export async function searchNovels(query: string): Promise<Novel[]> {
  // 优先使用模拟数据（当前方案）
  try {
    return await searchNovelsWithMock(query)
  } catch (error) {
    console.error('搜索失败，使用备用方案:', error)
    
    // 如果模拟数据也失败，返回空结果
    return []
  }
}

// 高级搜索选项（可选）
export async function searchNovelsAdvanced(query: string, options: {
  useBaidu?: boolean
  useBing?: boolean
  useMock?: boolean
} = {}): Promise<Novel[]> {
  const { useBaidu = false, useBing = false, useMock = true } = options
  
  // 按优先级尝试不同的搜索方式
  if (useBaidu) {
    try {
      return await searchNovelsWithBaidu(query)
    } catch (error) {
      console.error('百度搜索失败:', error)
    }
  }
  
  if (useBing) {
    try {
      return await searchNovelsWithBing(query)
    } catch (error) {
      console.error('必应搜索失败:', error)
    }
  }
  
  if (useMock) {
    try {
      return await searchNovelsWithMock(query)
    } catch (error) {
      console.error('模拟搜索失败:', error)
    }
  }
  
  return []
} 