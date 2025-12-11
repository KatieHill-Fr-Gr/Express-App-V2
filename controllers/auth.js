import express from 'express'
const router = express.Router()

import bcrypt from 'bcrypt'
import User from '../models/user.js'
import { generateToken } from '../utils/tokens.js'
import { InvalidData } from '../utils/errorClasses.js'
import { Unauthorized } from '../utils/errorClasses.js'


router.post('/sign-up', async (req, res, next) => {

    try {
        if (req.body.password !== req.body.passwordConfirmation) {
            throw new InvalidData('Passwords do not match', 'password')
        }
        const newUser = await User.create(req.body)
        const token = generateToken(newUser)

        return res.status(201).json({ token: token})

    } catch (err) {
        next(err)
    }
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
})

router.get('/sign-out', (req, res, next) => {
    console.log(`Request: ${req.method} - ${req.originalUrl}`)
     res.json({ message: 'HIT SIGN OUT ROUTE'})
})

export { router as authRouter }