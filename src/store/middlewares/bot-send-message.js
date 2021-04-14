import { ADD_MESSAGE, addMessage } from '../messages'

export const botSendMessge =  (store) => (next) => (action) => {
    console.log(action)
    if (action.type == ADD_MESSAGE) {
        if (action.payload.from == 'YOU') {
            setTimeout(() => {
                store.dispatch(addMessage({
                    from: action.payload.to,
                    to: 'YOU',
                    value: 'Ответ робота из middleware'
                }))
            }, 500)
        }
    }
    return next(action)
}