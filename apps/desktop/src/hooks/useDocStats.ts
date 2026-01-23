import { useEffect, useState, useMemo } from 'react'
import { getStore, onStoreCreated } from '../stores/editor'
import type { BlockModel } from '@ink/stone-store'

export interface DocStats {
  wordCount: number // 字数（中文字符+英文单词）
  lineCount: number // 行数
  charCount: number // 字符数（不含空格）
}

/**
 * 从文本对象中提取纯文本
 */
function extractText(textObj: any): string {
  if (!textObj) return ''

  if (typeof textObj === 'string') return textObj

  // 如果是 Text 对象，提取 delta
  if (typeof textObj.toDelta === 'function') {
    const deltas = textObj.toDelta()
    return deltas.map((d: any) => d.insert || '').join('')
  }

  return textObj.toString?.() || ''
}

/**
 * 统计文本的字数、字符数
 * 字数规则：
 * - 中文/日文/韩文：每个字符计为 1 字
 * - 英文/数字：按空格分隔的单词计数
 */
function countText(text: string): { words: number; chars: number } {
  // 字符数：移除所有空白字符后的长度
  const chars = text.replace(/\s/g, '').length

  let words = 0

  // 1. 统计 CJK（中日韩）字符数
  // 包括：中文汉字、日文假名、韩文等
  const cjkPattern = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/gu
  const cjkChars = text.match(cjkPattern)
  if (cjkChars) {
    words += cjkChars.length
  }

  // 2. 统计非 CJK 部分的单词数（英文、数字等）
  // 移除 CJK 字符，然后按空白符分割统计单词
  const nonCJKText = text.replace(cjkPattern, ' ')
  const nonCJKWords = nonCJKText
    .split(/\s+/)
    .filter((word) => {
      // 过滤掉空字符串和纯标点符号
      const trimmed = word.trim()
      return trimmed.length > 0 && /[a-zA-Z0-9]/.test(trimmed)
    })

  words += nonCJKWords.length

  return { words, chars }
}

/**
 * 统计单个块的内容
 */
function countBlock(block: BlockModel): { words: number; chars: number; lines: number } {
  let words = 0
  let chars = 0
  let lines = 0

  // 可统计的块类型
  const countableBlocks = [
    'ink:paragraph',
    'ink:list',
    'ink:code',
  ]

  if (countableBlocks.includes(block.flavour)) {
    const text = extractText((block as any).text)

    // 统计行数：统计内部的换行符数量
    if (text.length > 0) {
      // 换行符数量 + 1 = 实际行数
      const newlineCount = (text.match(/\n/g) || []).length
      lines += newlineCount + 1
    } else {
      // 空内容也算 1 行
      lines++
    }

    const counts = countText(text)
    words += counts.words
    chars += counts.chars
  }

  // 递归统计子块
  for (const child of block.children) {
    const childCounts = countBlock(child)
    words += childCounts.words
    chars += childCounts.chars
    lines += childCounts.lines
  }

  return { words, chars, lines }
}

/**
 * Hook：统计文档的字数、行数、字符数
 */
export function useDocStats(docId: string | null): DocStats {
  const [stats, setStats] = useState<DocStats>({
    wordCount: 0,
    lineCount: 0,
    charCount: 0,
  })
  const [updateTrigger, setUpdateTrigger] = useState(0)

  useEffect(() => {
    if (!docId) {
      setStats({ wordCount: 0, lineCount: 0, charCount: 0 })
      return
    }

    const store = getStore(docId)
    if (!store) {
      setStats({ wordCount: 0, lineCount: 0, charCount: 0 })
      
      // Listen for store creation if it doesn't exist yet
      const dispose = onStoreCreated((createdDocId) => {
        if (createdDocId === docId) {
          setUpdateTrigger((prev) => prev + 1)
        }
      })
      return dispose
    }

    // 计算统计数据
    const calculateStats = () => {
      const root = store.root
      if (!root) {
        return { wordCount: 0, lineCount: 0, charCount: 0 }
      }

      let totalWords = 0
      let totalChars = 0
      let totalLines = 0

      // 遍历所有顶层块（通常是 ink:note）
      for (const child of root.children) {
        if (child.flavour === 'ink:note') {
          // 统计 note 下的所有内容块
          for (const noteChild of child.children) {
            const counts = countBlock(noteChild)
            totalWords += counts.words
            totalChars += counts.chars
            totalLines += counts.lines
          }
        }
      }

      return {
        wordCount: totalWords,
        lineCount: totalLines,
        charCount: totalChars,
      }
    }

    // 初始计算
    const initialStats = calculateStats()
    setStats(initialStats)

    // 订阅文档变化
    let debounceTimer: NodeJS.Timeout | null = null
    const subscription = store.slots.blockUpdated.subscribe(() => {
      // 使用防抖避免频繁计算
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
      debounceTimer = setTimeout(() => {
        const newStats = calculateStats()
        setStats(newStats)
      }, 300) // 300ms 防抖
    })

    return () => {
      if (subscription?.unsubscribe) {
        subscription.unsubscribe()
      }
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
    }
  }, [docId, updateTrigger])

  return stats
}
