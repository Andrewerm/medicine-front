import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {executeReport, fetchAnalytics, setValue} from "../app/analytycsSlice";
import {Button, Card, Col, DatePicker, Row, Select, Space} from "antd";
import {LoadingStatusesEnum, Parametrer, ReportInputTypesEnum, Variant} from "../types";
import dayjs from 'dayjs';
import {Spinner} from "../components/Spinner";
import {DownloadOutlined} from "@ant-design/icons";
import FileSaver from 'file-saver';

export const AnalyticPage: FC = () => {
    const {analytics, status: loadingStatus, report_status} = useAppSelector(state => state.analytics)
    const dispatch = useAppDispatch()
    const analytic=(analytic_id:string, parameter_id:string):Parametrer|undefined=>analytics
        .find(item => item.id === analytic_id)?.parametrers.find(item2 => item2.id === parameter_id)
    useEffect(() => {
        dispatch(fetchAnalytics())
    }, [dispatch]);
    const SelectRender = (type: ReportInputTypesEnum, analytic_id: string, parameter_id: string, params: Array<Variant>) => {
        switch (type) {
            case ReportInputTypesEnum.list:
                return <Select
                    allowClear
                    showSearch
                    style={{minWidth: '100%'}}
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.trim().toLowerCase())}
                    onChange={(value) => {
                        dispatch(setValue({
                            analytic_id,
                            parameter_id,
                            value
                        }))
                    }}
                    key={parameter_id}
                    value={analytic(analytic_id, parameter_id)?.value}
                    mode="multiple"
                    options={params
                        .map(item => ({value: item.id.toString(), label: item.name_short || item.name_full}))}/>
            case ReportInputTypesEnum.timestamp:
                return <DatePicker
                    key={parameter_id}
                    onChange={(_, dayString) => {
                        if (dayString)  dispatch(setValue({analytic_id, parameter_id, value: dayString}))
                    }}
                    value={analytic(analytic_id, parameter_id)?.value?dayjs(analytic(analytic_id, parameter_id)?.value as string):null}
                />
        }
    }
    return (
        <>
            {loadingStatus === LoadingStatusesEnum.loading ? <Spinner/> : <Row gutter={[10, 10]}>{
                analytics.map(item => <Col key={item.id}>
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
