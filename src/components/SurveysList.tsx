import {Input, Col, Row} from "antd";
import {useAppSelector} from "../hooks/reduxHooks";
import {SurveyCardCover} from "./SurveyCardCover";
import {useContext, useEffect} from "react";
import {TopPanelContext} from "../hooks/topPanel";

interface ISurveysListProps {
    onSurveyEnter: (id: number) => void
}
const {Search} = Input;


export const SurveysList = ({onSurveyEnter}: ISurveysListProps) => {
    const surveys = useAppSelector(state => state.surveys.surveys);
    const context= useContext(TopPanelContext);
    useEffect(() => {
        if (context) context.setButtons([])
    }, []);

    return (
        <div>
            <Search placeholder="input search text" allowClear style={{width: 200}}/>
            <Row gutter={[16, 16]}>
                {surveys.map(item =>
                    <Col span={24} md={12} key={item.id}>
                        <SurveyCardCover title={item.title}
                                         description={item.description}
                                         onEnter={() => onSurveyEnter(item.id)}/>
                    </Col>)}
            </Row>
        </div>
    )
}
