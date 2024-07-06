import axios from "axios";

const API_URL = 'http://localhost:9090/todos';


const getTodos = async (params, page) =>{
    const data = {...params, page}
    try{
        const response = await axios.get(API_URL,{params:data});
        return response.data;
    }catch(error){
        console.error(error);
    }
}

const createTodo = async (todo) =>{
    try {
        const response = await axios.post(API_URL,todo);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const updateTodo = async (id,todo) =>{
    try {
        const response = await axios.put(`${API_URL}/${id}`,todo);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteTodo = async (id) =>{
    try {
        const response = await axios.post(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}



const markTodoAsDone = async (id) =>{
    try {
        const response = await axios.post(`${API_URL}/${id}/done`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const markTodoAsUndone = async (id) =>{
    try {
        const response = await axios.put(`${API_URL}/${id}/undone`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export{
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    markTodoAsDone,
    markTodoAsUndone
}