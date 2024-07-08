import React from "react";
import { Card, Row, Col, Statistic, Space } from "antd";
import { useContext } from "react";
import TodosContext from "../../context/TodosContext";

const MetricsCard = () =>{
    const {metrics} = useContext(TodosContext);

    return(
            <Row>
            <Card>
                <Statistic title="Average time to finish a task" value={metrics.ALL}></Statistic>
            </Card>
            <Space></Space>
            <Card>
                <Statistic title="Average time for Low tasks" value={metrics.LOW}></Statistic>
            </Card>
            <Space></Space>
            <Card>
                <Statistic title="Average time for Medium tasks" value={metrics.MEDIUM}></Statistic>
            </Card>
            <Space></Space>
            <Card>
                <Statistic title="Average time for HIGH tasks" value={metrics.HIGH}></Statistic>
            </Card>
            </Row>
    );

}

export default MetricsCard;