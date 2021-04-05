import React, { Component } from 'react'

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
                value: 'Привет'
            }
        ],
        value: ""
    }

    sendMessage = ({ from, value }) => {
        const { messages } = this.state

        this.setState({
            messages: [...messages, { from, value }],
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
            this.sendMessage({ from: "YOU", value: this.state.value })
        }
    }

    componentDidUpdate(_, state) {
        const { messages } = this.state
    
        const lastMessage = messages[messages.length - 1]
    
        if (lastMessage.from === "YOU" && state.messages !== messages) {
          setTimeout(() => {
            this.sendMessage({ from: "ROBOT", value: "Ответ робота" })
          }, 500)
        }
      }

    render () {
        const { messages, value } = this.state

        return (
            <>
                <div className="field field--column">
                    <div className="field__box">
                        {messages.map((message, index) => <Message key={index} message={message} />)}
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
                                        this.sendMessage({ from: "YOU", value })
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