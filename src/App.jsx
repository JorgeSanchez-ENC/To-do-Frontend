import { useState, useContext } from 'react'
import { Button } from 'antd'
import './App.css'
import { TodosContextProvider } from './context/TodosContext'
import ToDoTable from './components/ToDoBody/ToDoTable'
import Filters from './components/Filters'
import ModalForm from './components/ModalForm'
import TodosContext from './context/TodosContext'



function App() {

  //console.log(todoList);
  return (
    <TodosContextProvider>
      <Filters></Filters>
      
      <ToDoTable></ToDoTable>
      <ModalForm></ModalForm>

    </TodosContextProvider>

  );
}

export default App
