import {Card, Space, Typography} from "antd";
import {useAppSelector} from "../hooks/reduxHooks";
import React from "react";

interface ISurveyReportProps {
    onExit:  React.MouseEventHandler<HTMLButtonElement>,
    surveyId: number
}

export const SurveyReport:React.FC<ISurveyReportProps> = ({surveyId}) => {
    const survey = useAppSelector(state => state.surveys.surveys.find(item => item.id === surveyId))

    return (
        <>
            <Space direction="vertical" size="middle" style={{display: 'flex'}}>
                <Card> <Typography.Title level={2}>Организация</Typography.Title> </Card>
                <Card title="Заголовок отчёта">{survey?.report}</Card>
            </Space>
        </>
    )
}
