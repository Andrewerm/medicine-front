import mock from "./mock";
import './data'


mock.onAny().passThrough()
mock.restore()
