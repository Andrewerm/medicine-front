import {IModel} from "./types";

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
        field: 'is_active',
        label: 'Активный',
        type: 'switcher',
        rules: []
    },
    {
        field: 'hospital_id',
        label: 'Больница',
        type: 'selector',
        // guideId: GuidesEnum.hospitals,
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
