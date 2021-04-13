import { ADD_MESSAGE } from './types'

export const addMessage = (message) => {
    return {
        type: ADD_MESSAGE,
        payload: {
            from: message.from,
            value: message.value,
            to: message.to
        }
    }
}