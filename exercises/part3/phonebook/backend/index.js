require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(express.static('dist'))

morgan.token(
  'body', 
  (request, response) => request.method === 'POST' ? JSON.stringify(request.body) : ''
)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
    Person.find({})
      .then(people => response.json(people))
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
      .then(person => response.json(person))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number)
    return response.status(400).json({
      error: 'Body must include name and number'
    })

  if (entries.some(entry => entry.name === body.name)) // case sensitive
    return response.status(400).json({
      error: 'Entry with name already exists'
    })

  const entry = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  entries = entries.concat(entry)
  
  response.json(entry)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  entries = entries.filter(entry => entry.id !== id)

  response.status(204).end()
})

app.get('/info', (request, response) => {
    response.send(`
        <div>Phonebook has info for ${entries.length} people</div>
        <br>
        <div>${new Date()}</div>
    `)
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))