import {Space, Input, Button, Row, Col, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {fetchUsers} from "../app/userSlice";
import {IUser, LoadingStatusesEnum} from "../types";

const {Search} = Input
interface DataType extends IUser{
    key: number;
}

export const UsersPage: React.FC = () => {
    const {status, users} =useAppSelector(state=>state.users)
    // debugger
    const tableData=users as Array<DataType>
    const onSearch = () => {

    }
    const dispatch=useAppDispatch()
    useEffect(() => {
        dispatch(fetchUsers())

    },[])
    // const data: DataType[] = [
    //     {
    //         key: '1',
    //         name: 'John Brown',
    //         age: 32,
    //         address: 'New York No. 1 Lake Park',
    //     },
    //     {
    //         key: '2',
    //         name: 'Jim Green',
    //         age: 42,
    //         address: 'London No. 1 Lake Park',
    //     },
    //     {
    //         key: '3',
    //         name: 'Joe Black',
    //         age: 32,
    //         address: 'Sydney No. 1 Lake Park',
    //     },
    // ];
    const columns: ColumnsType<DataType> = [
        {
            title: 'Пользователь',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Контактные данные',
            dataIndex: 'contacts',
            key: 'contacts',
        },
        {
            title: 'Больница',
            dataIndex: 'hospital',
            key: 'hospital',
        },
        {
            title: 'Адрес Больницы',
            dataIndex: 'address',
            key: 'address',
        },
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
                       dataSource={tableData} scroll={{ x: 500 }}/>
            </Col>

        </Row>
    )
}
