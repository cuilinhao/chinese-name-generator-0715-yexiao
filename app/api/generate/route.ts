import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { gender, originalName, traits } = body

    // 这里会集成OpenAI API
    // 现在返回模拟数据
    const mockNames = [
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

    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json({
      names: mockNames.slice(0, 4),
    })
  } catch (error) {
    console.error("生成名字失败:", error)
    return NextResponse.json({ error: "生成失败，请重试" }, { status: 500 })
  }
}
