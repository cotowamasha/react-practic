import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { IndexPage } from '@pages'
import { Typography} from '@material-ui/core'
import { MessageField } from '@components/index/message-field'
import { LoginPage } from '@pages/login'

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
                <Route path='/chats/:uid' render={ (obj) => <IndexPage component={<MessageField uid={ Number(obj.match.params.uid) } />} /> } />
                <Route path='/login' component={ LoginPage } />
            </Switch>
        )
    }
 }