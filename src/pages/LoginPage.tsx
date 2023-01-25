import {Typography, Button, Form, Input} from 'antd';
import {Link, useNavigate} from "react-router-dom";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import axios, {AxiosError} from "axios";
import {AbilityContext, ACLInterface} from "../hooks/Can";
import {useContext} from "react";

const {Title} = Typography;

export interface IGetLogin {
    acl: ACLInterface,
    userData: {
        FIO: string
    }
}

export const LoginPage = () => {
    const [form] = Form.useForm();
    const ability = useContext(AbilityContext);
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        console.log('Success:', values);
        axios.get<IGetLogin>(AjaxRoutes.LOGIN)
            .then(response => {
                console.log('response',response);
                ability.update(response.data.acl)
                navigate(AjaxRoutes.HOME, {replace: true})
            })
            .catch((err: AxiosError) => {
                console.error(err)
            })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Title level={5}>Авторизация</Title>
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
                    label="Логин"
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input
                        placeholder="Введите Email или телефон"
                    />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                {/*<Form.Item name="remember" valuePropName="checked" wrapperCol={{span: 16}}>*/}
                {/*    <Checkbox>Remember me</Checkbox>*/}
                {/*</Form.Item>*/}

                <Form.Item >
                    <Button type="primary" block htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{pull:6}}>
                    <Link to={AjaxRoutes.REMIND_PASSWORD}>Забыли пароль?</Link><p/>
                </Form.Item>
                <Form.Item wrapperCol={{pull:6}}>
                    <Link to={AjaxRoutes.REGISTER}>Зарегистрироваться</Link>
                </Form.Item>
            </Form>
        </>
    )
}
