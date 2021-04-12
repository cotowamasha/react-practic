import React, { Component } from 'react'
import { connect } from 'react-redux'

export class MessageView extends Component {
    getNameById = (uid) => {
        return this.props.chats.find(el => el.uid == uid).name
    }

    render () {
        const { message, chats } = this.props

        return (
            <>
                <div className={message.from == 'YOU' ? 'message message--right' : 'message message--left'}>
                    <h6>
                        {message.from == 'YOU' ? 'YOU' : this.getNameById(message.from)}
                    </h6>
                    <p>
                        {message.value}
                    </p>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chats: state.chatsReducer.chats
    }
}

export const Message = connect(mapStateToProps, null)(MessageView)