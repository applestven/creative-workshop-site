// pages/api/get-update-url.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import yaml from 'js-yaml'

interface FileEntry {
  url?: string
  size?: number
  sha512?: string
}

interface UpdateYAML {
  version?: string
  files?: FileEntry[]
  path?: string
  releaseDate?: string
  sha512?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [winRes, macRes] = await Promise.all([
      axios.get('https://update.itclass.top/update/windows/latest.yml', { responseType: 'text' }),
      axios.get('https://update.itclass.top/update/macos/latest-mac.yml', { responseType: 'text' }),
    ])

    const winData = yaml.load(winRes.data) as UpdateYAML
    const macData = yaml.load(macRes.data) as UpdateYAML

    // Windows 兼容处理
    const getWinFile = (data: UpdateYAML): FileEntry | null => {
      // 先找 .exe 文件（示例 Windows 是 exe）
      const exeFile = data.files?.find(f => f.url?.endsWith('.exe'))
      if (exeFile) return exeFile
      // 没有 .exe，尝试用 path 字段作为文件
      if (data.path) {
        return {
          url: data.path,
          size: data.files?.find(f => f.url === data.path)?.size || undefined,
          sha512: data.sha512 || '',
        }
      }
      return null
    }

    // macOS 兼容处理，找 .dmg 文件
    const getMacFile = (data: UpdateYAML): FileEntry | null => {
      return data.files?.find(f => f.url?.endsWith('.dmg')) || null
    }

    const winFile = getWinFile(winData)
    const macFile = getMacFile(macData)

    res.status(200).json({
      windows: {
        version: winData.version || '',
        url: winFile?.url || '',
        size: winFile?.size || null,
        sha512: winFile?.sha512 || '',
        releaseDate: winData.releaseDate || '',
      },
      macos: {
        version: macData.version || '',
        url: macFile?.url || '',
        size: macFile?.size || null,
        sha512: macFile?.sha512 || '',
        releaseDate: macData.releaseDate || '',
      }
    })
  } catch (error) {
    console.error('Failed to fetch or parse YAML:', error)
    res.status(500).json({ error: 'Failed to fetch or parse YAML' })
  }
}
