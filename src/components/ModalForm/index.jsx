import { Modal, Form, Input, Select, DatePicker } from 'antd';
import { useContext, useEffect, useState } from 'react'; 
import TodosContext from '../../context/TodosContext';
import dayjs from 'dayjs';

const ModalForm = () =>{
    const{ addTodo, editTodo, currentTodo, setCurrentTodo, modalOpen, setModalOpen} = useContext(TodosContext);
    const [form] = Form.useForm();
    const [editableTodo, setEditableTodo] = useState(null);

    useEffect(()=>{
        if(currentTodo){
            setEditableTodo(currentTodo);
            form.setFieldValue({
                currentTodo
            })
        }
    },[currentTodo,form], modalOpen);

    const handleOk = () =>{
        form.validateFields().then(values=>{
            if(currentTodo){
                editTodo(currentTodo.id,values);
            }else{
                addTodo({...values, done:false});
            }
            setModalOpen(false);
            setEditableTodo(null);
            setCurrentTodo(null);
        }).catch(error=>{
            console.log(error);
        })
    }

    const handleCancel=()=>{
        setModalOpen(false);
        setCurrentTodo(null);
        form.resetFields();
    }

    return (
        <Modal
            title = {currentTodo? 'Edit To do' : 'New To do'}
            open={modalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        > 
            <Form form={form} layout='vertical' initialValues={editableTodo}> 
                <Form.Item
                    name={"text"}
                    label={"To do text"}
                    rules={[{required: true, message: "Please add a to do text"}]}
                >
                    <Input></Input>
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