import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { IndexPage } from '@pages'
import { Typography} from '@material-ui/core'
import { MessageField } from '@components/index/message-field'
import { LoginPage } from '@pages/login'

const messages = [
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
]

export class Router extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' render={ () => <IndexPage component={
                    <Typography
                        variant="h4"
                        style={{
                            marginLeft: '20px',
                            marginTop: '50px'
                        }}
                    >
                        Choose chat for conversation.
                    </Typography>
                    } />
                } />
                <Route path='/chat/:uid' render={ (obj) => <IndexPage component={<MessageField messages={messages} uid={ Number(obj.match.params.uid) } />} /> } />
                <Route path='/login' component={ LoginPage } />
            </Switch>
        )
    }
 }