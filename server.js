import express from "express"

const app = express()
const port= 3000

app.get('/', (req, res) => {
    console.log(`Request: ${req.method} - ${req.originalUrl}`)
    res.send(`<h1>Welcome to the homepage</h1>`)
})

app.listen(3000, () => console.log("Server running"))
