import React from "react";
import { Card, Row, Col, Statistic, Space } from "antd";
import { useContext } from "react";
import TodosContext from "../../context/TodosContext";

const MetricsCard = () =>{
    const {metrics} = useContext(TodosContext);

    return(

            <Space>
                <Row>
                    <Card>
                        <Statistic title="Average time to finish a task" value={metrics.ALL + " Minutes "}></Statistic>
                    </Card>
                    <Card>
                        <Statistic title="Average time for Low tasks" value={metrics.LOW + " Minutes "}></Statistic>
                    </Card>
                    <Card>
                        <Statistic title="Average time for Medium tasks" value={metrics.MEDIUM + " Minutes "}></Statistic>
                    </Card>
                    <Card>
                        <Statistic title="Average time for HIGH tasks" value={metrics.HIGH + " Minutes "}></Statistic>
                    </Card>
                </Row>
            </Space>

    );

}

export default MetricsCard;