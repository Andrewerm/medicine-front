import {Card, Space, Typography} from "antd";
import {useAppSelector} from "../hooks/reduxHooks";

interface ISurveyReportProps {
    onExit: () => void,
    surveyId: number
}

export const SurveyReport = ({surveyId}: ISurveyReportProps) => {
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
