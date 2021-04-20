const cors = require('cors')
const express = require('express')

const server = express()

server.use(cors())

const chats = [
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
]

const messages = [
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

const getChats = (request, response) => {
    response.status(200).send(chats)
}

const getMessageById = (request, response) => {
    const { id } = request.params
    let messagesById = messages.filter(el => el.from == id || el.to == id)
    response.status(200).send(messagesById || [])
}

//как здесь получить????
const sendMessage = (request, response) => {
    // ????
    console.log(request)
    // messages = [...messages, request.data.message]
    // let messagesById = messages.filter(el => el.from == id || el.to == id)
    // response.status(200).send(messagesById || [])
    response.status(200).send({success: 'success'})
}

server.get('/', getChats)
server.get('/chats/:id', getMessageById)
server.get('/send-message', sendMessage)

server.listen('8000', () => console.log('server'))