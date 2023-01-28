import {Card, Divider, Button} from "antd";

interface IPropsSurveyCardCover {
    title: string,
    description: string,
    onEnter: ()=>void
}

export const SurveyCardCover = ({title, description, onEnter}:IPropsSurveyCardCover) => {
  return (
      <Card title={title}>
          {description}
          <Divider/>
          <Button onClick={onEnter} type="primary">Пройти</Button>
      </Card>
  )
}
