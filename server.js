import express from 'express'
import { defaultRouter } from './controllers/default.js'
import { authRouter } from './controllers/auth.js'
import { projectsRouter } from './controllers/projects.js'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3000

app.use('/', defaultRouter)
app.use('/auth', authRouter)
app.use('/projects', projectsRouter)

app.listen(3000, () => console.log('Server running'))
