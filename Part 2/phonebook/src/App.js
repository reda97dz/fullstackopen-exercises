import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [newFilter, setFilter] = useState('')
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

    persons.forEach(function (item) {
      if (nameObject.number === item.number ){
        found = true
      }
    })

    if (found) {
      window.alert(`A person with the number ${nameObject.number} already exists`)
    }else{
      setPersons(persons.concat(nameObject))
      setPersonsToShow(persons)
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
      <div>
          filter shown with <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <h2>Add New</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number <input value={newNumber} onChange={handleNumberChange} />
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => 
        <p key={person.number}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App