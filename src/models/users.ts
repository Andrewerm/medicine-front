import {GuidesEnum, IModel} from "./types";

export const usersModel:Array<IModel>=[
    {
        field: 'first_name',
        label: 'Имя',
        filterable:true,
        rules: [{ required: true, message: 'Обязательное поле' }]
    },
    {
        field: 'last_name',
        label: 'Фамилия',
        filterable:true,
        rules: [{ required: true, message: 'Обязательное поле' }]
    },
    {
        field: 'phone',
        label: 'Телефон',
        filterable:true,
        rules: [{ required: true, message: 'Обязательное поле' }]
    },
    {
        field: 'hospital_id',
        label: 'Больница',
        type: 'selector',
        guideId: GuidesEnum.hospitals,
        filterable:true,
        rules: [{ required: true, message: 'Обязательное поле' }]
    },
    {
        field: 'position',
        label: 'Должность',
        filterable:true,
        rules: [{ required: true, message: 'Обязательное поле' }]
    }
]
