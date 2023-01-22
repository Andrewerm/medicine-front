import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store';
import App from './App';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import {AbilityContext} from './hooks/Can'

import './mock'
import 'antd/dist/reset.css';
import {App as AppAnt} from 'antd';
import {GetAbility} from "./components/GetAbility";
import {createMongoAbility} from "@casl/ability";

const container = document.getElementById('root')!;
const root = createRoot(container);

// define abilities
// const defineAbility=()=>{
//     const {can, cannot, build}=new AbilityBuilder(createMongoAbility)
//     can('read','Posts')
//     cannot('update','BlaBla')
//     return build()
// }

// console.log('defineAbility',defineAbility());
//  console.log('initialAbility read login',initialAbility.can('read','Login'))
//  console.log('initialAbility read Register',initialAbility.can('read','Register'))
//  console.log('initialAbility update login',initialAbility.can('update','Login'))
//  console.log('initialAbility full',initialAbility)
root.render(
    <Provider store={store}>
        <AbilityContext.Provider value={createMongoAbility([
        //     {
        //     action: 'read',
        //     subject: 'Login'
        // }
        ])}>
            <AppAnt>
                <GetAbility>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </GetAbility>
            </AppAnt>
        </AbilityContext.Provider>
    </Provider>
);

