export interface ISurvey {
    id: number;
    title: string;
    description: string;
    questions: ISurveyItem[];
    report?: string
}

export interface IUser {
    id: number,
    FIO: string,
    phone: string,
    email: string,
    idHospitals: number
}

export interface IHospitalWithoutID {
    address: string;
    email: string;
    name_full: string;
    name_short: string;
    phone: string;
}

export interface IHospital extends IHospitalWithoutID{
    id: number;
}

export interface IGetDataSurveys {
    surveys: Array<ISurvey>
}

export interface IGetDataHospitals {
    hospitals: Array<IHospital>
}

export interface IGetDataUsers {
    items: Array<IUser>
}

export enum LoadingStatusesEnum {
    idle = 'idle',
    loading = 'loading',
    failed = 'failed'
}

export interface IGetReport {
    data: {
        textReport: string
    }
}
export interface IModelPost {
    data:{
        id: number
    }
}



export interface IUserProfile {
    email: string,
    first_name: string,
    hospital_id: string,
    last_name: string,
    middle_name: string,
    phone: string,
    position: string
}

export interface ISurveyItem {
    id: number;
    question: string;
    items: Answer[];
    selectedAnswer?: number,
}

export interface IGetReportRequest {
    id: number,
    answers: Array<{ id: number, variant?: number }>
}

export interface IGetReportResponse {
    idSurvey: number,
    textReport: string
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
    AUTH = 'auth',
    HOSPITALS = 'hospitals',
    USERS = 'users',
    SURVEYS = 'surveys'

}
