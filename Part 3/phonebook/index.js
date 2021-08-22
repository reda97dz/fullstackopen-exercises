const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

app.use(morgan((tokens, req, res)=>{
    return [
        tokens.method(req, res),
        tokens.url(req,res),
        tokens.status(req,res),
        tokens.res(req,res, 'content-length'), '-',
        tokens['response-time'](req,res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const currentDate = new Date()
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p> ${currentDate} </p>
        `
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.filter(person => person.id === id)

    if (person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const min = Math.ceil(5)
    const max = Math.floor(999)
    return Math.floor(Math.random() * (max - min) + min)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number || persons.some(p => p.name === body.name)){
        return response.status(400).json({ 
            error: 'content missing or person already exists' 
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }


    persons = persons.concat(person)
    response.json(person)

})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})