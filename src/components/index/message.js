import React, { Component } from 'react'

export class Message extends Component {
    render () {
        const message = this.props.message

        return (
            <>
                <div className={message.from == 'YOU' ? 'message message--right' : 'message message--left'}>
                    <h6>
                        {message.from}
                    </h6>
                    <p>
                        {message.value}
                    </p>
                </div>
            </>
        )
    }
}