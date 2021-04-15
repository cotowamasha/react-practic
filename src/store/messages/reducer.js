import { ADD_MESSAGE, REMOVE_MESSAGES, REMOVE_MESSAGE } from './types'

const initialState = {
    messages: [
        {
            from: 'YOU',
            value: 'Hello',
            to: 1
        },
        {
            from: 1,
            value: 'What\'s up?',
            to: 'YOU'
        },
        {
            from: 'YOU',
            value: 'Fine',
            to: 1
        },
        {
            from: 'YOU',
            value: 'Where my keys?',
            to: 2
        },
        {
            from: 2,
            value: 'I took them.',
            to: 'YOU'
        },
        {
            from: 3,
            value: 'Will you come in my party tonight?',
            to: 'YOU'
        },
        {
            from: 'YOU',
            value: 'Yes, of course. But I\'ll be later.',
            to: 3
        }
    ]
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
        default:
            return state
    }
}