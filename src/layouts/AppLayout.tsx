import {Outlet} from "react-router-dom";
import { Layout } from 'antd';
import React from "react";

export function AppLayout() {
    const layoutStyle: React.CSSProperties = {
        // height: '100vh'
        // minHeight: '100vh'
        height: '100vh'

    }
    return (
        <>
            <Layout style={layoutStyle}>
                <Outlet/>
            </Layout>

        </>
    )
}
