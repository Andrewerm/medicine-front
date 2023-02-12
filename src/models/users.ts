import {IModel} from "./types";

export const usersModel:Array<IModel>=[

    {
        field: 'email',
        label: 'Email',
        filterable:true,
        rules: [{ required: true, type: 'email' , message: 'Email обязательное поле' }]
    },
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
    },{
        field: 'middle_name',
        label: 'Отчество',
        filterable:true,
        rules: []
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
        type: 'active_switcher',
        rules: []
    },
    {
        field: 'hospital_id',
        label: 'Больница',
        type: 'hospital_selector',
        // guideId: GuidesEnum.hospitals,
        filterable:true,
        rules: [{ required: true, message: 'Обязательное поле' }]
    },
    {
        field: 'position',
        label: 'Должность',
        filterable:true,
        rules: [{ required: true, message: 'Обязательное поле' }]
    },
    {
        field: 'role_id',
        label: 'Роль',
        type: 'role_selector',
        rules: [{ required: true, message: 'Обязательное поле' }]
    }
]
