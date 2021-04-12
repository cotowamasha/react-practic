import { INCREMENT, DECREMENT } from './types'

const initialState = {
    count: 0
}
// редюсер не должен мутировать state , аргументы, не может иметь побочные эффекты
export const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {...state, count: state.count + 1}
        case DECREMENT:
            return {...state, count: state.count - 1}
        default:
            return state
    }
}