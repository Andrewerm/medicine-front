import {HeartIcon} from "./images/HeartIcon";
import {Restangle1} from "./images/Restangle1";
import {Col, Row, Typography} from "antd";
import {Restangle2} from "./images/Restangle2";
const { Title } = Typography;

export function Welcome() {
    return (
        <>
            <Row align="stretch" gutter={[0,0]} style={{minHeight: '100vh', overflow: "hidden"}}>
                <Col offset={12} span={10}>
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
                <Col offset={8} span={12}>
                    <Restangle2/>
                </Col>

            </Row>



        </>
    )
}
