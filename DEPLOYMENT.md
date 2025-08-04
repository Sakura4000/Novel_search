# 🚀 部署指南

## 本地开发

### 1. 环境准备

确保你的系统已安装：
- Node.js 18+ 
- npm 或 yarn

### 2. 快速启动

**Windows用户：**
```bash
# 双击运行
start.bat
```

**其他系统：**
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 3. 配置环境变量

复制环境变量模板：
```bash
cp env.example .env.local
```

编辑 `.env.local` 文件，配置必要的API密钥：

```env
# Gemini API配置（用于智能分类）
GOOGLE_API_KEY=your-google-api-key

# 飞书API配置（用于文档导出）
FEISHU_APP_ID=your-feishu-app-id
FEISHU_APP_SECRET=your-feishu-app-secret
FEISHU_FOLDER_TOKEN=your-feishu-folder-token

# 搜索API配置（可选）
BING_SEARCH_API_KEY=your-bing-search-api-key
BAIDU_SEARCH_API_KEY=your-baidu-search-api-key
```

## 生产部署

### Vercel部署（推荐）

1. **准备代码**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Vercel部署**
   - 访问 [vercel.com](https://vercel.com)
   - 导入GitHub仓库
   - 配置环境变量
   - 部署完成

3. **环境变量配置**
   在Vercel项目设置中添加以下环境变量：
   - `GOOGLE_API_KEY`
   - `FEISHU_APP_ID`
   - `FEISHU_APP_SECRET`
   - `FEISHU_FOLDER_TOKEN`

### 其他平台部署

#### Netlify
```bash
# 构建项目
npm run build

# 部署到Netlify
netlify deploy --prod
```

#### Railway
```bash
# 连接Railway
railway login
railway init
railway up
```

#### 自建服务器
```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

## API配置指南

### Gemini API配置

1. 访问 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 注册账号并获取API密钥
3. 将API密钥添加到环境变量

### 飞书API配置

1. **创建飞书应用**
   - 访问 [飞书开放平台](https://open.feishu.cn)
   - 创建企业自建应用
   - 获取App ID和App Secret

2. **配置权限**
   - 添加文档权限：`docx:write`
   - 添加文件夹权限：`folder:read`

3. **获取文件夹Token**
   - 在飞书中创建文件夹
   - 右键文件夹 → 获取Token

4. **配置环境变量**
   ```env
   FEISHU_APP_ID=your-app-id
   FEISHU_APP_SECRET=your-app-secret
   FEISHU_FOLDER_TOKEN=your-folder-token
   ```

### 搜索API配置（可选）

#### 必应搜索API
1. 访问 [Microsoft Azure](https://azure.microsoft.com)
2. 创建必应搜索资源
3. 获取API密钥

#### 百度搜索API
1. 访问 [百度AI开放平台](https://ai.baidu.com)
2. 申请搜索API权限
3. 获取API密钥

## 性能优化

### 1. 图片优化
- 使用Next.js内置的Image组件
- 配置CDN加速

### 2. 缓存策略
- 启用Redis缓存
- 配置API响应缓存

### 3. 数据库优化
- 使用连接池
- 优化查询语句

## 监控和维护

### 1. 日志监控
```bash
# 查看应用日志
npm run logs
```

### 2. 性能监控
- 集成Sentry错误监控
- 使用Vercel Analytics

### 3. 定期维护
- 更新依赖包
- 检查API配额
- 备份数据

## 故障排除

### 常见问题

1. **依赖安装失败**
   ```bash
   # 清除缓存
   npm cache clean --force
   # 重新安装
   npm install
   ```

2. **API调用失败**
   - 检查API密钥是否正确
   - 确认API配额是否充足
   - 查看网络连接

3. **飞书导出失败**
   - 检查应用权限配置
   - 确认文件夹Token有效
   - 查看飞书API文档

### 获取帮助

- 查看 [README.md](./README.md)
- 提交 [GitHub Issue](https://github.com/your-repo/issues)
- 联系开发者

## 安全注意事项

1. **API密钥安全**
   - 不要在代码中硬编码API密钥
   - 使用环境变量管理敏感信息
   - 定期轮换API密钥

2. **数据安全**
   - 启用HTTPS
   - 实施访问控制
   - 定期备份数据

3. **代码安全**
   - 定期更新依赖
   - 扫描安全漏洞
   - 实施代码审查 