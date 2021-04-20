import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { addMessage, getMessagesById, sendMessage } from '@store/messages'

// components
import { Message } from './message'

// material-ui
import { Input, withStyles, InputAdornment } from "@material-ui/core"
import { Send } from "@material-ui/icons"

const StyledInput = withStyles(() => {
    return {
      root: {
        "&": {
          color: "#9a9fa1",
          padding: "10px 15px",
          fontSize: "15px",
        },
      },
    }
})(Input)

export class MessageFieldView extends Component {
    state = {
        value: ""
    }

    ref = createRef()

    sendMessage = (message) => {
        const { addMessage, sendMessage, uid } = this.props

        // addMessage({ from, value, to })
        sendMessage(uid, message)

        this.setState({
            value: "",
        })
    }

    handleChangeInput = ({ target }) => {
        this.setState({
            value: target.value,
        })
    }

    handlePressInput = ({ code }) => {
        if (code === "Enter") {
            this.sendMessage({ from: "YOU", value: this.state.value , to: this.props.uid})
        }
    }

    handleScrollBottom = () => {
        if (this.ref.current) {
            this.ref.current.scrollTo(0, this.ref.current.scrollHeight)
        }
    }

    getMessages = () => {
        const { uid } = this.props
        this.props.getMessagesById(uid)
    }

    componentDidUpdate (prevProps) {
        const prevId = prevProps.uid
        const id = this.props.uid
        if (prevId !== id) this.getMessages()
    }

    componentDidMount () {
        this.getMessages()
    }

    render () {
        const { value } = this.state
        const { uid, messages, messagesPending } = this.props

        return messagesPending 
        ? <>
            <div className="field__box">
                <p className="start-conversation">
                    Loading...
                </p>
            </div>
        </> 
        : (
            <>
                <div className="field field--column">
                    <div
                        ref={this.ref}
                        className="field__box"
                    >
                        { messages.length 
                          ? messages.map((message, index) => {
                            return <Message key={index} message={message} />
                        }) 
                        : <p className="start-conversation">
                                Начните переписку
                            </p> }
                    </div>
                    <StyledInput
                        fullWidth={true}
                        value={value}
                        onChange={this.handleChangeInput}
                        onKeyPress={this.handlePressInput}
                        placeholder="Введите сообщение..."
                        endAdornment={
                            <InputAdornment position="end">
                            {value && (
                                <Send
                                    className="send"
                                    onClick={() => {
                                        this.sendMessage({ from: "YOU", value, to: uid })
                                    }}
                                />
                            )}
                            </InputAdornment>
                        }
                    />
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messagesReducer.messages,
        messagesPending: state.messagesReducer.messagesPending
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (message) => dispatch(addMessage(message)),
        getMessagesById: (uid) => dispatch(getMessagesById(uid)),
        sendMessage: (uid, message) => dispatch(sendMessage(uid, message))
    }
}

export const MessageField = connect(mapStateToProps, mapDispatchToProps)(MessageFieldView)