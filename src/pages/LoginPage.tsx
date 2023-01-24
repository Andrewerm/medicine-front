import {Typography, Button, Checkbox, Form, Input, Card} from 'antd';
import {Link} from "react-router-dom";
import {AjaxRoutes} from "../models/ajaxRoutes";

const {Title} = Typography;

export const LoginPage = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Title level={5}>Авторизация</Title>
            <Form
                name="basic"
                layout="vertical"
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
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

                <Form.Item wrapperCol={{span: 24}}>
                    <Button type="primary" block htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{offset:0, span: 24}}>
                    <Link to={AjaxRoutes.REMIND_PASSWORD}>Забыли пароль?</Link><p/>
                </Form.Item>
                <Form.Item wrapperCol={{offset:0,span: 12}}>
                    <Link to={AjaxRoutes.REGISTER}>Зарегистрироваться</Link>
                </Form.Item>
            </Form>
        </>
    )
}
