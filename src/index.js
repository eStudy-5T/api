import 'dotenv/config'
import '../src/utils/authentication/passportLocal'
import cors from 'cors'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import session from 'express-session'

// Database configuration
import dbPostgres from '../src/utils/database/config'

// APIs
import authenticationAPIs from '../src/routes/auth.routes'

// eslint-disable-next-line object-curly-spacing
import { SESSION_CONFIG } from '../src/utils/constants/appConfig'

// Test middleware
// eslint-disable-next-line object-curly-spacing
import { authVerifyToken } from './middlewares/auth.middleware'
// eslint-disable-next-line object-curly-spacing
import { configHeader } from './middlewares/res.middleware'

const app = express()

app.use(cors())
app.use(bodyParser.json())
// eslint-disable-next-line object-curly-spacing
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session(SESSION_CONFIG))
app.use(passport.initialize())
app.use(passport.session())
app.disable('x-powered-by')
app.use(configHeader)

app.use('/auth', authenticationAPIs)

app.get('/', authVerifyToken, (req, res) => {
  res.status(200).send('Hello World!')
})

dbPostgres.authenticate().then(() => {
  console.log('Connected to db')
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port: ${process.env.PORT}`)
  })
})
