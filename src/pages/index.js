import React, { Component } from 'react'
import { ChatLayout } from '@components/layout/chat'

export class IndexPage extends Component {
    render () {
        return (
            <ChatLayout
                component={this.props.component}
            />
        )
    }
}


 