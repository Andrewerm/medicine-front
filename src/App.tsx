import {Routes, Route, useNavigate, useLocation} from "react-router-dom";
import {RegisterPage} from "./pages/RegisterPage";
import {NotFoundPage} from "./pages/NotFoundPage";
import {MainLayout} from "./layouts/MainLayout";
import {AuthLayout} from "./layouts/AuthLayout";
import {AppLayout} from "./layouts/AppLayout";
import {LoginPage} from "./pages/LoginPage";
import {SurveyPage} from "./pages/SurveyPage";
import {HospitalsPage} from "./pages/HospitalsPage";
import {UsersPage} from "./pages/UsersPage";
import {AbilityContext, Can} from "./hooks/Can"
import {useAbility} from "@casl/react";
import axios, {AxiosError} from "axios";
import {useContext, useEffect, useState} from "react";
import {AjaxRoutes} from "./models/ajaxRoutes";
import {Spinner} from "./components/Spinner";
import {createMongoAbility} from "@casl/ability";

type Actions = 'read' | 'update';
type Subjects = 'Login' | 'Register' | 'Hospitals' | 'Users' | 'Surveys';

interface ACLInterface {
    acl: {
        actions: Actions,
        subjects: Subjects
    },
    data: {}
}


export default function App() {
    // const [loading, setLoading] = useState(false);

    const ability = useContext(AbilityContext);
    const location=useLocation()
    const navigate=useNavigate()
    useEffect(() => {

        if (location.pathname!=='/auth/login' && ability.can('read','Login')){


            navigate('/auth/login', {replace:true })
        }
    }, []);


    console.log('App read login', ability.can('read', 'Login'));

    return (
        <>
            {/*<Can I='read' a='Login'>*/}
            {/*    <div>read login</div>*/}
            {/*</Can>*/}
             <Routes>
                <Route path="/" element={<AppLayout/>}>
                    {ability.can('read','Surveys')&&<Route path="" element={<MainLayout/>}>
                        {ability.can('read','Surveys')&&<Route index element={<SurveyPage/>}/>}
                        <Route path="hospitals" element={<HospitalsPage/>}/>
                        <Route path="users" element={<UsersPage/>}/>

                    </Route>}
                    <Route path="auth" element={<AuthLayout/>}>

                        {ability.can('read','Login')&&<Route path="login" element={<LoginPage/>}/>}
                        {ability.can('read','Login')&&<Route path="register" element={<RegisterPage/>}/>}
                    </Route>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>

            </Routes>
        </>
    )
}
