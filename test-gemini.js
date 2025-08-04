// 使用ES模块语法
import fetch from 'node-fetch';
import { GoogleGenerativeAI } from '@google/generative-ai';

// 添加fetch到全局
global.fetch = fetch;

// 测试Gemini API
async function testGeminiAPI() {
  try {
    const apiKey = process.env.GOOGLE_API_KEY || 'AIzaSyBsHmACZgGxOUVoRSFERBGGChWiIPHrFgk';
    
    if (!apiKey) {
      console.error('❌ 未找到GOOGLE_API_KEY环境变量');
      return;
    }

    console.log('🔍 正在测试Gemini API...');
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `你是一个小说分类专家。请根据小说简介将其分类为以下类别之一：暗恋文、救赎文、豪门文、先婚后爱文、校园文、都市文、古言文、现言文、其他。

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

小说简介：一个霸道总裁和普通女孩的契约婚姻故事，两人从互相看不顺眼到慢慢相爱。`;

    console.log('📝 发送测试请求...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    console.log('✅ Gemini API测试成功！');
    console.log('📖 测试小说分类结果:', text);
    
  } catch (error) {
    console.error('❌ Gemini API测试失败:', error.message);
  }
}

// 运行测试
testGeminiAPI(); 