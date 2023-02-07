import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import React, {useEffect, useState} from "react";
import {createHospital, fetchHospitals, updateHospital} from "../app/hospitalSlice";
import {IHospital, IHospitalWithoutID, LoadingStatusesEnum} from "../types";
import {ColumnsType} from "antd/es/table";
import {App, Button, Col, Input, Modal, notification, Row, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {EditModal} from "../components/EditModal";
import {hospitalsModel} from "../models/hospitals";

interface DataType extends IHospital {
    key: number
}

const {Search} = Input

export const HospitalsPage: React.FC = () => {

    const {status, hospitals, edit_status, error_message} = useAppSelector(state => state.hospitals)
    const {message, notification, modal} = App.useApp();
    if (edit_status === LoadingStatusesEnum.failed) {
        console.log('нотификация', error_message);
        notification.error({description: 'Ошибка', message: error_message})
    }
    console.log('status', status);
    console.log('edit_status', edit_status);
    const tableData = hospitals as Array<DataType>
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchHospitals())
    }, [dispatch])
    const columns: ColumnsType<DataType> = [
        ...hospitalsModel
            .filter(item => !item.hiddenInTable)
            .map(item => ({title: item.label, dataIndex: item.field})),
        {
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => editItem(record.id)} icon={<EditOutlined/>}/>
                    <Button icon={<DeleteOutlined/>}/>
                </Space>
            ),
        },
    ];
    const onSearch = () => {

    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewItem, setNewItem] = useState<boolean>(true);
    const [initialValues, setInitialValues] = useState<IHospital | undefined>(undefined);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const onCancel = () => {
        closeModal()
    }
    const onFinish = (values: IHospital | IHospitalWithoutID) => {
        console.log('Success:', values);
        if (isNewItem) dispatch(createHospital(values as IHospitalWithoutID))
                else dispatch(updateHospital(values as IHospital))
        if (edit_status === LoadingStatusesEnum.idle) closeModal()
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const newItem = () => {
        setNewItem(true)
        setInitialValues(undefined)
        showModal()
    }
    const editItem = (id: number) => {
        setNewItem(false)
        const row = hospitals.find(item => item.id === id)
        setInitialValues(row)
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
                    dataSource={tableData}
                    scroll={{x: 500}}/>
            </Col>
        </Row>
        <Modal title={isNewItem ? 'Добавление' : 'Редактирование'}
               open={isModalOpen}
               footer={null}
               onCancel={onCancel}
        >
            <EditModal model={hospitalsModel}
                       editStatus={edit_status}
                       onFinish={onFinish}
                       onFinishFailed={onFinishFailed}
                       initialValues={initialValues}/>
        </Modal>
    </>
}
