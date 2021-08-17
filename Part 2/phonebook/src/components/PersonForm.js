import React from 'react'

const PersonForm = ({onSubmit, name, number, handleNameChange, handleNumberChange}) => (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        number <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
)

export default PersonForm