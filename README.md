# 📚 小说助手 - AI智能小说搜索与分类系统

一个基于AI技术的小说搜索、分类和收藏管理平台，帮助你发现和整理喜爱的小说。

## ✨ 功能特点

- 🔍 **智能搜索**: 输入小说名称，AI自动搜索相关信息
- 🏷️ **自动分类**: 根据小说简介智能分类（暗恋文、救赎文、豪门文等）
- 💾 **本地收藏**: 保存喜欢的小说到本地收藏夹
- 📊 **分类管理**: 按不同类别筛选和管理收藏
- 📄 **飞书导出**: 一键导出收藏到飞书文档
- 🎨 **美观界面**: 现代化UI设计，用户体验优秀

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd novel-assistant
```

2. **安装依赖**
```bash
npm install
# 或
yarn install
```

3. **配置环境变量**
```bash
cp env.example .env.local
```

编辑 `.env.local` 文件，填入必要的API密钥：
```env
# Gemini API配置（用于智能分类）
GOOGLE_API_KEY=your_google_api_key_here

# 飞书API配置（用于文档导出）
FEISHU_APP_ID=your_feishu_app_id_here
FEISHU_APP_SECRET=your_feishu_app_secret_here
FEISHU_FOLDER_TOKEN=your_feishu_folder_token_here
```

4. **启动开发服务器**
```bash
npm run dev
# 或
yarn dev
```

5. **访问应用**
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📋 小说分类

系统支持以下小说分类：

- **暗恋文**: 主角暗恋他人，情感细腻
- **救赎文**: 通过爱情或经历得到救赎
- **豪门文**: 涉及豪门世家，商业联姻
- **先婚后爱文**: 先结婚后恋爱，契约婚姻
- **校园文**: 发生在校园的青春故事
- **都市文**: 现代都市生活，职场情感
- **古言文**: 古代背景，宫廷或江湖
- **现言文**: 现代言情，非校园非职场
- **其他**: 不属于以上分类的小说

## 🔧 技术栈

- **前端**: Next.js 14, React 18, TypeScript
- **样式**: Tailwind CSS
- **图标**: Heroicons
- **AI**: OpenAI API
- **搜索**: 可集成百度、必应等搜索API
- **文档**: 飞书文档API

## 📁 项目结构

```
novel-assistant/
├── app/
│   ├── api/                 # API路由
│   │   ├── search/         # 搜索API
│   │   └── export-feishu/  # 飞书导出API
│   ├── components/         # React组件
│   │   ├── SearchForm.tsx
│   │   ├── NovelResults.tsx
│   │   └── SavedNovels.tsx
│   ├── globals.css         # 全局样式
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 主页面
│   └── types.ts            # TypeScript类型
├── public/                 # 静态资源
├── package.json
├── tailwind.config.js
└── README.md
```

## 🔌 API集成

### 搜索API集成

当前使用模拟数据，你可以集成以下搜索API：

1. **百度搜索API**
2. **必应搜索API**
3. **Google搜索API**
4. **小说网站API**

在 `app/api/search/route.ts` 中修改 `searchNovels` 函数。

### Gemini API集成

在 `app/utils/ai.ts` 中已经集成了Gemini API进行智能分类：

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

async function classifyNovel(description: string): Promise<string> {
  const prompt = `你是一个小说分类专家，请根据小说简介将其分类为：暗恋文、救赎文、豪门文、先婚后爱文、校园文、都市文、古言文、现言文、其他。只返回分类名称。

小说简介：${description}`

  const result = await model.generateContent(prompt)
  const response = await result.response
  return response.text().trim() || '其他'
}
```

## 🚀 部署

### Vercel部署（推荐）

1. 将代码推送到GitHub
2. 在Vercel中导入项目
3. 配置环境变量
4. 部署完成

### 其他平台

支持部署到任何支持Next.js的平台：
- Netlify
- Railway
- Heroku
- 自建服务器

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

## 📞 联系方式

如有问题，请提交Issue或联系开发者。 