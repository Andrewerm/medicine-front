export interface ISurvey {
    id: number;
    title: string;
    description: string;
    questions: ISurveyItem[];
    report?: {
        textReport:string,
        fileLink:string
    }
}

export interface IUserWithoutID {
    first_name: string,
    middle_name: string,
    last_name: string,
    role_id: string,
    phone: string,
    email: string,
    is_active: boolean,
    hospital_id: number,
    [key:string]:string|number|boolean
}

export interface IUser extends IUserWithoutID{
    id: number;
}

export interface IHospitalWithoutID {
    address: string;
    email: string;
    name_full: string;
    name_short: string;
    phone: string;
    [key:string]:string|number
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
    failed = 'failed',
    done='done'
}

// export interface IGetReport {
//     data: {
//         textReport: string
//     }
// }
export interface IHospitalPost {
        hospital_id: number
}

export interface IUserPost {
    user_id: number
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
    textReport: string,
    fileLink: string
}

export interface IGetReportRawResponse {
    appointment: string
    docx_url: string
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
    SURVEYS = 'surveys',
    ANALITYCS='analytics'
}



export interface Variant {
    id: number;
    name_full: string;
    name_short: string;
    hospital_id?: number;
}

export interface Parametrer {
    id: string;
    name: string;
    type: string;
    variants: Variant[];
    value: Array<String>|string|undefined,
}

export interface IAnalytic {
    description: string;
    id: string;
    parametrers: Parametrer[];
    title: string;
    fileReportStatus: LoadingStatusesEnum
    fileReport:Blob
}

export interface IAnalytics {
    analytics: IAnalytic[];
}

export enum ReportInputTypesEnum {
    list='list',
    timestamp='timestamp'
}


export interface ExecuteReportParamsInterface{
    id: string;
    parameters?: Array<{id: string, value?: Array<String>|string}>;
}
