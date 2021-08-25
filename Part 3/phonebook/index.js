const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if(error.name==='CastError'){
        return response.status(400).send({error:'malformatted id' })
    }else if (error.name === 'ValidationError'){
        return response.status(400).json({error:error.message})
    }
    next(error)
}

app.use(cors())

app.use(express.json())
app.use(express.static('build'))

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

app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const currentDate = new Date()
    Person.find({}).then(persons => {
        response.send(
            `<p>Phonebook has info for ${persons.length} people</p>
            <p> ${currentDate} </p>
            `
        )
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person =>{
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, {new : true})
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.FindByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if(!body.name || !body.number){
        return response.status(400).json({ 
            error: 'content missing or person already exists' 
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson =>  {
        response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})