import { ADD_MESSAGE, REMOVE_MESSAGES, REMOVE_MESSAGE, GET_MESSAGES_ERROR, GET_MESSAGES_PENDING, GET_MESSAGES_SUCCESS } from './types'

const initialState = {
    messages: [],
    messagesPending: false
}

export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.payload
                ]
            }
        case REMOVE_MESSAGES:
            return {
                ...state,
                messages: state.messages.filter(el => {
                    if (el.from == action.payload || el.to == action.payload) {
                        return false
                    }
                    return true
                })
            }
        case REMOVE_MESSAGE:
            return {
                ...state,
                messages: state.messages.filter(el => el != action.payload)
            }
        case GET_MESSAGES_ERROR:
            console.log(1, action.payload)
            return {
                ...state,
                messagesPending: false
            }
        case GET_MESSAGES_SUCCESS:
            console.log(2, action.payload)
            return {
                ...state,
                messages: action.payload,
                messagesPending: false
            }
        case GET_MESSAGES_PENDING:
            console.log(3, action.payload)
            return {
                ...state,
                messagesPending: true
            }
        default:
            return state
    }
}