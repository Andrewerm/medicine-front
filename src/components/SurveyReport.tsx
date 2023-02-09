import {Button, Card, Space, Typography} from "antd";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import React, {useContext, useEffect} from "react";
import {TopPanelContext} from "../hooks/topPanel";
import {resetAnswers} from "../app/surveysSlice";

interface ISurveyReportProps {
    onExit:  React.MouseEventHandler,
    surveyId: number
}

export const SurveyReport:React.FC<ISurveyReportProps> = ({surveyId, onExit}) => {
    const survey = useAppSelector(state => state.surveys.surveys.find(item => item.id === surveyId))
    const topPanelContext = useContext(TopPanelContext);
    const dispatcher=useAppDispatch()
    useEffect(() => {
        const buttons = [<Button onClick={onExit}>ВЕРНУТЬСЯ К СПИСКУ ВОПРОСОВ</Button>]
        if (topPanelContext) topPanelContext.setButtons(buttons)
        dispatcher(resetAnswers(surveyId))
    }, []);
    return (
        <>
            <Space direction="vertical" size="middle" style={{display: 'flex'}}>
                <Card> <Typography.Title level={2}>Организация</Typography.Title> </Card>
                <Card title="Заголовок отчёта">
                    {survey && survey.report && <div dangerouslySetInnerHTML={{__html: survey.report}}></div>}
                </Card>
            </Space>
        </>
    )
}
