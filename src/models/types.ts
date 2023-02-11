
export interface IModel {
    field: string,
    label: string,
    hiddenInTable?: boolean,
    filterable?: boolean,
    rules: Array<any>,
    type?: 'selector',
    guideId?: GuidesEnum
}


export enum GuidesEnum {
    hospitals='hospitals',
    roles='roles'
}
