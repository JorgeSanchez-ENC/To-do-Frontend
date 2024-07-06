import { createContext, useEffect, useState } from "react";
import { getTodos, createTodo,updateTodo, deleteTodo, markTodoAsDone, markTodoAsUndone, getMetrics} from "../services/TodosService";
import { message } from "antd";


const TodosContext = createContext();

export const TodosContextProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [reload,setReload] = useState(true);
  const [currentTodo,setCurrentTodo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage,setTotalPage] = useState(1);
  const [filters,setFilters] = useState({
    text: null,
    priority:null,
    state:null
  });
  const [metrics,setMetrics] = useState({
    ALL:0.0,
    HIGH:0.0,
    MEDIUM:0.0,
    LOW:0.0
  })

  const fetchMetrics = () =>{
    getMetrics().then(result=>{
      setMetrics(result);
    }).catch(error =>{
      console.log(error);
  })
  }


  const fetchTodos = () => {
    getTodos(filters,currentPage).then(result=>{
        setTodoList(result.todosList);
        setCurrentPage(result.currentPage);
        setTotalPage(result.totalPages)
    }).catch(error =>{
        console.log(error);
    })
  }

  const addTodo = (todo) =>{
    createTodo(todo).then(result=>{
      console.log("Created successfuly");
      setReload(true);
    }).catch(error=>{
      console.log(error);
    })
  }

  const editTodo = (id, updatedTodo) =>{
    
    updateTodo(id, updatedTodo).then(result=>{
      console.log("Updated successfuly");
      setReload(true);
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
    fetchTodos(filters, currentPage);
    fetchMetrics();
    setReload(false);
  }, [reload, filters]); 

  return (
    <TodosContext.Provider value={{todoList,setTodoList,
      reload,setReload, currentTodo, setCurrentTodo, modalOpen, setModalOpen, filters, setFilters,
      addTodo,editTodo,deleteTodos,doTodo,undoTodo, currentPage, setCurrentPage, totalPage, setTotalPage, metrics
      }}>
      {children}
    </TodosContext.Provider>
  );
}

// Exportamos el context y el componente con el proveedor de información
export default TodosContext;