import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store';
import App from './App';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import {AbilityContext} from './hooks/Can'
import {ability} from "./configs/acl/ability";
import './mock'
import 'antd/dist/reset.css';
import {App as AppAnt} from 'antd';

const container = document.getElementById('root')!;
const root = createRoot(container);


root.render(
    <Provider store={store}>
        <AbilityContext.Provider value={ability}>
            <AppAnt>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </AppAnt>
        </AbilityContext.Provider>
    </Provider>
);

