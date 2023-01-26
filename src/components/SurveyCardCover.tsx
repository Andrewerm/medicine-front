import {Card} from "antd";

interface IPropsSurveyCardCover {
    title: string,
    description: string
}

export const SurveyCardCover = ({title, description}:IPropsSurveyCardCover) => {
  return (
      <Card title={title}>
          {description}
      </Card>
  )
}
