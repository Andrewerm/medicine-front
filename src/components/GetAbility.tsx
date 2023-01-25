import React, {useContext, useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import {AbilityContext, ACLInterface} from "../hooks/Can";

interface GotAbilityPropsInterface {
    children: React.ReactNode,
}

interface IGetACL {
    acl: ACLInterface
}

const Spinner = () => <div>Спиннер</div>

export function GetAbility({children}: GotAbilityPropsInterface) {
    const ability = useContext(AbilityContext);
    const [gotAbility, setGotAbility] = useState(false);
    useEffect(() => {
        axios.get<IGetACL>(AjaxRoutes.ACL)
            .then(response => {
                ability.update(response.data.acl)
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
