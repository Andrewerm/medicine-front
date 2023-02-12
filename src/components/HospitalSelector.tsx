import {FC, useEffect} from "react";
import {Select} from "antd";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {fetchHospitals} from "../app/hospitalSlice";
import {LoadingStatusesEnum} from "../types";

interface HospitalSelectorProps {
    value?: number,
    onChange?:()=>void
}

export const HospitalSelector:FC<HospitalSelectorProps>=({value, onChange})=>{
    const {status, hospitals} = useAppSelector(state => state.hospitals)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchHospitals())
    }, [dispatch])
    const selectorList=hospitals.map(item=>({value: item.id, label: item.name_short}))
    return <Select loading={status===LoadingStatusesEnum.loading}
                   showSearch
                   value={value}
                   onChange={onChange}
                   optionFilterProp="children"
                   filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.trim().toLowerCase())}
                   options={selectorList}/>
}
