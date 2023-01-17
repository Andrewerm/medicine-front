import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store';
import App from './App';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import {AbilityContext, initialAbility} from './hooks/Can'


const container = document.getElementById('root')!;
const root = createRoot(container);



root.render(
    <Provider store={store}>
        <AbilityContext.Provider value={initialAbility}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AbilityContext.Provider>
    </Provider>
);

