import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Router } from '@router'
import { Provider } from 'react-redux'
import { store, persistor, history } from '@store'
import { PersistGate } from 'redux-persist/integration/react'
import '@app/styles/index.css'

ReactDOM.render(
    <Provider store={store} >
        <PersistGate persistor={persistor} >
            <ConnectedRouter history={history}>
                <Router />
            </ConnectedRouter>
        </PersistGate>
    </Provider>
    ,
    document.querySelector('#root')
)