import {Space, Input, Button, Row, Col, Table, notification, Modal, Popconfirm} from "antd";
import {ColumnsType} from "antd/es/table";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {deleteUser, fetchUsers} from "../app/userSlice";
import {IHospital, IHospitalWithoutID, IUser, LoadingStatusesEnum} from "../types";
import {usersModel} from "../models/users";
import {EditModal} from "../components/EditModal";

const {Search} = Input

interface DataType extends IUser {
    key: number;
}

export const UsersPage: React.FC = () => {
    const [isNewItem, setNewItem] = useState<boolean>(true); // признак новой записи
    const [isModalOpen, setIsModalOpen] = useState(false); // окно редактирования открыто
    const {status, users, edit_status, error_message, delete_status} = useAppSelector(state => state.users)
    const [initialValues, setInitialValues] = useState<IUser | undefined>(undefined); // начальные данные для редактирования
    const [editedID, setEditedID] = useState<number | null>(null); // текущий ID, который редактируется
    // debugger
    const tableData = users as Array<DataType>
    const onSearch = () => {

    }
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const onCancel = () => {
        closeModal()
    }
    const onFinish = (values: IHospital | IHospitalWithoutID) => {
        // if (isNewItem) dispatch(createUser(values as IHospitalWithoutID))
        // else if (editedID) {
        //     const val = values as IHospital
        //     val.id = editedID // добавляем ID
        //     dispatch(updateHospital(val))
        // }
    };
    const confirmDelete = (idUser: number) => {
        dispatch(deleteUser(idUser))
    }
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchUsers())

    }, [dispatch])
    if (status === LoadingStatusesEnum.failed) {
        console.log('нотификация', error_message);
        notification.error({description: 'Ошибка', message: error_message})
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const newItem = () => {
        setNewItem(true)
        setInitialValues(undefined)
        showModal()
    }
    const editItem = (id: number) => {
        setNewItem(false)
        const row = users.find(item => item.id === id)
        setInitialValues(row)
        setEditedID(id)
        showModal()
    }
    const columns: ColumnsType<DataType> = [
        ...usersModel.map(item => ({title: item.label, dataIndex: item.field})),
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
    return (<>
        <Row justify="center" gutter={[10, 10]}>
            <Col span={24} md={20} lg={16}>
                <Row justify="space-between" gutter={[10, 10]}>
                    <Col>
                        <Search placeholder="input search text" onSearch={onSearch} style={{width: 200}}/>
                    </Col>
                    <Col>
                        <Button onClick={newItem} type="primary">Добавить пользователя</Button>
                    </Col>
                </Row>
                <Table loading={status === LoadingStatusesEnum.loading}
                       rowKey={(record) => record.email}
                       columns={columns}
                       dataSource={tableData}
                       scroll={{x:500}}/>

            </Col>
        </Row>
            <Modal title={isNewItem ? 'Добавление' : 'Редактирование'}
                   open={isModalOpen}
                   footer={null}
                   onCancel={onCancel}
                   destroyOnClose={true}>
                <EditModal model={usersModel}
                           editStatus={edit_status}
                           onFinish={onFinish}
                           onFinishFailed={onFinishFailed}
                           initialValues={initialValues}
                />
            </Modal>
        </>
    )
}
