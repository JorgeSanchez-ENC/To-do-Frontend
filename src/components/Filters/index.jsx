import React from "react";
import { Form, Button, Col, Row, Input, Select } from "antd";
import { useEffect, useState, useContext } from "react";
import TodosContext from "../../context/TodosContext";

const Filters = () =>{
    const {filters, setFilters, setCurrentPage} = useContext(TodosContext);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        setCurrentPage(1);
        setFilters(values)
      };
    
    const onReset = () => {
        form.resetFields();
        setFilters(form.values);
    };

    return (
        <div>
            <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
        >
            <Row gutter={8}>
                <Col span={24}>
                    <Form.Item
                        label="Name"
                        name={"text"}
                    >

                        <Input maxLength={120}></Input>
                    </Form.Item>
                </Col>
            </Row>
            <Row align="middle">
                <Col span={12}>
                    <Form.Item
                        label="Priority"
                        name="priority"
                    >
                        <Select
                            placeholder= "High, Medium, Low"
                            options={[{ value: 'LOW', label: 'Low' }, { value: 'MEDIUM', label: 'Medium' }, { value: 'HIGH', label: 'High' }]}
                        >
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="State"
                        name="state"
                    >
                        <Select
                            placeholder= "Done, Not Done"
                            options={[{ value: 'true', label: 'Done' }, { value: 'false', label: 'Not Done' }]}
                        >
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                    >
                        <Button htmlType="submit" className="card-filter-btn">Search</Button>          
                        <Button htmlType="button" onClick={onReset} type="link">Reset</Button>
                    </Form.Item>
                </Col>
            </Row>

        </Form>
        </div>
        
    );
    
}

export default Filters;