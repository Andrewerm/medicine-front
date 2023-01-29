import React from "react";
import {Spin} from "antd";

export function Spinner() {

    return( <Spin style={{minHeight: '100vh'}}>
        Загрузка данных...
    </Spin>)
}
