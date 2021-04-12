import { createStore, combineReducers } from 'redux'
import { counterReducer } from './counter'
import { messagesReducer } from './messages'
import { chatsReducer } from './chats'

const reducers = combineReducers({ counterReducer, messagesReducer, chatsReducer })

export const store = createStore(reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : () => {}
)