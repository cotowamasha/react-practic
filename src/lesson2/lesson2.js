import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '@app/index.css'

//lesson 2

class MessageField extends Component {
    state = {
        messages: [
            {
                from: 'YOU',
                text: 'Сёма, что там такое грохнуло на кухне?'
            },
            {
                from: 'ROBOT',
                text: 'Люся, у меня случилось озарение: я видел будущее!'
            }
        ],
        canSend: true
    }

    handleSendMessage = () => {
        if (this.state.canSend) {
            this.setState({
                messages: [...this.state.messages, 
                    {
                        from: 'YOU',
                        text: 'И что там в будущем?'
                    }
                ]
            })
        }
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        if (this.state.canSend) {
            this.setState({
                canSend: false
            })
            setTimeout (() => {
                this.setState({
                    messages: [...this.state.messages, 
                        {
                            from: 'ROBOT',
                            text: 'Мы покупаем новую сахарницу.'
                        }
                    ]
                })
            }, 1000)
        }
    }

    render () {
        return (
            <>
                <div className="field field--column">
                    <div className="field__box">
                        {this.state.messages.map(message => <Message key={message.text} message={message} />)}
                    </div>
                    <button
                        onClick={this.handleSendMessage}
                        className="field__btn"
                    >
                        Send message
                    </button>
                </div>
            </>
        )
    }
}

class Message extends Component {
    render () {
        return (
            <>
                <div className={this.props.message.from == 'YOU' ? 'message message--right' : 'message message--left'}>
                    <h6>
                        {this.props.message.from}
                    </h6>
                    <p>
                        {this.props.message.text}
                    </p>
                </div>
            </>
        )
        
    }
}

ReactDOM.render(
    <MessageField />,
    document.querySelector('#root')
)
