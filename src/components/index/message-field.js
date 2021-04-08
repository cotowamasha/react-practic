import React, { Component, createRef } from 'react'

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

export class MessageField extends Component {
    state = {
        messages: [
            {
                from: 'YOU',
                value: 'Hello',
                to: 213
            },
            {
                from: 213,
                value: 'What\'s up?',
                to: 'YOU'
            },
            {
                from: 'YOU',
                value: 'Fine',
                to: 213
            },

            {
                from: 'YOU',
                value: 'Where my keys?',
                to: 117
            },
            {
                from: 117,
                value: 'I took them.',
                to: 'YOU'
            },

            
            {
                from: 48,
                value: 'Will you come in my party tonight?',
                to: 'YOU'
            },
            {
                from: 'YOU',
                value: 'Yes, of course. But I\'ll be later.',
                to: 48
            },
        ],
        value: ""
    }

    ref = createRef()

    sendMessage = ({ from, value, to }) => {
        const { messages } = this.state

        this.setState({
            messages: [...messages, { from, value, to }],
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

    componentDidUpdate(_, state) {
        const { messages } = this.state
    
        const lastMessage = messages[messages.length - 1]
    
        if (lastMessage.from === "YOU" && state.messages !== messages) {
          setTimeout(() => {
            this.sendMessage({ from: this.props.uid, value: "Ответ робота", to: 'YOU'})
          }, 500)
        }
        this.handleScrollBottom()
    }

    handleScrollBottom = () => {
        if (this.ref.current) {
            this.ref.current.scrollTo(0, this.ref.current.scrollHeight)
        }
    }

    render () {
        const { messages, value } = this.state
        const uid = this.props.uid

        return (
            <>
                <div className="field field--column">
                    <div
                        ref={this.ref}
                        className="field__box"
                    >
                        {messages.map((message, index) => {
                            if (message.from == uid || message.to == uid) return <Message key={index} message={message} />
                        } )}
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