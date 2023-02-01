import {Space, Input, Button, Row, Col, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const {Search} = Input
interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
}

export const UsersPage: React.FC = () => {
    const onSearch = () => {

    }
    const data: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
        },
    ];
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
                <Table columns={columns} dataSource={data} scroll={{ x: 500 }}/>
            </Col>

        </Row>
    )
}
