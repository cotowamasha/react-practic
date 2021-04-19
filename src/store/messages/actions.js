import { ADD_MESSAGE, REMOVE_MESSAGES, REMOVE_MESSAGE } from './types'

export const addMessage = (message) => {
    return {
        type: ADD_MESSAGE,
        payload: message
    }
}

export const removeMessages = (uid) => {
    return {
        type: REMOVE_MESSAGES,
        payload: uid
    }
}

export const removeMessage = (message) => {
    return {
        type: REMOVE_MESSAGE,
        payload: message
    }
}