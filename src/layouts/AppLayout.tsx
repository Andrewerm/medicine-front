import {Outlet} from "react-router-dom";
import { Layout } from 'antd';

export function AppLayout() {
    return (
        <>
            <Layout>
                <Outlet/>
            </Layout>

        </>
    )
}
