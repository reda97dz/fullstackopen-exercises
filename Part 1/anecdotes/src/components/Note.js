import React from 'react'

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'
  return (
    <div>
      <li className='note'>{note.content}</li>
      <button onClick={toggleImportance} >{label}</button>
    </div>
  )
}

export default Note