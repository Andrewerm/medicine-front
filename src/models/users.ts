import {IModel} from "./types";

export const usersModel:Array<IModel>=[
    {
        field: 'first_name',
        label: 'Имя',
        rules: [{ required: true, message: 'Обязательное поле' }]
    },
    {
        field: 'last_name',
        label: 'Фамилия',
        rules: [{ required: true, message: 'Обязательное поле' }]
    },
    {
        field: 'phone',
        label: 'Телефон',
        rules: [{ required: true, message: 'Обязательное поле' }]
    },
    {
        field: 'position',
        label: 'Должность',
        rules: [{ required: true, message: 'Обязательное поле' }]
    }
]
