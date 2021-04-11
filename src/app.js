import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import { Router } from '@router'

import '@app/styles/index.css'

ReactDOM.render(
    <BrowserRouter>
        <Router />
    </BrowserRouter>
    ,
    document.querySelector('#root')
)