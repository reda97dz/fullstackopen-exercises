import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [newFilter, setFilter] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log(initialPersons)
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

    const nameObject = {
      name: newName,
      number: newNumber
    }

    var found = false

    if (persons.some(person => person.name === newName)) {
      found = true
    }

    if (found) {
      window.alert(`A person with the number ${nameObject.number} already exists`)
    }else{
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setPersonsToShow(persons)
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>Add New</h3>
      <PersonForm onSubmit={addName} name={newName} handleNameChange={handleNameChange} number={newNumber} handleNumberChange={handleNumberChange}  />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App