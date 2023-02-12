export type InputTypesInterface='hospital_selector'|'active_switcher'|'role_selector'

export interface IModel {
    field: string,
    label: string,
    hiddenInTable?: boolean,
    filterable?: boolean,
    rules: Array<any>,
    type?: InputTypesInterface,
    guideId?: GuidesEnum
}


export enum GuidesEnum {
    hospitals='hospitals',
    roles='roles'
}
