import mock from "./mock";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import {IGetLogin} from "../pages/LoginPage";

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
                    FIO:'Иванов Иван Иванович'
                },
                acl:
                    [
                        {
                            action: 'read',
                            subject: 'Surveys'
                        }
                    ]

            }
            return [200, resp]
        }
    )

mock.onGet(AjaxRoutes.LOGIN)
    .reply(() => {
            const resp = {
                data: {
                    FIO:'Иванов Иван Иванович'
                },
                acl:
                    [
                        {
                        action: 'read',
                        subject: 'Surveys'
                    }
                    ]

            }
            return [200, resp]
        }
    )

mock.onGet(AjaxRoutes.DATA_SURVEYS)
    .reply(() => {
            const resp = {
                data: {
                    surveys:[
                        { id:1,
                        title: 'Опрос по миокарду',
                        description: 'Краткое описание',
                        items: [
                            {
                                id:1,
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
                                id:2,
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
                        { id:2,
                        name: 'Опрос по миокарду 2',
                        description: 'Краткое описание 2',
                        items: [
                            {
                                id:1,
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
                                id:2,
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
