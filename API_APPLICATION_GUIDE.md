# 🔍 API申请指南

## 📋 概述

本指南将帮助你申请各种搜索API，以增强小说助手的功能。目前项目支持以下搜索API：

- **百度搜索API** - 中文搜索，结果丰富
- **必应搜索API** - 微软搜索，全球覆盖
- **Google搜索API** - 谷歌搜索，准确度高

## 🚀 当前状态

### ✅ 已实现功能
- **模拟数据搜索** - 无需API，立即可用
- **Gemini AI分类** - 智能小说分类
- **本地收藏管理** - 完整功能
- **飞书导出** - 文档导出功能

### 🔄 可选功能
- **真实搜索API** - 需要申请API密钥

## 📝 百度搜索API申请

### 申请步骤

1. **注册账号**
   - 访问 [百度AI开放平台](https://ai.baidu.com)
   - 使用百度账号登录

2. **实名认证**
   - **个人用户**：身份证正反面照片
   - **企业用户**：营业执照、法人身份证

3. **创建应用**
   - 选择"搜索API"服务
   - 填写应用信息
   - 获取API Key和Secret Key

4. **配置环境变量**
   ```env
   BAIDU_SEARCH_API_KEY=your_baidu_api_key_here
   ```

### 申请材料

#### 个人用户
- ✅ 百度账号
- ✅ 身份证正反面
- ✅ 手机号码
- ✅ 邮箱地址

#### 企业用户
- ✅ 企业营业执照
- ✅ 法人身份证
- ✅ 企业银行账户
- ✅ 企业联系方式

### 费用说明
- **免费额度**：每月1000次调用
- **付费标准**：超出部分按量计费
- **计费单位**：按API调用次数

## 🔍 必应搜索API申请

### 申请步骤

1. **注册Azure账号**
   - 访问 [Microsoft Azure](https://azure.microsoft.com)
   - 注册免费账号

2. **创建搜索服务**
   - 在Azure门户创建"必应搜索"资源
   - 选择定价层（有免费层）

3. **获取API密钥**
   - 在资源概览页面获取密钥
   - 配置到环境变量

4. **配置环境变量**
   ```env
   BING_SEARCH_API_KEY=your_bing_api_key_here
   ```

### 费用说明
- **免费层**：每月1000次调用
- **标准层**：按调用次数计费
- **企业层**：定制价格

## 🌐 Google搜索API申请

### 申请步骤

1. **Google Cloud账号**
   - 访问 [Google Cloud Console](https://console.cloud.google.com)
   - 创建项目

2. **启用搜索API**
   - 在API库中启用"Custom Search API"
   - 创建凭据

3. **获取API密钥**
   - 生成API密钥
   - 设置使用限制

4. **配置环境变量**
   ```env
   GOOGLE_SEARCH_API_KEY=your_google_api_key_here
   GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id
   ```

### 费用说明
- **免费额度**：每天100次查询
- **付费标准**：$5/1000次查询

## 🛠️ 技术实现

### 当前搜索实现

项目目前使用**模拟数据搜索**，包含8个预设的小说数据：

1. **霸道总裁的契约娇妻** - 先婚后爱文
2. **校园青春恋歌** - 校园文
3. **暗恋十年终成眷属** - 暗恋文
4. **重生之都市修仙** - 救赎文
5. **古代宫廷权谋** - 古言文
6. **职场女强人的爱情** - 都市文
7. **救赎之恋** - 救赎文
8. **豪门世家的联姻** - 豪门文

### 搜索逻辑

```typescript
// 关键词匹配算法
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
```

### 启用真实API

如果你想使用真实的搜索API，可以修改 `app/utils/search.ts` 文件：

```typescript
// 修改主要搜索函数
export async function searchNovels(query: string): Promise<Novel[]> {
  // 使用百度API
  try {
    return await searchNovelsWithBaidu(query)
  } catch (error) {
    console.error('百度搜索失败，使用模拟数据:', error)
    return await searchNovelsWithMock(query)
  }
}
```

## 💡 推荐方案

### 方案1：继续使用模拟数据（推荐）
- ✅ **优点**：无需申请API，立即可用
- ✅ **优点**：无费用，无限制
- ✅ **优点**：响应速度快
- ⚠️ **缺点**：数据有限，不够真实

### 方案2：申请百度搜索API
- ✅ **优点**：中文搜索结果丰富
- ✅ **优点**：免费额度充足
- ⚠️ **缺点**：需要实名认证
- ⚠️ **缺点**：申请流程较复杂

### 方案3：申请必应搜索API
- ✅ **优点**：申请简单，有免费层
- ✅ **优点**：全球搜索结果
- ⚠️ **缺点**：中文结果可能不如百度

## 🔧 测试搜索功能

### 测试关键词建议

你可以尝试以下搜索关键词来测试功能：

- **"霸道总裁"** - 应该返回豪门文相关结果
- **"校园"** - 应该返回校园文相关结果
- **"暗恋"** - 应该返回暗恋文相关结果
- **"重生"** - 应该返回救赎文相关结果
- **"古代"** - 应该返回古言文相关结果
- **"职场"** - 应该返回都市文相关结果

### 启动测试

```bash
# 启动开发服务器
npm run dev

# 访问应用
http://localhost:3000

# 在搜索框中输入关键词进行测试
```

## 📞 技术支持

### 常见问题

1. **API申请被拒绝**
   - 检查实名认证信息是否完整
   - 确认企业资质是否有效
   - 联系平台客服咨询

2. **API调用失败**
   - 检查API密钥是否正确
   - 确认API配额是否充足
   - 查看网络连接是否正常

3. **搜索结果不准确**
   - 调整搜索关键词
   - 检查API参数配置
   - 查看API文档说明

### 获取帮助

- 📖 **文档**：查看 README.md
- 🚀 **部署**：查看 DEPLOYMENT.md
- 🔄 **迁移**：查看 MIGRATION_SUMMARY.md
- 💬 **问题反馈**：提交 GitHub Issue

## 🎯 总结

**推荐使用当前方案**：项目已经实现了完整的功能，包括智能分类、本地收藏、飞书导出等。模拟数据搜索虽然数据有限，但足以演示和测试所有功能。

如果你需要真实的搜索功能，可以按照本指南申请相应的API。但请注意，申请过程可能需要一些时间和资质审核。

**当前项目状态：功能完整，可以正常使用！** 🎉 