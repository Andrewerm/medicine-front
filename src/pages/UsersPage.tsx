import {Button, Col, Input, Modal, notification, Popconfirm, Row, Space, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {deleteUser, fetchUsers} from "../app/userSlice";
import {IHospital, IHospitalWithoutID, IUser, LoadingStatusesEnum} from "../types";
import {usersModel} from "../models/users";
import {EditModal} from "../components/EditModal";
import {fetchHospitals} from "../app/hospitalSlice";

const {Search} = Input

interface DataType extends IUser {
    key: number;
}

export const UsersPage: React.FC = () => {
    const [isNewItem, setNewItem] = useState<boolean>(true); // признак новой записи
    const [isModalOpen, setIsModalOpen] = useState(false); // окно редактирования открыто
    const {status, users, edit_status, error_message, delete_status} = useAppSelector(state => state.users)
    const {status: status_hospitals, hospitals} = useAppSelector(state => state.hospitals)
    const [initialValues, setInitialValues] = useState<IUser | undefined>(undefined); // начальные данные для редактирования
    const [editedID, setEditedID] = useState<number | null>(null); // текущий ID, который редактируется
    const [searchString, setSearchString] = useState(''); // строка поиска
    const tableData = (users as Array<DataType>)
        .filter((item: IUser) => {
            if (searchString === '') return true
            else {
                const fieldsForFilter = usersModel.filter(item2 => item2.filterable).map(item4 => item4.field)
                const unionString = fieldsForFilter.map((item3) => {
                    const typeSelector = usersModel.find(item5 => item5.field === item3)?.type === 'selector'
                    if (typeSelector) {
                        const hospital = hospitals.find((item6) => item6.id === Number(item[item3]))
                        return hospital?.name_short.toLowerCase()
                    } else return item[item3].toString().toLowerCase()
                }).join(' ')
                return unionString.includes(searchString.trim().toLowerCase())
            }
        })
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
        dispatch(fetchHospitals())

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
        ...usersModel.map(item => ({
            title: item.label,
            key: item.field,
            dataIndex: item.field,
            render: item.type === 'selector' ? (text: string) => {
                const hospital = hospitals.find(item => item.id === parseInt(text))
                return hospital ? hospital.name_short : '...'
            } : undefined
        })),
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
                            <Search allowClear={true} placeholder="Поиск по таблице" onSearch={setSearchString}
                                    style={{width: 200}}/>
                        </Col>
                        <Col>
                            <Button onClick={newItem} type="primary">Добавить пользователя</Button>
                        </Col>
                    </Row>
                    <Table
                        loading={(status === LoadingStatusesEnum.loading || status_hospitals === LoadingStatusesEnum.loading)}
                        rowKey={(record) => record.email}
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
