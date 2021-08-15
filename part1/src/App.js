import React from 'react'

const App = () => {

  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const Header = (props) => {
    return (
      <h1> {props.course} </h1>
    )
  }

  const Part = (props) => {
    return (
      <p> {props.part} {props.exercises} </p>
    )
  }

  const Content = (props) => {
    return (
      <div>
        <Part part={props.p1} exercises={props.e1} />
        <Part part={props.p2} exercises={props.e2} />
        <Part part={props.p3} exercises={props.e3} />
      </div>
    )
  }

  const Total = () => {
    return (
      <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises} </p>
    )
  }

  return (
    <div>
      <Header course={course} />

      <Content p1={part1.name} e1={part1.exercises} p2={part2.name} e2={part2.exercises} p3={part3.name} e3={part3.exercises}  />

      <Total />
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