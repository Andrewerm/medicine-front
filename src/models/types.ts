export interface IModel {
    field: string,
    label: string,
    hiddenInTable?: boolean,
    filterable?: boolean,
    rules: Array<any>
}
