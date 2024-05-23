import React from 'react'
import TodoListComponent from './components/todolistcomponent/todolistcomponent'
import './App.css'

const App = () => {
  return (
    <div className="container">
      <h1>To Do List</h1>
      <TodoListComponent/>
    </div>
  )
}

export default App