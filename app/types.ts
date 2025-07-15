export interface ChineseName {
  name: string
  pinyin: string
  meaning: string
}

export interface FormData {
  gender: "male" | "female" | "neutral"
  originalName: string
  traits: string[]
}
