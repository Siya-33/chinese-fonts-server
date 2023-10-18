import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import axios from 'axios'

async function getUnicodeRange(fontName = 'Ma Shan Zheng') {
  // fetch google font unicode ranges rules
  const url = `https://fonts.googleapis.com/css2?family=${fontName.trim().replaceAll(/\s/g, '+')}`
  const data = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
    },
  })

  const css = data.data.replace('\n', '')

  const execKey = /\[\d+\]/gi
  const execUnicode = /unicode-range: (.*?);/gi

  const res: { [key: string]: string[] } = {}
  const res2: { [key: string]: string[] } = {}
  while (true) {
    const key = execKey.exec(css)
    const unicodeRange = execUnicode.exec(css)
    if (!key || !unicodeRange || !key[0] || !unicodeRange[1])
      break
    let unicode: string[] = []
    const unicode2: string[] = []
    for (const item of unicodeRange[1].replaceAll(/\s/g, '').split(',')) {
      if (item.includes('-'))
        unicode = [...unicode, ...unicodeRangeToUnicode(item)]

      else
        unicode.push(item)
      unicode2.push(item)
    }
    res[key[0]] = unicode
    res2[key[0]] = unicode2
  }
  const root = path.resolve(process.cwd(), 'lib/unicode_ranges')
  fs.writeFileSync(`${root}/${fontName}.css`, data.data, 'utf-8')
  fs.writeFileSync(`${root}/${fontName}.json`, JSON.stringify(res), 'utf-8')
  fs.writeFileSync(`${root}/${fontName}-2.json`, JSON.stringify(res2), 'utf-8')
}

// U+ff17-ff19 --> U+ff17, U+ff18, U+ff19
function unicodeRangeToUnicode(range: string): string[] {
  const tempArr = /U\+([0-9A-F]+)-([0-9A-F]+)/i.exec(range)!
  const res = []
  const start = Number.parseInt(tempArr[1], 16)
  const end = Number.parseInt(tempArr[2], 16)
  for (let i = start; i <= end; i++)
    res.push(`U+${i.toString(16)}`)

  return res
}

getUnicodeRange()
