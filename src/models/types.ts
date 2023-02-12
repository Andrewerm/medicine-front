export type InputTypesInterface='selector'|'switcher'

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
