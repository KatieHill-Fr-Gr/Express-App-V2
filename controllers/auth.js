import express from 'express'
const router = express.Router()

import bcrypt from 'bcrypt'
import User from '../models/user.js'
import { generateToken } from '../utils/tokens.js'


router.post('/sign-up', (req, res, next) => {
    console.log(`Request: ${req.method} - ${req.originalUrl}`)
    res.json({ message: 'HIT SIGN UP ROUTE'})
})

router.post('/sign-in', async (req, res, next) => {
    console.log(`Request: ${req.method} - ${req.originalUrl}`)

    const { identifier, password} = req.body

    try {
        const foundUser = await User.findOne({
            $or: [
                { username: identifier },
                { email: identifier }
            ]
        })

        console.log(foundUser)

        if (!foundUser) throw new Unauthorized('User does not exist')
        if (!bcrypt.compareSync(password, foundUser.password)) throw new Unauthorized('Password not recognised')

        const token = generateToken(foundUser)    
        return res.status(201).json({ token: token})

    } catch (err) {
        console.log(err)
        next(err)
    }


     res.json({ message: 'HIT SIGN IN ROUTE'})
})

router.get('/sign-out', (req, res, next) => {
    console.log(`Request: ${req.method} - ${req.originalUrl}`)
     res.json({ message: 'HIT SIGN OUT ROUTE'})
})

export { router as authRouter }