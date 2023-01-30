import {HeartIcon} from "./images/HeartIcon";
import {Restangle1} from "./images/Restangle1";
import {Col, Row, Typography} from "antd";
import {Restangle2} from "./images/Restangle2";
import React from "react";
const { Title } = Typography;

export const Welcome:React.FC=()=>{
    return (
        <>
            <Row justify="space-between" align="stretch" gutter={[0,0]} style={{minHeight: '100vh', overflow: "hidden"}}>
                <Col push={4} span={24}>
                    <Restangle1/>
                </Col>
                <Col span={8}>
                    <HeartIcon/>
                </Col>
                <Col span={24}>
                    <Title level={3} style={{color: 'white'}}>
                        Добро пожаловать в медкабинет!
                    </Title>
                </Col>
                <Col push={8} span={24}>
                    <Restangle2/>
                </Col>
            </Row>
        </>
    )
}
