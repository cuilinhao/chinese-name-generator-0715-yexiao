import { type NextRequest, NextResponse } from "next/server"

interface DeepSeekResponse {
  id: string
  object: string
  created: number
  model: string
  choices: Array<{
    index: number
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

interface ChineseName {
  name: string
  pinyin: string
  meaning: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { gender, originalName, traits } = body

    // 验证输入
    if (!gender || !originalName || !traits || traits.length === 0) {
      return NextResponse.json(
        { error: "请提供完整的信息：性别、原名和至少一个特点" },
        { status: 400 }
      )
    }

    // DeepSeek API 配置
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "sk-b6320565104c4e358b7fc269e531246d"
    const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions"

    // 构建性别描述
    const genderMap = {
      male: "男性",
      female: "女性", 
      neutral: "中性"
    }
    const genderText = genderMap[gender as keyof typeof genderMap] || "中性"

    // 构建prompt
    const systemPrompt = `你是一位资深的中文起名大师，专门为外国朋友起中文名字。你需要根据用户提供的信息，生成4个富有意义的中文名字。

起名原则：
1. 名字要符合中文传统文化和美好寓意
2. 考虑用户的性别特征
3. 结合用户的个人特点和原名特色
4. 名字要朗朗上口，易于记忆
5. 避免生僻字，选择常用且寓意好的汉字

请严格按照以下JSON格式返回，不要添加任何其他文字：
[
  {
    "name": "中文名字",
    "pinyin": "Pīnyīn",
    "meaning": "详细的寓意解释"
  }
]`

    const userPrompt = `请为一位${genderText}朋友起中文名字：
- 原名：${originalName}
- 个人特点：${traits.join('、')}

请生成4个符合这些特点的中文名字，每个名字都要有深刻的文化内涵和美好寓意。`

    console.log("正在调用DeepSeek API...")

    // 调用DeepSeek API
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        stream: false,
        temperature: 0.7,
        max_tokens: 2000
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("DeepSeek API错误:", response.status, errorText)
      throw new Error(`DeepSeek API调用失败: ${response.status}`)
    }

    const data: DeepSeekResponse = await response.json()
    console.log("DeepSeek API响应:", data)

    if (!data.choices || data.choices.length === 0) {
      throw new Error("API返回数据格式错误")
    }

    const aiResponse = data.choices[0].message.content.trim()
    console.log("AI生成的内容:", aiResponse)

    // 解析AI返回的JSON
    let names: ChineseName[]
    try {
      // 尝试直接解析JSON
      names = JSON.parse(aiResponse)
    } catch (parseError) {
      console.error("JSON解析失败，尝试提取JSON:", parseError)
      
      // 尝试从文本中提取JSON
      const jsonMatch = aiResponse.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        try {
          names = JSON.parse(jsonMatch[0])
        } catch (extractError) {
          console.error("提取JSON失败:", extractError)
          throw new Error("AI返回格式无法解析")
        }
      } else {
        throw new Error("AI返回中未找到有效的JSON数据")
      }
    }

    // 验证返回数据格式
    if (!Array.isArray(names) || names.length === 0) {
      throw new Error("AI返回的名字数据格式错误")
    }

    // 确保每个名字都有必需的字段
    const validNames = names.filter(name => 
      name && 
      typeof name.name === 'string' && 
      typeof name.pinyin === 'string' && 
      typeof name.meaning === 'string' &&
      name.name.trim() !== '' &&
      name.pinyin.trim() !== '' &&
      name.meaning.trim() !== ''
    ).slice(0, 4) // 最多返回4个名字

    if (validNames.length === 0) {
      throw new Error("AI生成的名字格式不正确")
    }

    console.log(`成功生成${validNames.length}个名字`)

    return NextResponse.json({
      names: validNames,
      usage: data.usage // 返回API使用统计
    })

  } catch (error) {
    console.error("生成名字失败:", error)
    
    // 如果AI调用失败，返回备用名字
    const fallbackNames = [
      {
        name: "志远",
        pinyin: "Zhì Yuǎn", 
        meaning: "胸怀远志，勇于探索未知领域",
      },
      {
        name: "思雅",
        pinyin: "Sī Yǎ",
        meaning: "思维敏捷，举止优雅得体",
      },
      {
        name: "晨光", 
        pinyin: "Chén Guāng",
        meaning: "如晨曦之光，带来希望与活力",
      },
      {
        name: "悦心",
        pinyin: "Yuè Xīn",
        meaning: "心情愉悦，给人带来快乐",
      },
    ]

    return NextResponse.json({
      names: fallbackNames,
      fallback: true,
      error: error instanceof Error ? error.message : "生成失败，返回备用名字"
    })
  }
}
