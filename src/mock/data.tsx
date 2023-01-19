import mock from "./mock";

mock.onGet('/acl')
    .reply(() => {
            const resp = {
                data: {},
                acl: {
                    'Login': 'read'
                }
            }
            return [200, resp]
        }
    )
