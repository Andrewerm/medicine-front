import {ISetAnswer} from "../types";
import React, {useContext, useEffect} from "react";
import {TopPanelContext} from "../hooks/topPanel";
import {Button, Row, Col, Card, Radio, Space} from "antd";
import {useAppSelector} from "../hooks/reduxHooks";

interface ISurveyCardProps {
    onExit:  React.MouseEventHandler<HTMLButtonElement|HTMLAnchorElement>,
    onReport:  React.MouseEventHandler<HTMLButtonElement|HTMLAnchorElement>,
    surveyId: number,
    selectingAnswer: (value: ISetAnswer)=>void
}

export const SurveyCard:React.FC<ISurveyCardProps> = ({onExit, surveyId, selectingAnswer, onReport}) => {
    const topPanelContext = useContext(TopPanelContext);
    const survey = useAppSelector(state => state.surveys.surveys.find(item=>item.id===surveyId));
    const notFullFilled=():boolean|undefined=>survey?.items.some(item=>!item.selectedAnswer)
    useEffect(() => {
        const buttons = [<Button onClick={onExit}>ВЕРНУТЬСЯ К СПИСКУ ВОПРОСОВ</Button>]
        if (topPanelContext) topPanelContext.setButtons(buttons)
    }, []);
    return (
        <>
            {survey && <Row gutter={[0,10]} justify="center">
                <Col span={24} sm={20} md={18} lg={16} xxl={13} style={{marginBottom:30}}>
                    <Card title={survey.title}>
                        Выберите подходящий вариант
                    </Card>
                </Col>
                {survey.items.map(question =>
                    <Col span={24} sm={20} md={18} lg={16} xxl={13} key={question.id}>
                        <Card title={question.question}>
                            <Radio.Group onChange={(e)=>{
                                selectingAnswer({idSurvey: survey.id, idQuestion: question.id, idAnswer: e.target.value})
                            }} value={question.selectedAnswer}>
                                <Space direction="vertical">
                                    {question.answers.map(answer => <Radio key={answer.id}
                                                                           value={answer.id}>{answer.variant}</Radio>)}
                                </Space>
                            </Radio.Group>
                        </Card>
                    </Col>)}
                <Col span={24} sm={20} md={18} lg={16} xxl={13}>
                    <Button onClick={onReport} disabled={notFullFilled()} type="primary">Далее</Button>
                </Col>
            </Row>}
        </>
    )
}
