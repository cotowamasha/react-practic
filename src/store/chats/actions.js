import { ADD_CHAT, REMOVE_CHAT } from './types'

export const addChat = (contact) => {
    return {
        type: ADD_CHAT,
        payload: contact
    }
}

export const removeChat = (uid) => {
    return {
        type: REMOVE_CHAT,
        payload: uid
    }
}