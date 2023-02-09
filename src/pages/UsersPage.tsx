import {Space, Input, Button, Row, Col, Table, notification} from "antd";
import {ColumnsType} from "antd/es/table";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {fetchUsers} from "../app/userSlice";
import {IUser, LoadingStatusesEnum} from "../types";
import {usersModel} from "../models/users";

const {Search} = Input
interface DataType extends IUser{
    key: number;
}

export const UsersPage: React.FC = () => {
    const {status, users, error_message} =useAppSelector(state=>state.users)
    // debugger
    const tableData=users as Array<DataType>
    const onSearch = () => {

    }
    const dispatch=useAppDispatch()
    useEffect(() => {
        dispatch(fetchUsers())

    },[dispatch])
    if (status === LoadingStatusesEnum.failed) {
        console.log('нотификация', error_message);
        notification.error({description: 'Ошибка', message: error_message})
    }
    const columns: ColumnsType<DataType> = [
        ...usersModel.map(item=>({title:item.label, dataIndex: item.field})),
        {
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />}/>
                    <Button icon={<DeleteOutlined />}/>
                </Space>
            ),
        },
    ];
    return (
        <Row justify="center">
            <Col span={24} md={20} lg={16}>
                <Row justify="space-between" gutter={[10,10]}>
                    <Col>
                        <Search placeholder="input search text" onSearch={onSearch} style={{width: 200}}/>
                    </Col>
                    <Col>
                        <Button type="primary">Добавить пользователя</Button>
                    </Col>
                </Row>
            </Col>
            <Col span={24} md={20} lg={16}>
                <Table loading={status===LoadingStatusesEnum.loading}
                       rowKey={(record) => record.email}
                       columns={columns}
                       dataSource={tableData}
                       scroll={{ x: 500 }}/>
            </Col>

        </Row>
    )
}
