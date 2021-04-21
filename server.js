const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

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

const addChat = (request, response) => {
    const { name } = request.body
    chats.push({name: name, uid: chats[chats.length - 1].uid + 1})
    response.status(200).send(chats)
}

const getMessageById = (request, response) => {
    const { id } = request.params
    let messagesById = messages.filter(el => el.from == id || el.to == id)
    response.status(200).send(messagesById || [])
}

const sendMessage = (request, response) => {
    const { message, id } = request.body
    messages.push(message)
    let messagesById = messages.filter(el => el.from == id || el.to == id)
    response.status(200).send(messagesById || [])
}

const deleteMessage = (request, response) => {
    const { message , id} = request.body
    let find = messages.find(mes => mes.from == message.from && mes.to == message.to && mes.value == message.value )
    messages.splice(messages.indexOf(find), 1)
    let messagesById = messages.filter(el => el.from == id || el.to == id)
    response.status(200).send(messagesById || [])
}

server.get('/', getChats)
server.post('/add-chat', addChat)
server.get('/chats/:id', getMessageById)

server.post('/send-message', sendMessage)
server.post('/delete-message', deleteMessage)


server.listen('8000', () => console.log('server'))