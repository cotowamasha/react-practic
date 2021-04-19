import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeMessage } from '@store/messages'

export class MessageView extends Component {
    getNameById = (uid) => {
        return this.props.chats.find(el => el.uid == uid).name
    }

    render () {
        const { message , removeMessage} = this.props

        return (
            <>
                <div className={message.from == 'YOU' ? 'message message--right' : 'message message--left'}>
                    <h6>
                        {message.from == 'YOU' ? 'YOU' : this.getNameById(message.from)}
                    </h6>
                    <p>
                        {message.value}
                    </p>
                    <button
                        onClick={() => removeMessage(message)}
                        className="delete-chat"
                    >
                        <i className="fas fa-times"></i>
                    </button>
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

const mapDispatchToProps = dispatch => {
    return {
        removeMessage: (message) => dispatch(removeMessage(message)),
    }
}

export const Message = connect(mapStateToProps, mapDispatchToProps)(MessageView)