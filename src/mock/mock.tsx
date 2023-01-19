import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// axios.defaults.baseURL = 'https://sklad.begmenov.org/api'
const mock = new MockAdapter(axios, { delayResponse: 1000 })

export default mock
