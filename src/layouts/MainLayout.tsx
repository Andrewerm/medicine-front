import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {Footer as MyFooter} from "../components/Footer";
import {Col, Layout, Menu, Row, Space, Typography} from 'antd';
import type {MenuProps} from 'antd';
import {HeartInHand} from "../components/images/HeartInHand";
import {TopPanel} from "../components/TopPanel";
import React, {useEffect, useState} from "react";
import {ProfileBar} from "../components/ProfileBar";

import {ACLEntityEnum} from "../types";
import {Can} from "../hooks/Can";
import {AjaxRoutes} from "../configs/ajaxRoutes";


const {Title} = Typography
const {Header, Footer, Content} = Layout;


export const MainLayout: React.FC = () => {
    const headerStyle: React.CSSProperties = {
        // textAlign: 'center',
        color: '#1048CE',
        height: "unset",
        paddingInline: 50,
        // lineHeight: '64px',
        backgroundColor: 'white',
        padding: '10px'
    };
    const contentStyle: React.CSSProperties = {
        backgroundColor: '#F6FAFF',
        // height: '100%',
        padding: '20px',
    }
    const items: MenuProps['items'] = [
        {
            label: 'Опросники',
            key: '',
        },
        {
            label: 'Пользователи',
            key: 'users',
        },
        {
            label: 'Больницы',
            key: 'hospitals',
        },
        {
            label: 'Аналитика',
            key: 'analytics',
        },
    ]
    const navigate = useNavigate()
    const [selectedKey, setSelectedKey] = useState<string[]>()
    const location = useLocation()
    const menuSelect = (e: any) => {
        navigate(e.key)
    }
    useEffect(() => {
        setSelectedKey([location.pathname.slice(1)])
    }, [location]);

    return (
        <>
            <Header style={headerStyle}>
                <Row justify="space-between" gutter={10}>
                    <Col>
                        <Link to={AjaxRoutes.HOME}>
                            <Space align="center">
                                <HeartInHand/>
                                <Title style={{margin: 0}} level={3}>Медкабинет</Title>
                            </Space>
                        </Link>
                    </Col>
                    <Can I="update" a={ACLEntityEnum.HOSPITALS}>
                        <Col flex="auto" xs={{order: 1}} sm={{order: 0}}>
                            {selectedKey && <Menu selectedKeys={selectedKey} mode="horizontal"
                                                  style={{justifyContent: "center"}}
                                                  items={items}
                                                  onSelect={menuSelect}/>}
                        </Col>
                    </Can>
                    <Col xs={{order: 0}} sm={{order: 1}}>
                        <ProfileBar/>
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
