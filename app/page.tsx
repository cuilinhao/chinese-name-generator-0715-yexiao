"use client"

import { useState } from "react"
import NameForm from "./components/NameForm"
import ResultsSection from "./components/ResultsSection"
import type { ChineseName } from "./types"

export default function Home() {
  const [results, setResults] = useState<ChineseName[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleGenerate = async (formData: {
    gender: string
    originalName: string
    traits: string[]
  }) => {
    setIsLoading(true)

    try {
      // 调用真实的API端点
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`请求失败: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.error) {
        console.error('API错误:', data.error)
        throw new Error(data.error)
      }

      if (data.fallback) {
        console.warn('使用备用名字:', data.error)
      }

      if (data.usage) {
        console.log('API使用统计:', data.usage)
      }

      setResults(data.names || [])
      setShowResults(true)
    } catch (error) {
      console.error("生成失败:", error)
      
      // 如果网络请求完全失败，使用本地备用数据
      const fallbackResults: ChineseName[] = [
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

      setResults(fallbackResults)
      setShowResults(true)
      
      // 可以在这里显示错误提示
      alert('生成失败，已显示示例名字。请检查网络连接或稍后重试。')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegenerate = () => {
    setShowResults(false)
    setResults([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">名</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                中文起名助手
              </h1>
            </div>
            <div className="text-sm text-gray-500">为外国朋友量身定制</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {!showResults ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                找到属于你的
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  中文名字
                </span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                告诉我们一些关于你的信息，我们将为你生成富有意义的中文名字，每个名字都承载着美好的寓意
              </p>
            </div>

            {/* Form */}
            <NameForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>
        ) : (
          <ResultsSection results={results} onRegenerate={handleRegenerate} isLoading={isLoading} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-orange-100 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
          <p>© 2024 中文起名助手 - 让每个名字都有故事</p>
        </div>
      </footer>
    </div>
  )
}
