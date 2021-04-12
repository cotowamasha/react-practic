import { ADD_CHAT } from './types'

const initialState = {
    chats: [
        {
            uid: 1,
            name: 'Ali Connors'
        },
        {
            uid: 2,
            name: 'Alex'
        },
        {
            uid: 3,
            name: 'Sandra Adams'
        }
    ],
    contacts: ['Ali Connors', 'Alex', 'Sandra Adams', 'Maria Kotova', 'Tatyana', 'Mr Zotov', 'Boss']
}

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHAT:
            return [
                ...state, 
                {
                    name: action.payload,
                    uid: state.chats[state.chats.length - 1]['uid'] + 1
                }
            ]
        default:
            return state
    }
}