import mock from "./mock";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import {IGetLogin} from "../pages/LoginPage";
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
                data: {
                    userData: {
                        FIO: 'Иванов Иван Иванович'
                    }
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
                data: {
                    userData: {
                        FIO: 'Иванов Иван Иванович'
                    }
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
                data: {
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
