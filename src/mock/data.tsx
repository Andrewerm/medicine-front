import mock from "./mock";

mock.onGet('/acl')
    .reply(() => {
            const resp = {
                data: {},
                acl: [{
                    action: 'read',
                    subject: 'Register'
                }, {
                    action: 'read',
                    subject: 'Login'
                },
                    {
                        action: 'read',
                        subject: 'Surveys'
                    }]

            }
            return [200, resp]
        }
    )
