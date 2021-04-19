import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { counterReducer } from './counter'
import { messagesReducer } from './messages'
import { chatsReducer } from './chats'
import { botSendMessge } from './middlewares'
import { persistReducer, persistStore  } from 'redux-persist'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import storage from 'redux-persist/lib/storage'

export const history = createBrowserHistory()

const reducers = combineReducers({ 
    router: connectRouter(history),
    counterReducer, 
    messagesReducer, 
    chatsReducer })

const config = {
    key: 'root',
    blackList: [],
    whiteList: [],
    storage
}

export const store = createStore(
    persistReducer(config, reducers),
    compose(
        applyMiddleware(botSendMessge),
        // routerMiddleware(history),
        window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : () => {}
    )
)

export const persistor = persistStore(store)