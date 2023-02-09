import React, {MouseEventHandler, useContext} from "react";
import {Button, Space, Typography} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import axios from "axios";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import {useNavigate} from "react-router-dom";
import {AbilityContext, initialACL} from "../hooks/Can";
import {ProfileDataContext} from "../hooks/ProfileData";

const {Title} = Typography


export const ProfileBar: React.FC = () => {
    const navigate=useNavigate()
    const ability = useContext(AbilityContext);
    const {user_data} = useContext(ProfileDataContext);
    console.log('ProfileBar dataUser',user_data);
    const logout:MouseEventHandler<HTMLAnchorElement|HTMLButtonElement>=()=>{
        axios.post(AjaxRoutes.LOGOUT).then(_ =>{
            ability.update(initialACL)
            navigate(AjaxRoutes.LOGIN, {replace: true})
        } )
    }
    let FIO=''
    if (user_data)
         FIO=user_data.last_name+' '+user_data.first_name.slice(0,1)+'. '+user_data.middle_name.slice(0,1)+'.'
    return <Space>
        <Title level={5}>{FIO}</Title>
        <Button onClick={logout} icon={<LogoutOutlined/>}/>
    </Space>
}
