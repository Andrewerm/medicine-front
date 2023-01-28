import {ISurvey} from "../types";
import {useContext, useEffect} from "react";
import {TopPanelContext} from "../hooks/topPanel";
import {Button} from "antd";

interface ISurveyCardProps {
    onExit:()=>void,
    survey: ISurvey
}

export const SurveyCard = ({onExit}:ISurveyCardProps) => {

    const topPanelContext= useContext(TopPanelContext);
    useEffect(() => {
        const buttons=[<Button onClick={()=>{console.log('тестим')}}>кнопка 1</Button>,
            <Button onClick={onExit}>кнопка 2</Button>
        ]
        if (topPanelContext) topPanelContext.setButtons(buttons)
    }, []);

  return (
      <>
        <div>опрос</div>
      </>
  )
}
