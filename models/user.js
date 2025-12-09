import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: 
    {
         type: String,
         required: ['Please choose a username]', true],
         unique: true,
    },
    email:
    {
        type: String,
        required: ['Please enter a valid email address', true],
        unique: true
    },
    password:
    {
        type: String,
        required: ['Please choose a password', true],
        unique: true
    },
})

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 12)
    }
    next()
})

const User = mongoose.model('User', userSchema)

export default User