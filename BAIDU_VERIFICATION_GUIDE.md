# 🔍 百度API站点验证指南

## 📋 问题说明

在申请百度API时，百度要求添加站点验证代码到HTML的`<head>`标签中。由于你的项目使用Next.js框架，HTML代码是动态生成的，需要特殊处理。

## ✅ 已完成的配置

我已经为你完成了以下配置：

### 1. 添加验证代码到Layout
在 `app/layout.tsx` 中添加了百度验证代码：

```tsx
<head>
  <meta name="baidu-site-verification" content="codeva-L0W9rpGXWM" />
</head>
```

### 2. 创建验证页面
创建了专门的验证页面：`app/baidu-verification/page.tsx`

## 🚀 部署步骤

### 方案1：使用Vercel部署（推荐）

1. **推送代码到GitHub**
   ```bash
   git add .
   git commit -m "Add Baidu site verification"
   git push origin main
   ```

2. **在Vercel部署**
   - 访问 [vercel.com](https://vercel.com)
   - 导入你的GitHub仓库
   - 自动部署完成

3. **获取部署URL**
   - 部署完成后会得到一个类似 `https://your-project.vercel.app` 的URL
   - 这个URL就是你的网站地址

### 方案2：使用Netlify部署

1. **构建项目**
   ```bash
   npm run build
   ```

2. **部署到Netlify**
   - 访问 [netlify.com](https://netlify.com)
   - 拖拽 `out` 文件夹到部署区域
   - 获得部署URL

### 方案3：本地测试（仅用于验证）

如果你只想测试验证功能：

```bash
# 启动开发服务器
npm run dev

# 访问验证页面
http://localhost:3000/baidu-verification
```

## 🔍 验证步骤

### 1. 获取网站URL
部署完成后，你会得到一个公开可访问的URL，例如：
- `https://your-project.vercel.app`
- `https://your-project.netlify.app`

### 2. 在百度平台验证
1. 回到百度AI开放平台
2. 在验证页面输入你的网站URL
3. 点击"验证"按钮
4. 百度会检查你的网站是否包含验证代码

### 3. 验证成功
验证成功后，你就可以继续申请百度API了。

## 📁 文件结构

```
app/
├── layout.tsx                    # 包含百度验证代码
├── baidu-verification/
│   └── page.tsx                 # 验证页面
└── ...
```

## 🛠️ 验证代码位置

百度验证代码已经添加到以下位置：

1. **HTML Head标签** - `app/layout.tsx`
2. **验证页面** - `app/baidu-verification/page.tsx`

## 🔧 技术说明

### Next.js App Router
在Next.js 13+ App Router中，HTML结构在 `app/layout.tsx` 中定义：

```tsx
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
      <body>
        {children}
      </body>
    </html>
  )
}
```

### 验证代码
```html
<meta name="baidu-site-verification" content="codeva-L0W9rpGXWM" />
```

## 📞 常见问题

### Q: 验证失败怎么办？
A: 确保：
1. 网站已经部署并可以访问
2. 验证代码已正确添加到HTML head中
3. 等待几分钟让百度重新检查

### Q: 本地开发环境可以验证吗？
A: 不可以，百度需要访问公开的网站URL。必须部署到Vercel、Netlify等平台。

### Q: 验证完成后需要保留验证代码吗？
A: 建议保留，以防百度后续需要重新验证。

## 🎯 下一步

验证成功后：
1. 继续完成百度API申请流程
2. 获取API密钥
3. 配置到项目的环境变量中
4. 启用真实的搜索功能

## 📞 技术支持

如果遇到问题：
- 检查部署是否成功
- 确认网站URL可以正常访问
- 查看浏览器开发者工具中的HTML源码
- 联系百度平台客服

---

**验证完成后，你就可以继续申请百度API了！** 🎉 