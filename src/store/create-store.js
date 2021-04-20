// import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { counterReducer } from './counter'
import { messagesReducer } from './messages'
import { chatsReducer } from './chats'
import { botSendMessge } from './middlewares'
import { persistReducer, persistStore  } from 'redux-persist'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'

// export const history = createBrowserHistory()

const reducers = combineReducers({ 
    // router: connectRouter(history),
    counterReducer, 
    messagesReducer, 
    chatsReducer
})

const config = {
    key: 'root',
    blackList: [],
    whiteList: [],
    storage
}

export const store = createStore(
    persistReducer(config, reducers),
    compose(
        // applyMiddleware(routerMiddleware(history), botSendMessge),
        applyMiddleware(thunk, botSendMessge),
        window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : () => {}
    )
)

export const persistor = persistStore(store)