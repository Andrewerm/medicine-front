import {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {executeReport, fetchAnalytics, setValue} from "../app/analytycsSlice";
import {Button, Card, Col, DatePicker, Divider, Row, Select, Space} from "antd";
import {
    LoadingStatusesEnum,
    Parametrer,
    ParametrerArray,
    ParametrerString,
    ReportInputTypesEnum,
    Variant
} from "../types";
import dayjs from 'dayjs';
import {Spinner} from "../components/Spinner";
import {DownloadOutlined, PlusOutlined} from "@ant-design/icons";
import FileSaver from 'file-saver';

export const AnalyticPage: FC = () => {
    const {analytics, status: loadingStatus, report_status} = useAppSelector(state => state.analytics)
    const [selectedHospitals, setSelectedHospitals] = useState<Array<number>>([]);
    const dispatch = useAppDispatch()
    const analytic = (analytic_id: number, parameter_id: number): ParametrerArray =>
        analytics?.find(item => item.id === analytic_id)?.parametrers?.find(item2 => item2.id === parameter_id) as ParametrerArray
    const analyticDate = (analytic_id: number, parameter_id: number): ParametrerString =>
        analytics?.find(item => item.id === analytic_id)?.parametrers?.find(item2 => item2.id === parameter_id) as ParametrerString
    useEffect(() => {
        dispatch(fetchAnalytics())
    }, [dispatch]);
    const SelectRender = (type: ReportInputTypesEnum, analytic_id: number, parameter_id: number, params: Array<Variant>) => {
        switch (type) {
            case ReportInputTypesEnum.list:
                const originalList = analytic(analytic_id, parameter_id)?.variants
                return <Select
                    allowClear
                    labelInValue
                    showSearch
                    style={{minWidth: '100%'}}
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.trim().toLowerCase())}
                    onChange={(value: Array<{ value: number }>) => {
                        const values = value.map((item) => item.value)
                        if (analytic(analytic_id, parameter_id)?.name === 'Больница') {
                            setSelectedHospitals(values)
                        }
                        dispatch(setValue({
                            analytic_id,
                            parameter_id,
                            value: values
                        }))
                    }}
                    key={parameter_id}
                    value={analytic(analytic_id, parameter_id)?.value?.map((item: number) => ({
                        value: item,
                        label: originalList?.find(item3 => item3.id === item)?.label
                    }))}
                    mode="multiple"
                    dropdownRender={(menu) => (
                        <>
                            {menu}
                            <Divider style={{margin: '8px 0'}}/>
                            <Button type="text" icon={<PlusOutlined/>} onClick={() => {
                                const values=params
                                    .filter((item2) => {
                                        const temp = analytic(analytic_id, parameter_id) as Parametrer
                                        const arr = temp?.value as Array<number>
                                        if (!arr) return true
                                        else return !arr.includes(item2.id)
                                    })
                                    .filter((item3)=>{
                                        if (analytic(analytic_id, parameter_id)?.name === 'Сотрудник') {
                                            return item3.hospital_id && selectedHospitals.includes(item3.hospital_id)
                                        } else return true
                                    })
                                    .map(item4=>item4.id)
                                if (analytic(analytic_id, parameter_id)?.name === 'Больница') {
                                    setSelectedHospitals(values)
                                }
                                dispatch(setValue({
                                    analytic_id,
                                    parameter_id,
                                    value: values
                                }))
                            }}>
                                Добавить все
                            </Button>
                        </>
                    )}
                    options={params
                        .filter((item2) => {
                            const temp = analytic(analytic_id, parameter_id) as Parametrer
                            const arr = temp?.value as Array<number>
                            if (!arr) return true
                            else return !arr.includes(item2.id)
                        })
                        .filter((item3)=>{
                            if (analytic(analytic_id, parameter_id)?.name === 'Сотрудник') {
                                return item3.hospital_id && selectedHospitals.includes(item3.hospital_id)
                            } else return true
                                })
                        .map(item => ({value: item.id, label: item.label}))}/>
            case ReportInputTypesEnum.timestamp:
                return <DatePicker
                    key={parameter_id}
                    onChange={(_, dayString) => {
                        if (dayString) dispatch(setValue({analytic_id, parameter_id, value: dayString}))
                    }}
                    value={analytic(analytic_id, parameter_id)?.value ? dayjs(analyticDate(analytic_id, parameter_id)?.value) : null}
                />
        }
    }
    return (
        <>
            {loadingStatus === LoadingStatusesEnum.loading ? <Spinner/> : <Row gutter={[10, 10]}>{
                analytics.map(item => <Col span={24} lg={12} key={item.id}>
                    <Card
                        title={item.title}
                        actions={
                            [<Space.Compact><Button
                                disabled={item.parametrers.some(item2 => !item2.value)}
                                loading={report_status === LoadingStatusesEnum.loading} onClick={() => {
                                dispatch(executeReport(item.id))
                            }}>Выполнить</Button>,
                                <Button disabled={!item.fileReport}
                                        loading={report_status === LoadingStatusesEnum.loading}
                                        icon={<DownloadOutlined/>}
                                        onClick={() => {
                                            FileSaver.saveAs(item.fileReport, 'report.xlsx');
                                        }}/>
                            </Space.Compact>
                            ]
                        }
                    >
                        <Space direction="vertical">
                            {item.description}
                            {item.parametrers.map(item2 => SelectRender(item2.type as ReportInputTypesEnum, item.id, item2.id, item2.variants))}
                        </Space>
                    </Card>
                </Col>)
            }</Row>
            }</>)
}
