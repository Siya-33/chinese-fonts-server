import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import childProcess from 'node:child_process'
import os from 'node:os'

const CPU_COUNT = os.cpus().length
console.log('当前cpu个数:', CPU_COUNT)

const rangesText = fs.readFileSync(path.join(process.cwd(), 'lib/unicode_ranges/Ma Shan Zheng.json'), {
  encoding: 'utf-8',
})

const ranges = JSON.parse(rangesText)
// console.log(ranges)
const pyScript = path.resolve(process.cwd(), 'scripts/prepare.py')
childProcess.execSync(`python ${pyScript}`)

const metadataText = fs.readFileSync(path.resolve(process.cwd(), 'lib/fonts/metadata.json'), {
  encoding: 'utf-8',
})
const metadata = JSON.parse(metadataText)
console.log('开始执行....')
const start = +new Date()
const tasks: { keyId: string; fontPath: string; unicodeStr: string; output: string }[] = []
for (const item of metadata) {
  const fontWeight = item.fontWeight.toLowerCase()
  const fontPath = item.fontPath
  const fontName = item.fontName
  const entries = Object.entries(ranges)
  for (let i = 0; i < entries.length; i++) {
    const key = entries[i][0]
    const unicode = entries[i][1] as string[]
    const unicodeStr = unicode.join(',')
    const keyId = /\d+/g.exec(key)![0]
    const output = path.resolve(process.cwd(), `lib/fonts_chunk/${fontName}/${fontWeight}/${keyId}.woff2`)
    tasks.push({
      keyId,
      fontPath,
      unicodeStr,
      output,
    })
  }
}

console.log(`当前任务总个数: ${tasks.length}`);
(async () => {
  function runTask(): Promise<void> {
    return new Promise((resolve) => {
      let index = 0
      let count = 0
      function run() {
        const task = tasks[index]
        index++
        execTask(task).finally(() => {
          count++
          console.log(count)
          if (index < tasks.length)
            run()
          if (count === tasks.length)
            resolve()
        })
      }
      for (let p = 0; p < Math.min(tasks.length, CPU_COUNT); p++)
        run()
    })
  }
  await runTask()
  console.log('执行完毕')
  console.log(`耗时: ${(+new Date() - start) / 1000}s`)
})()

function execTask(task: any): Promise<void> {
  return new Promise((resolve) => {
    const { fontPath, unicodeStr, output } = task
    if (fs.existsSync(output))
      return resolve()
    const cmd = `pyftsubset ${fontPath} --flavor=woff2 --unicodes=${unicodeStr} --output-file=${output}`
    childProcess.execSync(cmd)
    resolve()
  })
}
