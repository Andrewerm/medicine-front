import {IModel} from "./types";

export const usersModel:Array<IModel>=[
    {
        field: 'name',
        label: 'Пользователь',
        rules: [{ required: true, message: 'Обязательное поле' }]
    },
    {
        field: 'contacts',
        label: 'Контактные данные',
        rules: [{ required: true, message: 'Обязательное поле' }]
    }
]
