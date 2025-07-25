const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())

app.use(morgan('tiny'))

let entries = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
  const max = 1000
  const min = 1
  const id = Math.floor((max - min) * Math.random() + min)
  return String(id)
}

app.get('/api/persons', (request, response) => {
    response.json(entries)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = entries.find(entry => entry.id === id)

    if (!person)
        return response.status(404).end()

    response.json(person)
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

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))