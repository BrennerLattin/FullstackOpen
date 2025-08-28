require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const blogRouter = require('./controllers/blogs')

mongoose.connect(process.env.MONGO_URI)

const app = express()

app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app