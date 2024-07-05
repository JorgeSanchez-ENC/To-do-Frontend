import { useState, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodosContextProvider } from './context/TodosContext'
import ToDoTable from './components/ToDoBody/ToDoTable'
import Filters from './components/Filters'
import TodosContext from './context/TodosContext'



function App() {
  const [count, setCount] = useState(0);
  
  //console.log(todoList);
  return (
    <TodosContextProvider>
          <div>
                      <Filters></Filters>
                      <ToDoTable></ToDoTable>
          </div>

    </TodosContextProvider>

  );
}

export default App
