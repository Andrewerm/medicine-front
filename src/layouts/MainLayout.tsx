import {Navigation} from "../components/Navigation";
import {Outlet} from "react-router-dom";
import {Footer as MyFooter} from "../components/Footer";
import {Layout} from 'antd';

const {Header, Footer, Content} = Layout;


export function MainLayout() {
    return (
        <>
            <Header>
                <Navigation/>
            </Header>
            <Content>
                <Outlet/>
            </Content>
            <Footer>
                <MyFooter/>
            </Footer>

        </>
    )
}
