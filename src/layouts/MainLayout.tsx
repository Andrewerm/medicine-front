import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Footer as MyFooter} from "../components/Footer";
import {Col, Layout, Menu, Row, Space, Typography} from 'antd';
import type { MenuProps } from 'antd';
import {HeartInHand} from "../components/images/HeartInHand";
import {TopPanel} from "../components/TopPanel";
import React, {ReactEventHandler, useEffect, useState} from "react";
import {ProfileBar} from "../components/ProfileBar";
import {ItemType} from "antd/es/menu/hooks/useItems";


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
    ]
    const navigate=useNavigate()
    const [selectedKey, setSelectedKey] = useState<string[]>()
    const location=useLocation()
    const menuSelect=(e:any)=>{
        console.log('menuSelect',e);
        navigate(e.key)
    }
    // setSelectedKey([location.pathname.slice(1)])
    useEffect(() => {
        console.log('location.pathname',location.pathname.slice(1));
        setSelectedKey([location.pathname.slice(1)])

    }, []);

    return (
        <>
            <Header style={headerStyle}>
                <Row justify="space-between" gutter={10}>
                    <Col span={20} sm={8}>
                        <Space align="center">
                            <HeartInHand/>
                            <Title style={{margin:0}} level={2}>Медкабинет</Title>
                        </Space>
                    </Col>
                    <Col span={4} sm={8}>
                        {selectedKey && <Menu defaultSelectedKeys={selectedKey} mode="horizontal" items={items} onSelect={menuSelect}/>}
                    </Col>
                    <Col flex="auto" span={24} sm={8}>
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
