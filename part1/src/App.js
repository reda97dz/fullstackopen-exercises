import React from 'react'

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return (
      <h1> {props.course.name} </h1>
    )
  }

  const Part = (props) => {
    return (
      <p> {props.part.name} {props.part.exercises} </p>
    )
  }

  const Content = (props) => {
    return (
      <div>
        <Part part={props.course.parts[0]} />
        <Part part={props.course.parts[1]} />
        <Part part={props.course.parts[2]}  />
      </div>
    )
  }
  
  const Total = (props) => {
    return (
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises} </p>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} /> 
    </div>
  )
}

export default App












// ###################

// import React from 'react'

// const App = () => {
//   console.log("Hello from component")
//   return (
//     <div>
//       <p>Hello world</p>
//     </div>
//   )
// }

// const App = () => {
//   const now = new Date()
//   const a = 10
//   const b = 20

//   return (
//     <div>
//       <p>Hello world, it is {now.toString()}</p>
//       <p>
//         {a} plus {b} is {a + b}
//       </p>
//     </div>
//   )
// } 

// const Hello = () => {
//   return (
//     <div>
//       <p>Hello world</p>
//     </div>
//   )
// }

// const App = () => {
//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello />
//       <Hello />
//       <Hello />
//     </div>
//   )
// }

// const Hello = (props) => {
//   return (
//     <div>
//       <p>Hello {props.name}</p>
//     </div>
//   )
// }

// const App = () => {
//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="George" />
//       <Hello name="Daisy" />
//     </div>
//   )
// }

// const Hello = (props) => {
//   return (
//     <div>
//       <p>
//         Hello {props.name}, you are {props.age} years old
//       </p>
//     </div>
//   )
// }

// const App = () => {
//   const name = 'Peter'
//   const age = 10

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//     </div>
//   )
// }

// export default App;