"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Sparkles } from "lucide-react"

interface NameFormProps {
  onGenerate: (data: {
    gender: string
    originalName: string
    traits: string[]
  }) => void
  isLoading: boolean
}

const SUGGESTED_TRAITS = [
  "友善",
  "聪明",
  "创意",
  "勇敢",
  "温柔",
  "幽默",
  "工程师",
  "艺术家",
  "教师",
  "医生",
  "学生",
  "企业家",
  "音乐",
  "运动",
  "阅读",
  "旅行",
  "摄影",
  "烹饪",
]

export default function NameForm({ onGenerate, isLoading }: NameFormProps) {
  const [gender, setGender] = useState("")
  const [originalName, setOriginalName] = useState("")
  const [traits, setTraits] = useState<string[]>([])
  const [customTrait, setCustomTrait] = useState("")

  const addTrait = (trait: string) => {
    if (traits.length < 3 && !traits.includes(trait)) {
      setTraits([...traits, trait])
    }
  }

  const removeTrait = (trait: string) => {
    setTraits(traits.filter((t) => t !== trait))
  }

  const addCustomTrait = () => {
    if (customTrait.trim() && traits.length < 3 && !traits.includes(customTrait.trim())) {
      setTraits([...traits, customTrait.trim()])
      setCustomTrait("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (gender && originalName && traits.length > 0) {
      onGenerate({ gender, originalName, traits })
    }
  }

  const isFormValid = gender && originalName && traits.length > 0

  return (
    <Card className="max-w-2xl mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl text-gray-800 flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-orange-500" />
          告诉我们关于你的信息
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Gender Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-gray-700">性别</Label>
            <div className="flex gap-3">
              {[
                { value: "male", label: "男性", emoji: "👨" },
                { value: "female", label: "女性", emoji: "👩" },
                { value: "neutral", label: "中性", emoji: "🧑" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setGender(option.value)}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    gender === option.value
                      ? "border-orange-400 bg-orange-50 text-orange-700"
                      : "border-gray-200 hover:border-orange-200 hover:bg-orange-25"
                  }`}
                >
                  <div className="text-2xl mb-1">{option.emoji}</div>
                  <div className="font-medium">{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Original Name */}
          <div className="space-y-3">
            <Label htmlFor="originalName" className="text-base font-medium text-gray-700">
              你的名字或昵称
            </Label>
            <Input
              id="originalName"
              value={originalName}
              onChange={(e) => setOriginalName(e.target.value)}
              placeholder="例如: John, Sarah, Alex..."
              className="h-12 text-base border-gray-200 focus:border-orange-400 focus:ring-orange-400"
            />
          </div>

          {/* Traits Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-gray-700">描述你的特点 (最多选择3个)</Label>

            {/* Selected Traits */}
            {traits.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-orange-50 rounded-lg">
                {traits.map((trait) => (
                  <Badge
                    key={trait}
                    variant="secondary"
                    className="bg-orange-200 text-orange-800 hover:bg-orange-300 px-3 py-1"
                  >
                    {trait}
                    <button type="button" onClick={() => removeTrait(trait)} className="ml-2 hover:text-orange-900">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Suggested Traits */}
            <div className="space-y-3">
              <div className="text-sm text-gray-600">推荐标签:</div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_TRAITS.map((trait) => (
                  <button
                    key={trait}
                    type="button"
                    onClick={() => addTrait(trait)}
                    disabled={traits.length >= 3 || traits.includes(trait)}
                    className={`px-3 py-1 rounded-full text-sm border transition-all ${
                      traits.includes(trait)
                        ? "bg-orange-100 border-orange-300 text-orange-600 cursor-not-allowed"
                        : traits.length >= 3
                          ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white border-gray-200 text-gray-600 hover:border-orange-300 hover:bg-orange-50"
                    }`}
                  >
                    {trait}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Trait Input */}
            {traits.length < 3 && (
              <div className="flex gap-2">
                <Input
                  value={customTrait}
                  onChange={(e) => setCustomTrait(e.target.value)}
                  placeholder="或者输入自定义标签..."
                  className="flex-1 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomTrait())}
                />
                <Button
                  type="button"
                  onClick={addCustomTrait}
                  disabled={!customTrait.trim()}
                  variant="outline"
                  className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full h-12 text-base bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-medium rounded-xl shadow-lg disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                正在生成你的中文名...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                生成我的中文名
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
