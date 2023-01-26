import {Input, Col, Row} from "antd";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {fetchSurveys} from "../app/surveysSlice";
import {useEffect} from "react";
import {SurveyCardCover} from "../components/SurveyCardCover";


const {Search} = Input;

export const SurveyPage = () => {
    const surveys=useAppSelector(state=>state.surveys.surveys);
    const loadingStatus=useAppSelector(state=>state.surveys.status);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchSurveys())
    }, [dispatch]);


    return (
        <>
            <Search placeholder="input search text" allowClear style={{width: 200}}/>
            {loadingStatus==='loading'?<div>Загрузка</div>:<Row>
                {surveys.map(item=><Col key={item.id}>
                    <SurveyCardCover title={item.title} description={item.description}></SurveyCardCover>
                </Col>)}

            </Row>}
        </>
    )
}
