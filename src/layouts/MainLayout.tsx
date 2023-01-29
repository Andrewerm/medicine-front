import {Outlet} from "react-router-dom";
import {Footer as MyFooter} from "../components/Footer";
import {Col, Layout, Row, Typography, Divider} from 'antd';
import {HeartInHand} from "../components/images/HeartInHand";
import {TopPanel} from "../components/TopPanel";


const {Title} = Typography
const {Header, Footer, Content} = Layout;


export function MainLayout() {
    const headerStyle: React.CSSProperties = {
        // textAlign: 'center',
        color: '#1048CE',
        height: "unset",
        paddingInline: 50,
        // lineHeight: '64px',
        backgroundColor: 'white',
        padding: '10px'
    };
    const contentStyle : React.CSSProperties = {
        backgroundColor: '#F6FAFF',
        // height: '100%',
        padding: '20px',
    }
    return (
        <>
            <Header style={headerStyle}>
                <Row gutter={10}>
                    <Col>
                        <HeartInHand/>
                    </Col>
                    <Col>
                        <Title level={2}>Медкабинет</Title>
                    </Col>
                </Row>
                <TopPanel/>
            </Header>
            <Content style={contentStyle}>
                <Outlet/>
            </Content>
            {/*<Footer>*/}
            {/*    <MyFooter/>*/}
            {/*</Footer>*/}

        </>
    )
}
