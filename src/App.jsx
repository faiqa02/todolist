import { useState } from 'react'
import Heading from './components/Heading';
import ToDoList from './components/ToDoList';

function App() {


  return (
    <>
     <div className=' container py-16 px-6 min-h-screen mx-auto bg-pink-200'>
      <Heading></Heading>
      <ToDoList />
     </div>
    </>
  )
}

export default App
