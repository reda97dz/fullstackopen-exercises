import React from 'react'

const Persons = ({personsToShow, deletePerson}) => (
    <div>
      {personsToShow.map(person => <p key={person.number}>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button> </p>)}
    </div>
)

export default Persons