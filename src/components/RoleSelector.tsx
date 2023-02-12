import {FC} from "react";
import {Select} from "antd";

interface RoleSelectorProps {
    value?: number,
    onChange?:()=>void
}

export const RoleSelector:FC<RoleSelectorProps>=({value, onChange})=>{

    const selectorList=[{ value: "1", label: 'Админ'},
        { value: "2", label: 'Медработник'}
    ]
    return <Select
                   value={value}
                   onChange={onChange}
                   options={selectorList}/>
}
