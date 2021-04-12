import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import { Router } from '@router'
import { Provider } from 'react-redux'
import { store } from './store'
import '@app/styles/index.css'

ReactDOM.render(
    <Provider store={store} >
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </Provider>
    ,
    document.querySelector('#root')
)