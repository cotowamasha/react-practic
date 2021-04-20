import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Router } from '@router'
import { Provider } from 'react-redux'
import { store, persistor } from '@store'
// import { store, persistor, history } from '@store'
import { PersistGate } from 'redux-persist/integration/react'
import '@app/styles/index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <Provider store={store} >
        <PersistGate persistor={persistor} >
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </PersistGate>
    </Provider>
    ,
    document.querySelector('#root')
)