import React from "react";
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import { useContext, useEffect, useState } from 'react'; 
import TodosContext from '../../context/TodosContext';
import dayjs from 'dayjs';

const ModalForm = () =>{
    const{ addTodo, editTodo, currentTodo, setCurrentTodo, modalOpen, setModalOpen} = useContext(TodosContext);
    const [form] = Form.useForm();

    useEffect(()=>{
        if(currentTodo){
            form.setFieldsValue(
                currentTodo
            )
        }else{
            form.resetFields();
        }
    },[currentTodo, modalOpen]);

    const handleOk = () =>{
        form.validateFields().then(values=>{
            if(currentTodo){
                editTodo(currentTodo.id,values);
            }else{
                addTodo({...values, done:false});
            }
            setCurrentTodo(null);
            setModalOpen(false);

            form.resetFields();
        }).catch(error=>{
            console.log(error);
        })
    }

    const handleCancel=()=>{
        setCurrentTodo(null);
        setModalOpen(false);
 
        form.resetFields();
    }

    return (
        <Modal
            title = {currentTodo? 'Edit To do' : 'New To do'}
            open={modalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        > 
            <Form form={form} layout='vertical'> 
                <Form.Item
                    name={"text"}
                    label={"To do text"}
                    rules={[{required: true, message: "Please add a to do text"}]}
                >
                    <Input maxLength={120}></Input>
                </Form.Item>
                <Form.Item
                    name={"priority"}
                    label={"Priority"}
                    rules={[{required: true, message: "Please select a priority"}]}
                >
                    <Select
                        placeholder= "High, Medium, Low"
                        options={[{ value: 'LOW', label: 'Low' }, { value: 'MEDIUM', label: 'Medium' }, { value: 'HIGH', label: 'High' }]}
                    >
                    </Select>
                </Form.Item>
                <Form.Item
                    name={"dueDate"}
                    label="Due date"
                    getValueProps={(i) => ({value: i? dayjs(i) : null})}
                >
                    <DatePicker></DatePicker>
                </Form.Item>
                
            </Form>
        </Modal>
    );
};

export default ModalForm;