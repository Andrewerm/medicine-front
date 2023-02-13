import React, {FunctionComponent, useContext, useState} from "react";
import {Button, Checkbox, Form, Input, Typography} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import {AxiosError} from "axios";
import {AbilityContext} from "../hooks/Can";
import {ProfileDataContext} from "../hooks/ProfileData";
import axios from "../configs/axios";
import {useAppSelector} from "../hooks/reduxHooks";
import {Selector} from "react-redux";
import {HospitalSelector} from "../components/HospitalSelector";
const {Title} = Typography;

export interface Acl {
    action: string;
    subject: string;
}

export interface UserData {
    email: string;
    first_name: string;
    hospital_id: number;
    id: number;
    is_active: boolean;
    last_name: string;
    middle_name: string;
    phone: string;
    position: string;
}

export interface IGetRegister {
    acl: Acl[];
    user_data: UserData;
}



export const RegisterPage:FunctionComponent=()=>{
    const [form] = Form.useForm();
    const ability = useContext(AbilityContext);
    const navigate = useNavigate()
    const [acceptHandlingData, setAcceptHandlingData] = useState(false);
    const {setDataUser} = useContext(ProfileDataContext);
    const onFinish = (values: any) => {
        let params=form.getFieldsValue()
        params={role_id:2, ...params}
        axios.post<IGetRegister>(AjaxRoutes.REGISTER, params)
            .then(response => {
                ability.update(response.data.acl)
                if (response.data?.user_data)
                    setDataUser(response.data.user_data)
                navigate(AjaxRoutes.HOME, {replace: true})
            })
            .catch((err: AxiosError) => {
                console.error(err)
            })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return <>
        <Title level={5}>Регистрация</Title>
        <Form
            form={form}
            name="basic"
            layout="vertical"
            style={{maxWidth: 600}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                name="email"
                rules={[{required: true, message: 'Email обязателен!', type: "email"}]}
            >
                <Input
                    placeholder="Email"
                />
            </Form.Item>
            <Form.Item
                name="phone"
                rules={[{required: true, message: 'Номер телефона обязетелен!'}]}
            >
                <Input placeholder="Телефон"/>
            </Form.Item>
            <Form.Item
                name="first_name"
                rules={[{required: true, message: 'Фамилия обязательна!'}]}
            >
                <Input placeholder="Фамилия"/>
            </Form.Item>
            <Form.Item
                name="last_name"
                rules={[{required: true, message: 'Имя обязательно!'}]}
            >
                <Input placeholder="Имя"/>
            </Form.Item>
            <Form.Item
                name="middle_name"
                initialValue=""
                rules={[]}
            >
                <Input placeholder="Отчество"/>
            </Form.Item>
            <Form.Item
                name="position"
                rules={[{required: true, message: 'Укажите должность!'}]}
            >
                <Input placeholder="Должность"/>
            </Form.Item>
            <Form.Item
                label="Больница"
                name="hospital_id"
                rules={[{required: true, message: 'Выбрать больницу!'}]}
            >
                <HospitalSelector/>
            </Form.Item>

            <Form.Item wrapperCol={{span: 16}}>
                <Checkbox onChange={()=>setAcceptHandlingData((prevState)=>!prevState)}>Согласен на обработку данных</Checkbox>
            </Form.Item>


            <Form.Item>
                <Button disabled={!acceptHandlingData} type="primary" block htmlType="submit">
                    Войти
                </Button>
            </Form.Item>
            <Form.Item wrapperCol={{pull: 6}}>
                <Link to={AjaxRoutes.ROUTE_LOGIN}>Уже есть Логин?</Link>
            </Form.Item>
        </Form>
    </>
}
