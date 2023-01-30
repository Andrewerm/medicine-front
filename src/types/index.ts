export interface ISurvey {
    id: number;
    title: string;
    description: string;
    items: Item[];
    report?:string
}
export interface IGetDataSurveys {
    data: {
        surveys: Array<ISurvey>
    }
}

export interface IGetReport {
    data: {
        textReport: string
    }

}


export interface Item {
    id: number;
    question: string;
    answers: Answer[];
    selectedAnswer?: number,
}

export interface IGetReportRequest {
    idSurvey: number,
    items:Array<{ idQuestion: number, idAnswer?: number }>
}

export interface IGetReportResponse{
    idSurvey:number,
    textReport:string
}

export interface Answer {
    id: number;
    variant: string;
}

export interface ISetAnswer {
    idSurvey: number,
    idQuestion: number,
    idAnswer: number
}
