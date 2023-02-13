import {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {fetchAnalytics, setValue} from "../app/analytycsSlice";
import {Button, Card, Col, DatePicker, Row, Select, Space} from "antd";
import {ReportInputTypesEnum, Variant} from "../types";

export const AnalyticPage: FC = () => {
    const {analytics, status} = useAppSelector(state => state.analytics)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchAnalytics())
    }, [dispatch]);
    const SelectRender = (type: ReportInputTypesEnum, analytic_id: string, parameter_id: string, params: Array<Variant>) => {
        switch (type) {
            case ReportInputTypesEnum.list:
                return <Select size="middle"
                               onChange={(value) => {
                                   dispatch(setValue({
                                       analytic_id,
                                       parameter_id: parameter_id, value
                                   }))
                               }
                               }
                               key={parameter_id}
                               value={analytics.find(item => item.id === analytic_id)?.parametrers?.find(item2 => item2.id === parameter_id)?.value}
                               mode="multiple"
                               options={params
                                   .map(item => ({key: item.id, label: item.name_short || item.name_full}))}/>
            case ReportInputTypesEnum.timestamp:
                return <DatePicker key={parameter_id}/>
        }

    }


    return <Row gutter={[10, 10]}>{
        analytics.map(item => <Col key={item.id}>
            <Card
                title={item.title}
                actions={[<Button>выполнить</Button>]}
            >

                <Space.Compact direction="vertical">
                    {item.description}
                    {item.parametrers.map(item2 => SelectRender(item2.type as ReportInputTypesEnum, item.id, item2.id, item2.variants))}
                </Space.Compact>
            </Card>
        </Col>)
    }</Row>
}
