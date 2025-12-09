import express from 'express'
const router = express.Router()

import User from '../models/user.js'


router.get('/sign-up', (req, res) => {
    console.log(`Request: ${req.method} - ${req.originalUrl}`)
    res.json({ message: 'HIT SIGN UP ROUTE'})
})

router.get('/sign-in', (req, res) => {
    console.log(`Request: ${req.method} - ${req.originalUrl}`)
     res.json({ message: 'HIT SIGN IN ROUTE'})
})

router.get('/sign-out', (req, res) => {
    console.log(`Request: ${req.method} - ${req.originalUrl}`)
     res.json({ message: 'HIT SIGN OUT ROUTE'})
})

export { router as authRouter }