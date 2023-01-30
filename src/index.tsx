import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store';
import {App} from './App';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import {AbilityContext} from './hooks/Can'

import './mock'
import 'antd/dist/reset.css';
import {App as AppAnt, ConfigProvider} from 'antd';
import {GetAbility} from "./components/GetAbility";
import {createMongoAbility} from "@casl/ability";
import {antCustoms} from "./configs/antCustoms";

const container = document.getElementById('root')!;
const root = createRoot(container);


root.render(
    <Provider store={store}>
        <AbilityContext.Provider value={createMongoAbility([])}>
            <AppAnt>
                <ConfigProvider theme={antCustoms}>
                    <GetAbility>
                        <BrowserRouter>
                            <App/>
                        </BrowserRouter>
                    </GetAbility>
                </ConfigProvider>
            </AppAnt>
        </AbilityContext.Provider>
    </Provider>
);

