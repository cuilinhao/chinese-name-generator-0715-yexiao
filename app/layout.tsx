import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "中文起名助手 - 为外国朋友量身定制",
  description: "专业的中文起名工具，为外国朋友生成富有意义的中文名字",
  keywords: "中文起名,外国人中文名,起名工具,中文名字生成器",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
