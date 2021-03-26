import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './index.css'

// lesson 1
class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            messages: ['Hello', 'what\'s up?']
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({value: event.target.value})
    }
    handleSubmit(event) {
        this.state.messages.push(this.state.value)
        this.setState({messages: this.state.messages})
        this.setState({value: ''})
        event.preventDefault()
    }
    render () {
        return <div>
            <h1>
                Messages
            </h1>
            {this.state.messages.map(message => <p key={message}>{message}</p>)}
            <form onSubmit={this.handleSubmit}>
                <input
                    value={this.state.value}
                    type="text"
                    placeholder="Введите сообщение"
                    onChange={this.handleChange}
                />
                <button>
                    Отправить
                </button>
            </form>
        </div>
    }
}

ReactDOM.render(<Messages />, document.querySelector('#root'))