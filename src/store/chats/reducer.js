import { ADD_CHAT, REMOVE_CHAT, GET_CHATS_PENDING, GET_CHATS_SUCCESS, GET_CHATS_ERROR } from './types'


const initialState = {
    chats: [],
    contacts: ['Ali Connors', 'Alex', 'Sandra Adams', 'Maria Kotova', 'Tatyana', 'Mr Zotov', 'Boss'],
    chatsPending: true
}

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHAT:
            return {
                ...state,
                chats: [
                    ...state.chats,
                    {
                        name: action.payload,
                        uid: state.chats[state.chats.length - 1]['uid'] + 1
                    }
                ]
            }
        case REMOVE_CHAT:
            return {
                ...state,
                chats: state.chats.filter(el => el.uid != action.payload)
            }
        case GET_CHATS_PENDING: 
            return {
                ...state,
                chatsPending: true
            }
        case GET_CHATS_SUCCESS:
            return {
                ...state,
                chats: action.payload,
                chatsPending: false
            }
        case GET_CHATS_ERROR:
            return {
                ...state,
                chatsPending: false
            }
        default:
            return state
    }
}