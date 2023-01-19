import {Outlet} from "react-router-dom";
import {Layout} from 'antd';

const {Footer, Content} = Layout;
export function AuthLayout() {
    return (
        <>

            <Content>
                <Outlet/>
            </Content>

        </>
    )
}
