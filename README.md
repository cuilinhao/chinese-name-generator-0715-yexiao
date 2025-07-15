# 中文起名助手 / Chinese Name Generator

> 为外国朋友量身定制的智能中文起名工具

一个现代化的 Web 应用，帮助外国朋友根据他们的个人信息生成富有意义的中文名字。每个生成的名字都包含拼音标注和详细的寓意解释。

## ✨ 核心功能

- **🎯 个性化生成**：根据性别、原名和个人特点智能生成
- **🎨 精美界面**：现代化设计，响应式布局，支持移动端
- **📝 详细解释**：每个名字都包含拼音和寓意说明
- **📋 便捷操作**：一键复制名字信息到剪贴板
- **💾 名片下载**：生成精美的中文名字名片（开发中）
- **🔄 重新生成**：不满意？一键重新生成更多选择

## 🛠️ 技术栈

### 前端
- **框架**：Next.js 15.2.4 (App Router)
- **UI库**：React 19
- **类型安全**：TypeScript 5
- **样式**：Tailwind CSS 3.4
- **组件库**：Shadcn UI + Radix UI
- **表单**：React Hook Form + Zod 验证
- **图标**：Lucide React

### 后端
- **API**：Next.js API Routes
- **AI集成**：OpenAI API（规划中）

## 📦 快速开始

### 环境要求

- Node.js 18+ 
- pnpm（推荐）/ npm / yarn

### 安装依赖

```bash
# 克隆项目
git clone <repository-url>
cd chinese-name-generator

# 安装依赖
pnpm install
```

### 开发模式

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建部署

```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

## 🎯 使用方法

1. **选择性别**：男性、女性或中性
2. **输入原名**：你的英文名或昵称
3. **描述特点**：从推荐标签中选择或自定义（最多3个）
4. **生成名字**：点击生成按钮获取专属中文名
5. **选择喜欢的**：复制或下载你喜欢的名字

## 📁 项目结构

```
chinese-name-generator/
├── app/
│   ├── api/generate/          # API 路由
│   ├── components/            # 页面组件
│   │   ├── NameForm.tsx      # 名字生成表单
│   │   └── ResultsSection.tsx # 结果展示区域
│   ├── globals.css           # 全局样式
│   ├── layout.tsx            # 根布局
│   ├── page.tsx              # 首页
│   └── types.ts              # 类型定义
├── components/               # 共享组件
│   ├── ui/                   # Shadcn UI 组件
│   └── theme-provider.tsx    # 主题提供者
├── lib/
│   └── utils.ts              # 工具函数
└── public/                   # 静态资源
```

## 🔧 开发指南

### 添加新的特点标签

在 `app/components/NameForm.tsx` 中修改 `SUGGESTED_TRAITS` 数组：

```typescript
const SUGGESTED_TRAITS = [
  "友善", "聪明", "创意", // 个性特点
  "工程师", "艺术家",    // 职业
  "音乐", "运动",       // 爱好
  // 添加你的标签...
]
```

### 集成 AI 服务

目前使用模拟数据，要集成真实 AI 服务，修改 `app/api/generate/route.ts`：

```typescript
// 替换模拟数据为真实 API 调用
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    {
      role: "system",
      content: "你是一个专业的中文起名师..."
    },
    {
      role: "user", 
      content: `为${gender}性，原名${originalName}，特点是${traits.join(', ')}的人起几个中文名字`
    }
  ]
})
```

### 自定义样式

项目使用 Tailwind CSS，主要色彩主题：
- 主色：橙色 (`orange-500`) 到粉色 (`pink-500`) 渐变
- 背景：暖色调渐变 (`from-orange-50 via-pink-50 to-red-50`)

## 🚀 部署

### Vercel（推荐）

1. 推送代码到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动部署完成

### 其他平台

```bash
# 构建静态文件
pnpm build

# 上传 .next 文件夹到你的服务器
```

## 🔮 待实现功能

- [ ] 集成 OpenAI API 进行智能起名
- [ ] 名字收藏功能
- [ ] 名片生成和下载
- [ ] 名字历史记录
- [ ] 社交分享功能
- [ ] 多语言支持
- [ ] 用户账户系统

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 发起 Pull Request

## 📄 开源协议

本项目采用 MIT 协议 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Shadcn UI](https://ui.shadcn.com/) - 优秀的组件库
- [Lucide](https://lucide.dev/) - 精美的图标集
- [Tailwind CSS](https://tailwindcss.com/) - 实用的样式框架

---

**让每个名字都有故事 🌟** 