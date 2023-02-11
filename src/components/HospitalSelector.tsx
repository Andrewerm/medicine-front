import {FC, useEffect, useState} from "react";
import {Select} from "antd";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {fetchHospitals} from "../app/hospitalSlice";
import {LoadingStatusesEnum} from "../types";

export const HospitalSelector:FC=()=>{
    const {status, hospitals, edit_status, error_message, delete_status} = useAppSelector(state => state.hospitals)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchHospitals())
    }, [dispatch])
    const selectorList=hospitals.map(item=>({value: item.id, label: item.name_short}))
    return <Select loading={status===LoadingStatusesEnum.loading}
                   showSearch
                   optionFilterProp="children"
                   filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.trim().toLowerCase())}
                   options={selectorList}/>
}
