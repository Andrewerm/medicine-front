import React, {useContext, useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import {AbilityContext} from "../hooks/Can";
import {Spinner} from "./Spinner";
import {ProfileDataContext} from "../hooks/ProfileData";
import {IGetLogin} from "../pages/LoginPage";

interface GotAbilityPropsInterface {
    children: React.ReactNode,
}

export const GetAbility:React.FC<GotAbilityPropsInterface>=({children} )=>{
    const ability = useContext(AbilityContext);
    const [gotAbility, setGotAbility] = useState(false);
    const {setDataUser} = useContext(ProfileDataContext);
    useEffect(() => {
        axios.get<IGetLogin>(AjaxRoutes.ACL)
            .then(response => {
                ability.update(response.data.acl)
                setDataUser(response.data.data.userData)
                setGotAbility(true)
            })
            .catch((err: AxiosError) => {
                console.error(err)
            })

    }, []);
    return <>
        {gotAbility ? children : <Spinner/>}
    </>
}
