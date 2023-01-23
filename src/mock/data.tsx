import mock from "./mock";

mock.onGet('/acl')
    .reply(() => {
            const resp = {
                data: {},
                acl:
                    [{
                        action: 'read',
                        subject: 'Auth'
                    }
                    ]

            }
            return [200, resp]
        }
    )
