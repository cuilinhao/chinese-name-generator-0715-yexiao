"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, Download, RefreshCw, Heart, Star } from "lucide-react"
import type { ChineseName } from "../types"
import { useState } from "react"

interface ResultsSectionProps {
  results: ChineseName[]
  onRegenerate: () => void
  isLoading: boolean
}

export default function ResultsSection({ results, onRegenerate, isLoading }: ResultsSectionProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = async (name: ChineseName, index: number) => {
    const text = `${name.name} (${name.pinyin}) — ${name.meaning}`
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error("复制失败:", err)
    }
  }

  const downloadNameCard = (name: ChineseName) => {
    // 这里会实现下载名片功能
    console.log("下载名片:", name)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Star className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-800">为你精心挑选的中文名字</h2>
          <Star className="w-6 h-6 text-orange-500" />
        </div>
        <p className="text-gray-600">每个名字都蕴含着美好的寓意，选择最适合你的那一个吧</p>
      </div>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {results.map((name, index) => (
          <Card
            key={index}
            className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
          >
            <CardContent className="p-6">
              {/* Name Display */}
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-800 mb-2 group-hover:scale-105 transition-transform">
                  {name.name}
                </div>
                <div className="text-lg text-gray-500 font-medium">{name.pinyin}</div>
              </div>

              {/* Meaning */}
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed">{name.meaning}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={() => copyToClipboard(name, index)}
                  variant="outline"
                  className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copiedIndex === index ? "已复制!" : "复制"}
                </Button>
                <Button
                  onClick={() => downloadNameCard(name)}
                  variant="outline"
                  className="flex-1 border-pink-200 text-pink-600 hover:bg-pink-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  下载名片
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Regenerate Button */}
      <div className="text-center">
        <Button
          onClick={onRegenerate}
          disabled={isLoading}
          className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl shadow-lg"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          再来一次
        </Button>
      </div>
    </div>
  )
}
