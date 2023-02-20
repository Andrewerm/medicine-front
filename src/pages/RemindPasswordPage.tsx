import {Typography, Button, Form, Input, InputRef, App} from 'antd';
import {Link, useNavigate} from "react-router-dom";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import axios, {AxiosError} from "axios";
import {ACLInterface} from "../hooks/Can";
import React, {useEffect, useRef} from "react";
import {IErrorFromServer, IUserProfile} from "../types";

const {Title} = Typography;

export interface IGetLogin {
    acl: ACLInterface,
    user_data: IUserProfile
}

export const RemindPasswordPage: React.FC = () => {
    const inputRef = useRef<InputRef>(null);
    const [form] = Form.useForm();
    if (process.env.NODE_ENV==='development') form.setFieldsValue({ email: 'a.m.vinokurov@gmail.com' });
    const navigate = useNavigate()
    const {notification, modal } = App.useApp();
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus()
    }, [])
    const onFinish = (values: any) => {
        axios.post<IGetLogin>(AjaxRoutes.POST_REMIND_PASSWORD, form.getFieldsValue())
            .then(response => {
                modal.info({ title:'Запрос на восстановление пароля отправлен'});
                navigate(AjaxRoutes.ROUTE_LOGIN, {replace: true})
            })
            .catch((err: AxiosError<IErrorFromServer>) => {
                notification.error({ message:err.response?.data.message||err.message})
            })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Title level={5}>Восстановление пароля</Title>
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
                    label="Email"
                    name="email"
                    rules={[{required: true, message: 'Пожалуйста введите email', type: "email"}]}
                >
                    <Input
                        placeholder="Введите Email"
                        ref={inputRef}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" block htmlType="submit">
                        Запросить пароль
                    </Button>
                </Form.Item>
                <Form.Item >
                    <Link to={AjaxRoutes.ROUTE_REMIND_PASSWORD}>Забыли пароль?</Link><p/>
                </Form.Item>
                <Form.Item >
                    <Link to={AjaxRoutes.ROUTE_LOGIN}>На страницу авторизации</Link>
                </Form.Item>
            </Form>
        </>
    )
}
