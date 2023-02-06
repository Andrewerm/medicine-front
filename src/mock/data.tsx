import mock from "./mock";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import {ACLEntityEnum} from "../types";

// mock.onGet(AjaxRoutes.ACL)
//     .reply(() => {
//             const resp = {
//                 data: {},
//                 acl:
//                     [
//                         {
//                         action: 'read',
//                         subject: 'Auth'
//                     }
//                     ]
//
//             }
//             return [200, resp]
//         }
//     )

mock.onGet(AjaxRoutes.ACL)
    .reply(() => {
            const resp = {
                user_data: {
                    "email": "a.m.vinokurov@gmail.com",
                    "first_name": "Аркадий",
                    "hospital_id": "1",
                    "last_name": "Винокуров",
                    "middle_name": "Михайлович",
                    "phone": "79175083798",
                    "position": "Разработчик"
                },
                acl:
                    [
                        {
                            action: 'read',
                            subject: ACLEntityEnum.SURVEYS
                        },
                        {
                            action: 'update',
                            subject: ACLEntityEnum.HOSPITALS
                        },
                        {
                            action: 'update',
                            subject: ACLEntityEnum.USERS
                        },
                    ]
            }
            return [200, resp]
        }
    )

mock.onGet(AjaxRoutes.LOGIN)
    .reply(() => {
            const resp = {
                user_data: {
                    "email": "a.m.vinokurov@gmail.com",
                    "first_name": "Аркадий",
                    "hospital_id": "1",
                    "last_name": "Винокуров",
                    "middle_name": "Михайлович",
                    "phone": "79175083798",
                    "position": "Разработчик"
                },
                acl:
                    [
                        {
                            action: 'read',
                            subject: ACLEntityEnum.SURVEYS
                        },
                        {
                            action: 'update',
                            subject: ACLEntityEnum.HOSPITALS
                        },
                        {
                            action: 'update',
                            subject: ACLEntityEnum.USERS
                        },
                    ]

            }
            return [200, resp]
        }
    )

mock.onGet(AjaxRoutes.GET_SURVEYS)
    .reply(() => {
            const resp = {
                    surveys: [
                        {
                            id: 1,
                            title: 'Опрос по миокарду',
                            description: 'Краткое описание',
                            items: [
                                {
                                    id: 1,
                                    question: 'Укажите частоту сердечных сокращений (в мин)',
                                    answers: [
                                        {
                                            id: 1,
                                            variant: '<70 в мин'
                                        },
                                        {
                                            id: 2,
                                            variant: '70-90 в мин'
                                        },
                                    ]
                                },
                                {
                                    id: 2,
                                    question: 'Наличие хронической сердечной недостаточности с фракций выброса левого желудочка менее 40%?',
                                    answers: [
                                        {
                                            id: 1,
                                            variant: 'Да'
                                        },
                                        {
                                            id: 2,
                                            variant: 'Нет'
                                        },
                                    ]
                                },
                                {
                                    id: 3,
                                    question: 'Наличие хронической сердечной недостаточности с фракций выброса левого желудочка менее 40%?',
                                    answers: [
                                        {
                                            id: 1,
                                            variant: 'Да'
                                        },
                                        {
                                            id: 2,
                                            variant: 'Нет'
                                        },
                                    ]
                                },
                                {
                                    id: 4,
                                    question: 'Наличие хронической сердечной недостаточности с фракций выброса левого желудочка менее 40%?',
                                    answers: [
                                        {
                                            id: 1,
                                            variant: 'Да'
                                        },
                                        {
                                            id: 2,
                                            variant: 'Нет'
                                        },
                                    ]
                                },
                                {
                                    id: 5,
                                    question: 'Наличие хронической сердечной недостаточности с фракций выброса левого желудочка менее 40%?',
                                    answers: [
                                        {
                                            id: 1,
                                            variant: 'Да'
                                        },
                                        {
                                            id: 2,
                                            variant: 'Нет'
                                        },
                                    ]
                                },
                                {
                                    id: 6,
                                    question: 'Наличие хронической сердечной недостаточности с фракций выброса левого желудочка менее 40%?',
                                    answers: [
                                        {
                                            id: 1,
                                            variant: 'Да'
                                        },
                                        {
                                            id: 2,
                                            variant: 'Нет'
                                        },
                                    ]
                                },
                                {
                                    id: 7,
                                    question: 'Наличие хронической сердечной недостаточности с фракций выброса левого желудочка менее 40%?',
                                    answers: [
                                        {
                                            id: 1,
                                            variant: 'Да'
                                        },
                                        {
                                            id: 2,
                                            variant: 'Нет'
                                        },
                                    ]
                                },
                            ]

                        },
                        {
                            id: 2,
                            title: 'Опрос по миокарду 2',
                            description: 'Краткое описание 2',
                            items: [
                                {
                                    id: 1,
                                    question: 'Укажите частоту сердечных сокращений (в мин)',
                                    answers: [
                                        {
                                            id: 1,
                                            variant: '<70 в мин'
                                        },
                                        {
                                            id: 2,
                                            variant: '70-90 в мин'
                                        },
                                    ]
                                },
                                {
                                    id: 2,
                                    question: 'Наличие хронической сердечной недостаточности с фракций выброса левого желудочка менее 40%?',
                                    answers: [
                                        {
                                            id: 1,
                                            variant: 'Да'
                                        },
                                        {
                                            id: 2,
                                            variant: 'Нет'
                                        },
                                    ]
                                },
                            ]

                        },
                        {
                            id: 3,
                            title: 'Опрос по миокарду 3',
                            description: 'Краткое описание 2',
                            items: [
                                {
                                    id: 1,
                                    question: 'Укажите частоту сердечных сокращений (в мин)',
                                    answers: [
                                        {
                                            id: 1,
                                            variant: '<70 в мин'
                                        },
                                        {
                                            id: 2,
                                            variant: '70-90 в мин'
                                        },
                                    ]
                                },
                                {
                                    id: 2,
                                    question: 'Наличие хронической сердечной недостаточности с фракций выброса левого желудочка менее 40%?',
                                    answers: [
                                        {
                                            id: 1,
                                            variant: 'Да'
                                        },
                                        {
                                            id: 2,
                                            variant: 'Нет'
                                        },
                                    ]
                                },
                            ]

                        },
                        {
                            id: 4,
                            title: 'Опрос по миокарду 3',
                            description: 'Краткое описание 2',
                            items: [
                                {
                                    id: 1,
                                    question: 'Укажите частоту сердечных сокращений (в мин)',
                                    answers: [
                                        {
                                            id: 1,
                                            variant: '<70 в мин'
                                        },
                                        {
                                            id: 2,
                                            variant: '70-90 в мин'
                                        },
                                    ]
                                },
                                {
                                    id: 2,
                                    question: 'Наличие хронической сердечной недостаточности с фракций выброса левого желудочка менее 40%?',
                                    answers: [
                                        {
                                            id: 1,
                                            variant: 'Да'
                                        },
                                        {
                                            id: 2,
                                            variant: 'Нет'
                                        },
                                    ]
                                },
                            ]

                        },
                        {
                            id: 5,
                            title: 'Опрос по миокарду 5',
                            description: 'Краткое описание 2',
                            items: [
                                {
                                    id: 1,
                                    question: 'Укажите частоту сердечных сокращений (в мин)',
                                    answers: [
                                        {
                                            id: 1,
                                            variant: '<70 в мин'
                                        },
                                        {
                                            id: 2,
                                            variant: '70-90 в мин'
                                        },
                                    ]
                                },
                                {
                                    id: 2,
                                    question: 'Наличие хронической сердечной недостаточности с фракций выброса левого желудочка менее 40%?',
                                    answers: [
                                        {
                                            id: 1,
                                            variant: 'Да'
                                        },
                                        {
                                            id: 2,
                                            variant: 'Нет'
                                        },
                                    ]
                                },
                            ]

                        },
                    ]
                }
            return [200, resp]
        }
    )

