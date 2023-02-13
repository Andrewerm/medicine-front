import {Switch} from "antd";
import {FC} from "react";

interface ActiveSwitcherProps {
    value?: boolean,
    onChange?:()=>void
}

export const ActiveSwitcher:FC<ActiveSwitcherProps>=({value, onChange})=>{
    return <Switch
        checked={value}
        onChange={onChange}/>
}
