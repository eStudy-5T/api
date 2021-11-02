import 'dotenv/config'
import cors from 'cors'
import express from 'express'

const app = express()

const x = {
  a: 1
}

app.use(cors())

app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.send('Hello World!', x)
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port: ${process.env.PORT}`)
})
