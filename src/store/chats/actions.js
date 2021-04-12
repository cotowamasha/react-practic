import { ADD_CHAT } from './types'

export const addChat = (contact) => {
    return {
        type: ADD_CHAT,
        payload: contact
    }
}