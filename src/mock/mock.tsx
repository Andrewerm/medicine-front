import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

axios.defaults.baseURL = 'https://91.201.53.108'
const mock = new MockAdapter(axios, { delayResponse: 500 })

export default mock
