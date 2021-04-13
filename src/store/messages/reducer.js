import { ADD_MESSAGE } from './types'

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
        default:
            return state
    }
}