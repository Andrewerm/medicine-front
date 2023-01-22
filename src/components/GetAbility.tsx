import React, {useContext, useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {AjaxRoutes} from "../models/ajaxRoutes";
import {AbilityContext} from "../hooks/Can";
import {AbilityBuilder, createMongoAbility} from "@casl/ability";

interface GotAbilityPropsInterface {
    children: React.ReactNode,
}

const Spinner = () => <div>Спиннер</div>

export function GetAbility({children}: GotAbilityPropsInterface) {
    const ability = useContext(AbilityContext);
    const [gotAbility, setGotAbility] = useState(false);
    useEffect(() => {
        axios.get(AjaxRoutes.ACL)
            .then(response => {
                console.log('response', response);
                // const {can, rules} = new AbilityBuilder(createMongoAbility)
                const rules=createMongoAbility(response.data.acl)
                // can('read', 'Login')
                // can('read', 'Register')
                ability.update(rules)
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
