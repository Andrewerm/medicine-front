import {IModel} from "./types";

export const hospitalsModel:Array<IModel>=[
    {
        field: 'name_full',
        label: 'Полное имя',
        hiddenInTable:true,
        rules: [{ required: true, message: 'Обязательное поле' }]
    },
    {
        field: 'name_short',
        label: 'Короткое имя',
        rules: [{ required: true, message: 'Обязательное поле' }]
    },
    {
        field: 'address',
        label: 'Адрес',
        rules: [{ required: true, message: 'Обязательное поле' }]
    },
    {
        field: 'email',
        label: 'Емайл',
        rules: [{ required: true, message: 'Обязательное поле' }]
    },
    {
        field: 'phone',
        label: 'Телефон',
        rules: [{ required: true, message: 'Обязательное поле' }]
    },
]
