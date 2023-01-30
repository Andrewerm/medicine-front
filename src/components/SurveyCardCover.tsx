import {Card, Divider, Button} from "antd";
import React from "react";

interface IPropsSurveyCardCover {
    title: string,
    description: string,
    onEnter: ()=>void
}

export const SurveyCardCover:React.FC<IPropsSurveyCardCover> = ({title, description, onEnter}) => {
  return (
      <Card title={title}>
          {description}
          <Divider/>
          <Button onClick={onEnter} type="primary">Пройти</Button>
      </Card>
  )
}
