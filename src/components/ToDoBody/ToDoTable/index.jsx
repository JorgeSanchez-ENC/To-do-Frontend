import { Table, Button, Popconfirm } from "antd";
import { getTodos } from "../../../services/TodosService";
import { useContext, useEffect, useState } from 'react'; 
import TodosContext from '../../../context/TodosContext';
import { render } from "react-dom";

const ToDoTable = () =>{
    const {todoList, setCurrentTodo, setModalOpen, deleteTodos, doTodo} = useContext(TodosContext);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'text',
        },
        {
            title:'Priority',
            dataIndex: 'priority',
            sorter: true,
        },
        {
            title:'Due date',
            dataIndex: 'dueDate',
            sorter: true
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, todo) =>(
                <>
                    <Button
                    onClick={()=>{
                        setCurrentTodo(todo);
                        setModalOpen(true);
                    }}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                            title="Delete"
                            description="Are you sure to delete this to do?"
                            onConfirm={()=>{
                                deleteTodos(todo.id);
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="danger">Delete</Button>
                    </Popconfirm>
                </>
            ),
        }
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    }

    return(
        <Table 
        columns={columns}
        rowKey={"id"}
        rowSelection={
            rowSelection
        }   
        dataSource={todoList} 
        ></Table>
    );
}

export default ToDoTable;