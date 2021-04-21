import { request } from '../../api/request'
import { ADD_MESSAGE, REMOVE_MESSAGES, REMOVE_MESSAGE, GET_MESSAGES_ERROR, GET_MESSAGES_PENDING, GET_MESSAGES_SUCCESS } from './types'

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

export const getMessagesById = (uid) => async (dispatch) => {
    dispatch({type: GET_MESSAGES_PENDING})
    try {
        const { data } = await request.get(`/chats/${uid}`)
        dispatch({type: GET_MESSAGES_SUCCESS, payload: data})
    } catch {
        dispatch({type: GET_MESSAGES_ERROR})
    }
}

export const sendMessage = (uid, message) => async (dispatch) => {
    dispatch({type: GET_MESSAGES_PENDING})
    try {
        const { data } = await request.post('send-message', { id: uid, message: message })
        dispatch({type: GET_MESSAGES_SUCCESS, payload: data})
    } catch {
        dispatch({type: GET_MESSAGES_ERROR})
    }
}

export const deleteMessage = (uid, message) => async (dispatch) => {
    dispatch({type: GET_MESSAGES_PENDING})
    try {
        const { data } = await request.post('delete-message', { id: uid, message: message })
        dispatch({type: GET_MESSAGES_SUCCESS, payload: data})
    } catch {
        dispatch({type: GET_MESSAGES_ERROR})
    }
}