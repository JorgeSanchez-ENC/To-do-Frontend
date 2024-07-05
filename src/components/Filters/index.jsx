import { Form, Button, Col, Row, Input, Select } from "antd";
import { useEffect, useState, useContext } from "react";
import TodosContext from "../../context/TodosContext";

const Filters = () =>{
    const {filters, setFilters} = useContext(TodosContext);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        setFilters(values)
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
                        name={"name"}
                    >

                        <Input></Input>
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
                            placeholder= "All,High,Medium,Low"
                            options={[{ value: 'LOW', label: 'Low' }, { value: 'MEDIUM', label: 'Medium' }, { value: 'HIGH', label: 'High' }, { value: undefined, label: 'All' }]}
                        >
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="State"
                        name="state"
                    >
                        <Select
                            placeholder= "All, Done, Not Done"
                            options={[{ value: 'true', label: 'Done' }, { value: 'false', label: 'Not Done' }, { value: undefined, label: 'All' }]}
                        >
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                    >
                        <Button htmlType="submit" className="card-filter-btn">Search</Button>
                    </Form.Item>
                </Col>
            </Row>

        </Form>
        </div>
        
    );
    
}

export default Filters;