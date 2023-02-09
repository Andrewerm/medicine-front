import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {fetchSurveys, getReport, setAnswer} from "../app/surveysSlice";
import React, {useEffect, useState} from "react";
import {SurveyCard} from "../components/SurveyCard";
import {SurveysList} from "../components/SurveysList";
import {ISetAnswer, LoadingStatusesEnum} from "../types";
import {SurveyReport} from "../components/SurveyReport";
import {Spinner} from "../components/Spinner";
import { notification } from "antd";

export const SurveyPage:React.FC = () => {
    // const loadingStatus = useAppSelector(state => state.surveys.status);
    const {surveys, status:loadingStatus, error_message} = useAppSelector(state => state.surveys);
    const [currentSurveyId, setCurrentSurveyId] = useState<number | undefined>();
    const [surveyStep, setSurveyStep] = useState<number>(1);
    const dispatcher=useAppDispatch()
    const setAnswerDispatch=({idSurvey,idQuestion, idAnswer}:ISetAnswer)=>dispatcher(setAnswer({idSurvey,idQuestion, idAnswer}))
    const onSurveyEnter = (id: number): void => {
        setCurrentSurveyId(id)
        console.log('выбран вопрос id',id);
        setSurveyStep(2)
    }

    if (loadingStatus === LoadingStatusesEnum.failed) {
        console.log('нотификация', error_message);
        notification.error({description: 'Ошибка', message: error_message})
    }
    const onSurveyExit: React.MouseEventHandler = (): void => {
        setSurveyStep(1)
    }
    const forRequest = surveys.find(item1=>item1.id===currentSurveyId)?.questions.map(item => ({id: item.id, variant: item.selectedAnswer}))
    const onSurveyReport = () => {
        if (forRequest && currentSurveyId) dispatcher(getReport({
            id: currentSurveyId,
            answers: forRequest
        }))
        setSurveyStep(3)
    }
    useEffect(() => {
        dispatcher(fetchSurveys())
    }, []);

    const switcher=function (){
        switch (surveyStep) {
            case 1: return <SurveysList onSurveyEnter={onSurveyEnter}/>
            case 2: return currentSurveyId && <SurveyCard onReport={onSurveyReport}
                                                          onExit={onSurveyExit}
                                                          surveyId={currentSurveyId}
                                                          selectingAnswer={setAnswerDispatch}/>
            case 3: return currentSurveyId && <SurveyReport onExit={onSurveyExit} surveyId={currentSurveyId}/>
        }
    }

    return (
        <>
            {loadingStatus === LoadingStatusesEnum.loading ? <Spinner/> :switcher()}
        </>
    )
}

