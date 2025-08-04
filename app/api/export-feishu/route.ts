import { NextRequest, NextResponse } from 'next/server'
import { Novel } from '../../types'

// 飞书API配置
const FEISHU_APP_ID = process.env.FEISHU_APP_ID
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET
const FEISHU_FOLDER_TOKEN = process.env.FEISHU_FOLDER_TOKEN

// 获取飞书访问令牌
async function getFeishuAccessToken(): Promise<string> {
  try {
    const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_id: FEISHU_APP_ID,
        app_secret: FEISHU_APP_SECRET,
      }),
    })

    const data = await response.json()
    
    if (data.code !== 0) {
      throw new Error(`获取访问令牌失败: ${data.msg}`)
    }

    return data.tenant_access_token
  } catch (error) {
    console.error('获取飞书访问令牌错误:', error)
    throw error
  }
}

// 创建飞书文档
async function createFeishuDocument(accessToken: string, title: string): Promise<string> {
  try {
    const response = await fetch('https://open.feishu.cn/open-apis/docx/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        folder_token: FEISHU_FOLDER_TOKEN,
        title: title,
      }),
    })

    const data = await response.json()
    
    if (data.code !== 0) {
      throw new Error(`创建文档失败: ${data.msg}`)
    }

    return data.data.document.document_id
  } catch (error) {
    console.error('创建飞书文档错误:', error)
    throw error
  }
}

// 更新文档内容
async function updateDocumentContent(accessToken: string, documentId: string, content: string): Promise<void> {
  try {
    const response = await fetch(`https://open.feishu.cn/open-apis/docx/v1/documents/${documentId}/blocks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            insert_block: {
              location: {
                index: 0,
              },
              block: {
                type: 'text',
                text: {
                  content: content,
                },
              },
            },
          },
        ],
      }),
    })

    const data = await response.json()
    
    if (data.code !== 0) {
      throw new Error(`更新文档内容失败: ${data.msg}`)
    }
  } catch (error) {
    console.error('更新文档内容错误:', error)
    throw error
  }
}

// 按分类组织小说数据
function organizeNovelsByCategory(novels: Novel[]): Record<string, Novel[]> {
  const organized: Record<string, Novel[]> = {}
  
  novels.forEach(novel => {
    const category = novel.category || '其他'
    if (!organized[category]) {
      organized[category] = []
    }
    organized[category].push(novel)
  })
  
  return organized
}

// 生成文档内容
function generateDocumentContent(novels: Novel[]): string {
  const organized = organizeNovelsByCategory(novels)
  const totalCount = novels.length
  
  let content = `# 📚 我的小说收藏\n\n`
  content += `**导出时间**: ${new Date().toLocaleString('zh-CN')}\n`
  content += `**总收藏数**: ${totalCount} 本\n\n`
  
  // 按分类生成内容
  Object.entries(organized).forEach(([category, categoryNovels]) => {
    content += `## ${category} (${categoryNovels.length}本)\n\n`
    
    categoryNovels.forEach((novel, index) => {
      content += `### ${index + 1}. ${novel.title}\n\n`
      content += `**作者**: ${novel.author}\n\n`
      content += `**简介**: ${novel.description}\n\n`
      content += `**保存时间**: ${novel.searchDate}\n\n`
      content += `---\n\n`
    })
  })
  
  return content
}

// 导出到飞书API
export async function POST(request: NextRequest) {
  try {
    // 检查环境变量
    if (!FEISHU_APP_ID || !FEISHU_APP_SECRET || !FEISHU_FOLDER_TOKEN) {
      return NextResponse.json(
        { error: '飞书API配置不完整，请检查环境变量' },
        { status: 500 }
      )
    }

    const { novels } = await request.json()
    
    if (!novels || !Array.isArray(novels) || novels.length === 0) {
      return NextResponse.json(
        { error: '没有可导出的收藏数据' },
        { status: 400 }
      )
    }

    // 获取访问令牌
    const accessToken = await getFeishuAccessToken()
    
    // 生成文档标题和内容
    const title = `小说收藏_${new Date().toLocaleDateString('zh-CN')}`
    const content = generateDocumentContent(novels)
    
    // 创建文档
    const documentId = await createFeishuDocument(accessToken, title)
    
    // 更新文档内容
    await updateDocumentContent(accessToken, documentId, content)
    
    return NextResponse.json({
      success: true,
      message: '成功导出到飞书文档',
      documentId: documentId,
      title: title,
      count: novels.length
    })
    
  } catch (error) {
    console.error('飞书导出错误:', error)
    return NextResponse.json(
      { error: '导出失败，请稍后重试' },
      { status: 500 }
    )
  }
}

// 健康检查API
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: '飞书导出API正常运行',
    config: {
      hasAppId: !!FEISHU_APP_ID,
      hasAppSecret: !!FEISHU_APP_SECRET,
      hasFolderToken: !!FEISHU_FOLDER_TOKEN,
    }
  })
} 