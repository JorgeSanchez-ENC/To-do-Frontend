import { createContext, useEffect, useState } from "react";
import { getTodos, createTodo,updateTodo, deleteTodo, markTodoAsDone, markTodoAsUndone} from "../services/TodosService";
import { message } from "antd";


const TodosContext = createContext();

export const TodosContextProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [reload,setReload] = useState(true);
  const [currentTodo,setCurrentTodo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filters,setFilters] = useState({
    text: null,
    priority:null,
    state:null
  });


  const fetchTodos = () => {
    getTodos(filters).then(result=>{
        setTodoList(result);
    }).catch(error =>{
        console.log(error);
    })
  }

  const addTodo = (todo) =>{
    createTodo(todo).then(result=>{
      console.log("Created successfuly");
      setReload(true);
      setModalOpen(false);
    }).catch(error=>{
      console.log(error);
    })
  }

  const editTodo = (updatedTodo) =>{
    updateTodo(updatedTodo.id, updateTodo).then(result=>{
      console.log("Updated successfuly");
      setReload(true);
      setModalOpen(false);
    }).catch(error=>{
      console.log(error);
    })
  }

  const deleteTodos = (id) =>{
    deleteTodo(id).then(result=>{
      console.log("Successfully deleted");
      setReload(true);
    }).catch(error=>{
      console.log(error);
    })
  }

  const doTodo = (id) =>{
    markTodoAsDone(id).then(result=>{
      console.log("Successfuly marked");
      setReload(true);
    }).catch(error=>{
      console.log(error);
    })
  }

  const undoTodo = (id) =>{
    markTodoAsUndone(id).then(result=>{
      console.log("Successfuly unmarked");
      setReload(true);
    }).catch(error=>{
      console.log(error);
    })
  }


  
  
  useEffect(() => {
    fetchTodos(filters);
    setReload(false);
  }, [reload, filters]); 

  const contextData = {
    
  };

  return (
    <TodosContext.Provider value={{todoList,setTodoList,
      reload,setReload, currentTodo, setCurrentTodo, modalOpen, setModalOpen, filters, setFilters,
      addTodo,editTodo,deleteTodos,doTodo,undoTodo
      }}>
      {children}
    </TodosContext.Provider>
  );
}

// Exportamos el context y el componente con el proveedor de información
export default TodosContext;