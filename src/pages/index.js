import React, { Component } from 'react'
import { ChatLayout } from '@components/layout/chat'

// import { MessageField } from '@components/index/message-field'

export class IndexPage extends Component {
    render () {
        return (
            <ChatLayout />

            // как сделать в реакт такую обертку???
            // <ChatLayout >
            //     <MessageField />
            // <ChatLayout />
        )
    }
}