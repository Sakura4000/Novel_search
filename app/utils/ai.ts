import { GoogleGenerativeAI } from '@google/generative-ai'
import { CategoryDefinition } from '../types'

// 小说分类定义
const categoryDefinitions: CategoryDefinition[] = [
  {
    name: '暗恋文',
    description: '主角暗恋他人，情感细腻，内心戏丰富',
    keywords: ['暗恋', '单恋', '默默喜欢', '不敢表白', '偷偷关注', '内心戏', '暗恋多年', '默默守护']
  },
  {
    name: '救赎文',
    description: '主角通过爱情或经历得到救赎，治愈系',
    keywords: ['救赎', '治愈', '重生', '改变', '救赎', '新生', '重生', '救赎', '治愈系', '改变命运']
  },
  {
    name: '豪门文',
    description: '涉及豪门世家，商业联姻，权谋',
    keywords: ['豪门', '世家', '总裁', '商业', '联姻', '权谋', '继承', '豪门世家', '商业帝国', '总裁文']
  },
  {
    name: '先婚后爱文',
    description: '先结婚后恋爱，契约婚姻',
    keywords: ['先婚后爱', '契约婚姻', '闪婚', '假结婚', '婚后恋爱', '契约夫妻', '闪婚', '假结婚']
  },
  {
    name: '校园文',
    description: '发生在校园的青春故事',
    keywords: ['校园', '学生', '青春', '学校', '同学', '老师', '高考', '大学', '高中', '校园生活']
  },
  {
    name: '都市文',
    description: '现代都市生活，职场情感',
    keywords: ['都市', '职场', '白领', '办公室', '现代', '都市生活', '职场', '白领', '都市情感']
  },
  {
    name: '古言文',
    description: '古代背景，宫廷或江湖',
    keywords: ['古代', '宫廷', '江湖', '王爷', '公主', '皇帝', '古代背景', '宫廷', '江湖', '古代言情']
  },
  {
    name: '现言文',
    description: '现代言情，非校园非职场',
    keywords: ['现代', '言情', '恋爱', '现代背景', '现代言情', '都市言情']
  }
]

// 使用Gemini进行智能分类
export async function classifyNovelWithAI(description: string): Promise<string> {
  const googleApiKey = process.env.GOOGLE_API_KEY
  
  if (!googleApiKey) {
    // 如果没有Gemini API，使用关键词匹配
    return classifyNovelWithKeywords(description)
  }

  try {
    const genAI = new GoogleGenerativeAI(googleApiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const categories = categoryDefinitions.map(cat => cat.name).join('、')
    
    const prompt = `你是一个小说分类专家。请根据小说简介将其分类为以下类别之一：${categories}。

分类标准：
- 暗恋文：主角暗恋他人，情感细腻，内心戏丰富
- 救赎文：主角通过爱情或经历得到救赎，治愈系
- 豪门文：涉及豪门世家，商业联姻，权谋
- 先婚后爱文：先结婚后恋爱，契约婚姻
- 校园文：发生在校园的青春故事
- 都市文：现代都市生活，职场情感
- 古言文：古代背景，宫廷或江湖
- 现言文：现代言情，非校园非职场
- 其他：不属于以上分类的小说

请只返回分类名称，不要包含其他内容。

小说简介：${description}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text().trim()
    
    // 验证结果是否在预定义分类中
    if (text && categoryDefinitions.some(cat => cat.name === text)) {
      return text
    }
    
    return '其他'
  } catch (error) {
    console.error('Gemini分类错误:', error)
    // 降级到关键词匹配
    return classifyNovelWithKeywords(description)
  }
}

// 使用关键词匹配进行分类
export function classifyNovelWithKeywords(description: string): string {
  const lowerDesc = description.toLowerCase()
  
  // 计算每个分类的匹配分数
  const scores = categoryDefinitions.map(category => {
    const matchCount = category.keywords.filter(keyword => 
      lowerDesc.includes(keyword.toLowerCase())
    ).length
    
    return {
      category: category.name,
      score: matchCount
    }
  })
  
  // 找到得分最高的分类
  const bestMatch = scores.reduce((best, current) => 
    current.score > best.score ? current : best
  )
  
  // 如果没有匹配到任何关键词，返回"其他"
  return bestMatch.score > 0 ? bestMatch.category : '其他'
}

// 混合分类方法（推荐）
export async function classifyNovel(description: string): Promise<string> {
  try {
    // 优先使用AI分类
    return await classifyNovelWithAI(description)
  } catch (error) {
    // 降级到关键词匹配
    return classifyNovelWithKeywords(description)
  }
} 