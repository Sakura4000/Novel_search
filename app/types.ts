export interface Novel {
  title: string
  author: string
  description: string
  category: NovelCategory
  searchDate: string
  savedDate?: string
}

export type NovelCategory = 
  | '暗恋文'
  | '救赎文'
  | '豪门文'
  | '先婚后爱文'
  | '校园文'
  | '都市文'
  | '古言文'
  | '现言文'
  | '其他'

export interface CategoryDefinition {
  name: NovelCategory
  description: string
  keywords: string[]
}

export interface SearchResult {
  title: string
  author: string
  description: string
  url?: string
  source?: string
} 