import express from 'express'
import 'dotenv/config'

import verifyToken from './middleware/verifyToken.js'

import { defaultRouter } from './controllers/default.js'
import { authRouter } from './controllers/auth.js'
import { projectsRouter } from './controllers/projects.js'
import mongoose from 'mongoose'


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/', defaultRouter)
app.use('/auth', authRouter)
app.use('/projects', projectsRouter)

app.get('/protected-route', verifyToken, (req, res, next) => {
    console.log(req.user)
    return res.json({ message: "Protected route working"})
})

app.listen(3000, () => console.log('Server running'))

const startServers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        app.listen(port, () => console.log('Database connected'))
    } catch (err) {
        console.log(err)
    }
}

startServers()