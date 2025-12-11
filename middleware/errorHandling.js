
const errorHandler = (err, req, res, next) => {

    const logError = (err) => {
        console.log('--------------')
        console.log(' ERROR ')
        console.log('Name: ', err.name)
        console.log('Status: ', err.status)
        console.log('Status: ', err.message)
        console.log('--------------')
        console.log('Stack: ')
        console.log(err.stack)
        console.log('--------------')
        console.log('The above error occurred during the below request:')
    }

    if (err.status === 404 || err.name === 'NotFound') {
        return res.status(404).json({ message: err.message })
    }

    if (err.name === 'InvalidData') {
        return res.status(err.status).json({ [err.field]: err.message })
    }

    if (err.name === 'ValidationError') {
        const fields = {}

        Object.keys(err.errors).forEach(keyName => {
            fields[keyName] = err.errors[keyName].properties.message
        })

        return res.status(400).json(fields)
    }

    if (err.name === 'MongoServerError' && err.code === 11000) {
        console.log(Object.entries(err.keyValue)[0])
        const [keyName, keyValue] = Object.keys(err.keyValue)[0]
        return res.status(400).json({
            [keyName]: `${keyName}[0].toUpperCase() + keyName.slice?(1)} "${keyValue}" This email is already taken`
        })
    }

    if (err.name === 'Unauthorized') {
        return res.status(401).json({ message: err.message })
    }

    if (err.name === 'CastError'&& err.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Not a valid ObjectId. Please try again.' })
    }

    return res.status(500).json({ message: 'Internal Server Error' })

}

export default errorHandler