import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import React, {useEffect, useState} from "react";
import {
    createHospital,
    deleteHospital,
    fetchHospitals,
    setDeleteStatusToIdle,
    setStatusToIdle,
    updateHospital
} from "../app/hospitalSlice";
import {IHospital, IHospitalWithoutID, LoadingStatusesEnum} from "../types";
import {ColumnsType} from "antd/es/table";
import {App, Button, Col, Input, Modal, Popconfirm, Row, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {EditModal} from "../components/EditModal";
import {hospitalsModel} from "../models/hospitals";

interface DataType extends IHospital {
    key: number
}

const {Search} = Input

export const HospitalsPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const {status, hospitals, edit_status, error_message, delete_status} = useAppSelector(state => state.hospitals)
    const {notification} = App.useApp();
    const [isModalOpen, setIsModalOpen] = useState(false); // окно редактирования открыто
    const [searchString, setSearchString] = useState(''); // строка поиска
    const closeModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        if (edit_status === LoadingStatusesEnum.done) {
            notification.success({description: 'Успешно', message: 'Обновление данных'})
            dispatch(setStatusToIdle())
            closeModal()
        }
        if (edit_status === LoadingStatusesEnum.failed || delete_status=== LoadingStatusesEnum.failed) {
            notification.error({
                description: 'Ошибка',
                message: error_message
            })
            dispatch(setDeleteStatusToIdle())
        }

    }, [edit_status,delete_status])
    useEffect(() => {
        if (delete_status === LoadingStatusesEnum.done) {
            notification.warning({description: 'Успешно', message: 'Удаление больницы'})
            dispatch(setDeleteStatusToIdle())
        }
    }, [delete_status])


    const tableData = (hospitals as Array<DataType>)
        .filter((item: IHospital) => {
            if (searchString === '') return true
            else {
                const fieldsForFilter = hospitalsModel.filter(item2 => item2.filterable).map(item4 => item4.field)
                const unionString = fieldsForFilter.map((item3) => item[item3].toString().toLowerCase()).join(' ')
                return unionString.includes(searchString.trim().toLowerCase())
            }
        })
    useEffect(() => {
        dispatch(fetchHospitals())
    }, [dispatch])
    // формирование колонок таблицы
    const columns: ColumnsType<DataType> = [
        ...hospitalsModel
            .filter(item => !item.hiddenInTable)
            .map(item => ({title: item.label, dataIndex: item.field})),
        {
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => editItem(record.id)} icon={<EditOutlined/>}/>
                    <Popconfirm
                        title="Удаление"
                        description="Вы уверены, что хотите удалить больницу?"
                        onConfirm={() => confirmDelete(record.id)}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button icon={<DeleteOutlined/>}/>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const confirmDelete = (idHospital: number) => {
        dispatch(deleteHospital(idHospital))
    }

    const [editedID, setEditedID] = useState<number | null>(null); // текущий ID, который редактируется
    const [isNewItem, setNewItem] = useState<boolean>(true); // признак новой записи
    const [initialValues, setInitialValues] = useState<IHospital | undefined>(undefined); // начальные данные для редактирования
    const showModal = () => {
        setIsModalOpen(true);
    };

    const onCancel = () => {
        closeModal()
    }
    const onFinish = (values: IHospital | IHospitalWithoutID) => {
        if (isNewItem) dispatch(createHospital(values as IHospitalWithoutID))
        else if (editedID) {
            const val = values as IHospital
            val.id = editedID // добавляем ID
            dispatch(updateHospital(val))
        }
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
        setEditedID(id)
        showModal()
    }
    return <>
        <Row justify="center" gutter={[10, 10]}>
            <Col span={24} md={20} lg={16}>
                <Row justify="space-between" gutter={[10, 10]}>
                    <Col>
                        <Search allowClear={true} placeholder="Поиск по таблице" onSearch={setSearchString} style={{width: 200}}/>
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
               destroyOnClose={true}>
            <EditModal model={hospitalsModel}
                       editStatus={edit_status}
                       onFinish={onFinish}
                       onFinishFailed={onFinishFailed}
                       initialValues={initialValues}/>
        </Modal>
    </>
}
