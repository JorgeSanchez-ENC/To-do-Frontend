import React from "react";
import { Table, Button, Popconfirm } from "antd";
import { useContext, useEffect, useState } from 'react'; 
import TodosContext from '../../../context/TodosContext';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const ToDoTable = () =>{
    const {todoList, setReload, setCurrentTodo, setModalOpen, deleteTodos, doTodo, undoTodo, currentPage, totalPage, setCurrentPage} = useContext(TodosContext);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(()=>{
        const selected = todoList.map(todo=>{
            return todo.done? todo.id : null;
        });
        setSelectedRowKeys(selected);
    },[todoList]);

    const priorityHelper = (priority) =>{
        switch(priority){
            case "LOW" :
                return 1;
            case "MEDIUM" :
                return 2;
            case "HIGH" :
                return 3;
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'text',
        },
        {
            title:'Priority',
            dataIndex: 'priority',
            sorter: {
                compare: (a,b)=>priorityHelper(a.priority) - priorityHelper(b.priority),
                multiple: 2
            },
        },
        {
            title:'Due date',
            dataIndex: 'dueDate',
            sorter:{
                compare:(a,b)=> dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix(), 
                multiple: 1
            } ,
            render:(element,todo) =>(
                <>
                    {
                        element === null?
                        '/':
                        dayjs(element).format('YYYY-MM-DD')
                    }
                </>
            )
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
                        <EditOutlined />
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
                            <Button danger><DeleteOutlined /></Button>
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
        onSelect: (record, selected, selectedRows, nativeEvent)=>{
            console.log(record.id);
            if(selected){
                doTodo(record.id);
            }else{
                undoTodo(record.id)
            }
        },
        onSelectAll: (selected, selectedRows, changeRows) =>{
            if(selected){
                changeRows.forEach(todo=>{
                    doTodo(todo.id);
                })
            }else{
                changeRows.forEach(todo=>{
                    undoTodo(todo.id);
                })
            }
        }
    }

    return(
        <>
        <Button onClick={()=>setModalOpen(true)} type="primary">New To do</Button>
        <Table 
        columns={columns}
        rowKey={"id"}
        rowSelection={
            rowSelection
        } 
        pagination={{
            defaultPageSize : 10,
            total: totalPage*10,
            current: currentPage,
            onChange: (page,pageSize) =>{
                setReload(true);
                setCurrentPage(page);
            }

        }}
        dataSource={todoList} 
        ></Table>
        
        </>

    );
}

export default ToDoTable;