import {Input, Col, Row} from "antd";
import {useAppSelector} from "../hooks/reduxHooks";
import {SurveyCardCover} from "./SurveyCardCover";
import {useContext, useEffect} from "react";
import {TopPanelContext} from "../hooks/topPanel";

interface ISurveysListProps {
    onSurveyEnter: (id: number) => void
}
const {Search} = Input;


export const SurveysList:React.FC<ISurveysListProps> = ({onSurveyEnter}) => {
    const surveys = useAppSelector(state => state.surveys.surveys);
    const context= useContext(TopPanelContext);
    useEffect(() => {
        if (context) context.setButtons([])
    }, []);

    return (
        <div>
            <Search placeholder="input search text" allowClear style={{width: 200, marginBottom: 20}}/>
            <Row gutter={[16, 16]}>
                {surveys.map(item =>
                    <Col span={20} md={12} xl={8} key={item.id}>
                        <SurveyCardCover title={item.title}
                                         description={item.description}
                                         onEnter={() => onSurveyEnter(item.id)}/>
                    </Col>)}
            </Row>
        </div>
    )
}
