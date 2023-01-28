import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {fetchSurveys} from "../app/surveysSlice";
import {useEffect, useState} from "react";
import {SurveyCard} from "../components/SurveyCard";
import {SurveysList} from "../components/SurveysList";

export const SurveyPage = () => {
    const loadingStatus = useAppSelector(state => state.surveys.status);
    const [currentSurvey, setCurrentSurvey] = useState<number | undefined>();
    const [surveyView, setSurveyView] = useState(false);
    const surveys = useAppSelector(state => state.surveys.surveys);
    const onSurveyEnter = (id: number): void => {
        setCurrentSurvey(id)
        setSurveyView(true)
    }
    const onSurveyExit = (): void => {
        setSurveyView(false)
    }
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchSurveys())
    }, [dispatch]);

    return (
        <>
            {loadingStatus === 'loading' ? <div>Загрузка</div> :
                (surveyView && currentSurvey) ?
                    <SurveyCard onExit={onSurveyExit} survey={surveys[currentSurvey]}/> :
                    <SurveysList onSurveyEnter={onSurveyEnter}/>
            }
        </>
    )
}
