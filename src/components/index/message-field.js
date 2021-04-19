import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { addMessage } from '@store/messages'

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

    sendMessage = ({ from, value, to }) => {
        const { addMessage } = this.props

        addMessage({ from, value, to })

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

    // componentDidUpdate(props) {
    //     const { messages, uid } = this.props
    
    //     const lastMessage = messages[messages.length - 1]
    
    //     if (lastMessage.from === "YOU" && props.messages != messages) {
    //       setTimeout(() => {
    //         this.sendMessage({ from: uid, value: "Ответ робота", to: 'YOU'})
    //       }, 500)
    //     }
    //     this.handleScrollBottom()
    // }

    handleScrollBottom = () => {
        if (this.ref.current) {
            this.ref.current.scrollTo(0, this.ref.current.scrollHeight)
        }
    }

    getActualMessage = () => {
        const { uid, messages } = this.props
        return messages.filter(message => message.to == uid || message.from == uid)
    }

    render () {
        const { value } = this.state
        const { uid } = this.props

        return (
            <>
                <div className="field field--column">
                    <div
                        ref={this.ref}
                        className="field__box"
                    >
                        { this.getActualMessage().length 
                          ? this.getActualMessage().map((message, index) => {
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
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (message) => dispatch(addMessage(message))
    }
}

export const MessageField = connect(mapStateToProps, mapDispatchToProps)(MessageFieldView)