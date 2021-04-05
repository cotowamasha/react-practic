import React, { Component } from 'react'

export class Message extends Component {
    render () {
        return (
            <>
                <div className={this.props.message.from == 'YOU' ? 'message message--right' : 'message message--left'}>
                    <h6>
                        {this.props.message.from}
                    </h6>
                    <p>
                        {this.props.message.value}
                    </p>
                </div>
            </>
        )
    }
}