mock.onPost(AjaxRoutes.GET_REPORT)
    .reply((params) => {
        const resp = {
            data: {
                textReport: 'текст отчета'
            }
        }
        console.log('запрос на отчёт', params);
        return [200, resp]

    })


mock.onDelete(AjaxRoutes.LOGOUT)
    .reply(() => {
        const resp = {
            data: {},
            acl:
                [
                    {
                        action: 'read',
                        subject: ACLEntityEnum.AUTH
                    }
                ]

        }
        return [200, resp]
    })


mock.onGet(AjaxRoutes.GET_USERS)
    .reply(() => {
        const resp = {
                users: [
                    {
                        "email": "a.m.vinokurov@gmail.com",
                        "first_name": "Аркадий",
                        "hospital_id": "1",
                        "last_name": "Винокуров",
                        "middle_name": "Михайлович",
                        "phone": "79175083798",
                        "position": "Разработчик"
                    }
                ]
            }

        return [200, resp]
    })


mock.onGet(AjaxRoutes.GET_HOSPITALS)
    .reply(() => {
        const resp = {
            hospitals: [
                {
                    "address": "617560, край Пермский, р-н Суксунский, рп Суксун, ул Зеленая, д 36",
                    "email": "skncrb@lpu.perm.ru",
                    "id": 1,
                    "name_full": "ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ УЧРЕЖДЕНИЕ ЗДРАВООХРАНЕНИЯ ПЕРМСКОГО КРАЯ \"СУКСУНСКАЯ ЦЕНТРАЛЬНАЯ РАЙОННАЯ БОЛЬНИЦА\"",
                    "name_short": "ГБУЗ ПК \"СУКСУНСКАЯ ЦРБ\"",
                    "phone": "+73427531876"
                },
                {
                    "address": "618120, край Пермский, р-н Осинский, г Оса, ул Мелентьева, д 1",
                    "email": "osacrb@lpu.perm.ru",
                    "id": 2,
                    "name_full": "ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ УЧРЕЖДЕНИЕ ЗДРАВООХРАНЕНИЯ ПЕРМСКОГО КРАЯ \"ОСИНСКАЯ ЦЕНТРАЛЬНАЯ РАЙОННАЯ БОЛЬНИЦА\"",
                    "name_short": "ГБУЗ ПК \"ОСИНСКАЯ ЦРБ\"",
                    "phone": "+73429144555"
                },
                {
                    "address": "618900, край Пермский, г Лысьва, пр-кт Победы, д 48",
                    "email": "LSVCAD@LPU.PERM.RU",
                    "id": 4,
                    "name_full": "ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"ДИАСАН\"",
                    "name_short": "ООО \"ДИАСАН\"",
                    "phone": "+79053594921"
                },
            ]
        }

        return [200, resp]
    })
