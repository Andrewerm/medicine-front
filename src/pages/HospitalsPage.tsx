import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import React, {useEffect, useState} from "react";
import {fetchHospitals} from "../app/hospitalSlice";
import {IHospital, LoadingStatusesEnum} from "../types";
import {ColumnsType} from "antd/es/table";
import {Button, Col, Input, Modal, Row, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {HospitalModal} from "../components/HospitalModal";

interface DataType extends IHospital {
    key: number
}

const {Search} = Input

export const HospitalsPage:React.FC = () => {

    const {status, hospitals} = useAppSelector(state => state.hospitals)
    // debugger
    console.log('status',status);
    const tableData = hospitals as Array<DataType>
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchHospitals())
    }, [])
    const columns: ColumnsType<DataType> = [
        {
            title: 'Название',
            dataIndex: 'name_short',
        },
        {
            title: 'Адрес',
            dataIndex: 'address',
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={editItem} icon={<EditOutlined/>}/>
                    <Button icon={<DeleteOutlined/>}/>
                </Space>
            ),
        },
    ];
    const onSearch = () => {

    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewItem, setNewItem] = useState<boolean>(true);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const newItem = () => {
        setNewItem(true)
        showModal()
    }
    const editItem=()=>{
        setNewItem(false)
        showModal()
    }
    return <>
        <Row justify="center">
        <Col span={24} md={20} lg={16}>
            <Row justify="space-between" gutter={[10, 10]}>
                <Col>
                    <Search placeholder="input search text" onSearch={onSearch} style={{width: 200}}/>
                </Col>
                <Col>
                    <Button onClick={newItem} type="primary">Добавить больницу</Button>
                </Col>
            </Row>
        </Col>
        <Col span={24} md={20} lg={16}>
            <Table
                rowKey={(record) => record.id}
                loading={status === LoadingStatusesEnum.loading}
                columns={columns}
                dataSource={tableData} scroll={{x: 500}}/>
        </Col>

    </Row>
    <Modal title={isNewItem?'Добавление':'Редактирование'}
           open={isModalOpen}
           onOk={handleOk}
           onCancel={handleCancel}>
        <HospitalModal/>
    </Modal>
    </>
}
