/* eslint-disable no-console */
import process from 'node:process'
import path from 'node:path'
import express from 'express'
import { generateFontCss } from './generateCss'

const app = express()
const port = 4000

app.get('/', async (req, res) => {
  console.log(req.query)
  if (!req.query.family)
    return res.status(404).send('Sorry can\'t find that!')
  try {
    const [family, weight] = (req.query.family as string).split(':wght@')
    const realFamily = family.trim().replace(/\+/g, ' ')
    const realWeight = weight.split('|').map(item => Number(item))
    const url = await generateFontCss(realFamily, realWeight)
    const fontPath = path.join(process.cwd(), 'lib', url)
    res.set({
      'content-type': 'text/css;charset=UTF-8',
      'etag': false,
      'last-modified': false,
      'Cache-Control': `max-age=${60 * 60 * 1000}`,
    })

    res.sendFile(fontPath)
  }
  catch (err) {
    res.status(500).send(err)
  }
})

app.listen(port, () => {
  console.log(`your server listening on ${port}`)
})
