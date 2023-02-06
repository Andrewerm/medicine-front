import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import React, {useEffect} from "react";
import {fetchHospitals} from "../app/hospitalSlice";
import {IHospital, LoadingStatusesEnum} from "../types";
import {ColumnsType} from "antd/es/table";
import {Button, Col, Input, Row, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

interface DataType extends IHospital {
    key: number
}

const {Search} = Input

export const HospitalsPage:React.FC = () => {

    // const {status, hospitals} = useAppSelector(state => state.hospitals)
    // // debugger
    // console.log('status',status);
    // const tableData = hospitals as Array<DataType>
    // const dispatch = useAppDispatch()
    // useEffect(() => {
    //     dispatch(fetchHospitals())
    // }, [])
    // const columns: ColumnsType<DataType> = [
    //     {
    //         title: 'Название',
    //         dataIndex: 'name_short',
    //     },
    //     {
    //         title: 'Адрес',
    //         dataIndex: 'address',
    //     },
    //     {
    //         title: 'Телефон',
    //         dataIndex: 'phone',
    //     },
    //     {
    //         title: 'Email',
    //         dataIndex: 'email',
    //     },
    //     {
    //         key: 'action',
    //         render: (_, record) => (
    //             <Space size="middle">
    //                 <Button icon={<EditOutlined/>}/>
    //                 <Button icon={<DeleteOutlined/>}/>
    //             </Space>
    //         ),
    //     },
    // ];
    // const onSearch = () => {
    //
    // }
    return <div>б</div>

    // <Row justify="center">
    //     <Col span={24} md={20} lg={16}>
    //         <Row justify="space-between" gutter={[10, 10]}>
    //             <Col>
    //                 <Search placeholder="input search text" onSearch={onSearch} style={{width: 200}}/>
    //             </Col>
    //             <Col>
    //                 <Button type="primary">Добавить пользователя</Button>
    //             </Col>
    //         </Row>
    //     </Col>
    //     <Col span={24} md={20} lg={16}>
    //         <Table
    //             rowKey={(record) => record.id}
    //             loading={status === 'loading'}
    //             columns={columns}
    //             dataSource={tableData} scroll={{x: 500}}/>
    //     </Col>
    //
    // </Row>
}
