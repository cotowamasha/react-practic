import { request } from '../../api/request'
import { ADD_CHAT, REMOVE_CHAT, GET_CHATS_PENDING, GET_CHATS_SUCCESS, GET_CHATS_ERROR } from './types'

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

export const getChats = () => async (dispatch, getState, extraArguments) => {
    dispatch({type: GET_CHATS_PENDING})
    try {
        const { data } = await request.get('/')
        dispatch({type: GET_CHATS_SUCCESS, payload: data})
    } catch {
        dispatch({type: GET_CHATS_ERROR})
    }
}