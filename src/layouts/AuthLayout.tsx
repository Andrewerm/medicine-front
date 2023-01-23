import {Outlet} from "react-router-dom";
import {Layout} from 'antd';
import React from "react";
import {Welcome} from "../components/Welcome";

const {Content, Sider } = Layout;
export function AuthLayout(){
    const contentStyle: React.CSSProperties = {
        textAlign: 'center',
        // minHeight: 120,
        // lineHeight: '120px',
        // height: 100vh,
        // color: '#fff',
        // backgroundColor: '#108ee9',
        // position: 'absolute',
        // top: '50%',
        // transform: 'translateY(-50%)',
    };

    const siderStyle: React.CSSProperties = {
        textAlign: 'center',
        // lineHeight: '120px',
        color: '#fff',
        // backgroundColor: '#3ba0e9',
    };
    const layoutStyle:React.CSSProperties ={
        height: '100vh'

    }
    return (
        <Layout style={layoutStyle}>

            <Content style={contentStyle}>
                <Outlet/>
            </Content>
            <Sider style={siderStyle}>
                <Welcome/>
            </Sider>
        </Layout>
    )
}
