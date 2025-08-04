import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '小说助手 - AI智能小说搜索与分类',
  description: '使用AI技术帮你搜索、分类和保存喜欢的小说',
  other: {
    'baidu-site-verification': 'codeva-L0W9rpGXWM',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="baidu-site-verification" content="codeva-L0W9rpGXWM" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
          {children}
        </div>
      </body>
    </html>
  )
} 