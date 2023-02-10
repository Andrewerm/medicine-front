import {Button, Card, Space, Typography} from "antd";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import React, {useContext, useEffect} from "react";
import {TopPanelContext} from "../hooks/topPanel";
import {resetAnswers} from "../app/surveysSlice";
import {WordLogo} from "./images/WordLogo";

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
            <Space direction="vertical" size="middle" >
                <Space size={"large"}>
                    <Typography.Title level={3}>Заключение по "{survey && survey.title}"</Typography.Title>
                    {survey && survey.report && <a href={survey.report.fileLink} target="_blank">
                        <WordLogo/>
                    </a>}
                </Space>
                <Card>
                    {survey && survey.report && <div dangerouslySetInnerHTML={{__html: survey.report.textReport}}></div>}
                </Card>
            </Space>
        </>
    )
}
