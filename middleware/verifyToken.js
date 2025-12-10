import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const verifyToken = async (req, res, next) => {
    console.log('Check to verify user authentication')

    try {
        const authHeader = req.headers.authorization 

        if (!authHeader) throw new Unauthorized('No authorization header provided')

        const token = authHeader.split(' ')[1]
        const payload = jwt.verify(token, process.env.TOKEN_SECRET)
        const foundUser = await User.findById(payload.user._id)
        console.log(payload.user._id)

        if (!foundUser) throw new Unauthorized('User does not exist')
        
        req.user = foundUser
        next()

    } catch (err) {
        console.error("Auth Error", err)
        next(err)
    }


}

export default verifyToken