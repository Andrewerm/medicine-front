import React from "react";
import {Spin} from "antd";

export const Spinner:React.FC=()=>{
    return <Spin style={{minHeight: '100vh'}}>
        Загрузка данных...
    </Spin>
}
