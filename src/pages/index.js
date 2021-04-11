import React, { Component } from 'react'
import { ChatLayout } from '@components/layout/chat'

const chats = [
    {
        uid: 213,
        name: 'Ali Connors'
    },
    {
        uid: 117,
        name: 'Alex'
    },
    {
        uid: 48,
        name: 'Sandra Adams'
    }
]

export class IndexPage extends Component {
    render () {
        return (
            <ChatLayout
                chats={chats}
                component={this.props.component}
            />
        )
    }
}


 