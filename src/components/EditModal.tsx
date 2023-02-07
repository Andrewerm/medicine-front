import React from "react";
import {Button, Form, Input} from "antd";
import {IModel} from "../models/types";
import {IHospital, IUser, LoadingStatusesEnum} from "../types";

interface ModalProps {
    model: Array<IModel>,
    onFinish: (values: any) => void,
    onFinishFailed: (errorInfo: any) => void,
    editStatus: LoadingStatusesEnum
    initialValues:IHospital|IUser|undefined
}

export const EditModal: React.FC<ModalProps> = ({model, onFinish, onFinishFailed, editStatus,initialValues}) => {
    return <>
        <Form
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={initialValues}
        >
            {model.map((item) => <Form.Item
                key={item.field}
                label={item.label}
                name={item.field}
                rules={item.rules}
            >
                <Input/>
            </Form.Item>)}
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button loading={editStatus===LoadingStatusesEnum.loading} type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    </>
}
