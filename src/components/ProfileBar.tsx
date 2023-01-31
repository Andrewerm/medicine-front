import React, {MouseEventHandler, useContext} from "react";
import {Button, Space, Typography} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import axios from "axios";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import {useNavigate} from "react-router-dom";
import {AbilityContext} from "../hooks/Can";

const {Title} = Typography


export const ProfileBar: React.FC = () => {
    const navigate=useNavigate()
    const ability = useContext(AbilityContext);
    const logout:MouseEventHandler<HTMLAnchorElement|HTMLButtonElement>=()=>{
        axios.delete(AjaxRoutes.LOGOUT).then(response =>{
            ability.update(response.data.acl)
            navigate(AjaxRoutes.LOGIN, {replace: true})
        } )
    }
    return <Space>
        <Title level={5}>Ермаков Андрей Игоревич</Title>
        <Button onClick={logout} icon={<LogoutOutlined/>}/>
    </Space>
}
