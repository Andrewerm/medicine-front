export interface ISurvey {
    id: number;
    title: string;
    description: string;
    items: ISurveyItem[];
    report?:string
}

export interface IUser {
    id: number,
    FIO: string,
    phone: string,
    email: string,
    idHospitals: number
}

export interface IGetDataSurveys {
    data: {
        surveys: Array<ISurvey>
    }
}

export interface IGetDataUsers {
    data: {
        users: Array<IUser>
    }
}

export interface IGetReport {
    data: {
        textReport: string
    }
}

export interface IUserProfile {
    FIO: string|null
}

export interface ISurveyItem {
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

export enum ACLEntityEnum {
    AUTH='Auth',
    HOSPITALS='Hospitals',
    USERS='Users',
    SURVEYS='Surveys'

}
