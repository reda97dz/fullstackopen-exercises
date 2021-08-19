import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])
  const [newFilter, setFilter] = useState('')
  const [newMessage, setNewMessage] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log(initialPersons)
        setPersons(initialPersons)
        setPersonsToShow(initialPersons)
      })
  }

  useEffect(hook, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    const person = persons.filter((person) =>
        person.name === newName
    )

    const personToAdd = person[0]
    const updatedPerson = { ...personToAdd, number: newNumber }
    
    var found = false

    if (person.length !== 0) {
      found = true
    }

    if (found) {
      if (window.confirm(`A person with the number ${person.number} already exists, replace this number with new one?`)){
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personToAdd ? person : returnedPerson))
          setNewMessage(`Person ${updatedPerson.name} has been updated`)
          })
          .catch((error) => {
            console.log(error)
            setNewMessage(`Person ${updatedPerson.name} has been already been deleted from the server`)
          })
          setTimeout(() => {
            setNewMessage(null)
          },5000)
      }

    }else{
      const nameObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setPersonsToShow(persons)
          setNewMessage(`Person ${returnedPerson.name} has been added`)
          setTimeout(()=>{
            setNewMessage(null)
          }, 5000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    const regex = new RegExp(newFilter, 'i')
    const filteredPersons = () => persons.filter(person => person.name.match(regex))
    setPersonsToShow(filteredPersons)
}

const deletePerson = (id) => {
  const person = persons.filter(p => p.id === id)
  console.log(person)
  const personId = person[0].id
  if (window.confirm(`Are you sure you want to delete ${person[0].name}?`)) {
    personService.deletePerson(personId)
    setPersons(persons.filter(person => person.id !== personId))
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>Add New</h3>
      <PersonForm onSubmit={addName} name={newName} handleNameChange={handleNameChange} number={newNumber} handleNumberChange={handleNumberChange}  />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App