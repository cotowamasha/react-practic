import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AddChatModal } from '@components/modals/add-chat'
import { push } from 'connected-react-router'
import { removeChat } from '@store/chats'
import { removeMessages } from '@store/messages'

// material-ui
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Grid,
    Avatar,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar
} from '@material-ui/core'

export class ChatLayoutView extends Component {
    state = {
        colors: ['blue', 'orange', 'green'],
        isOpen: false
    }

    toggleModal = () => [
        this.setState({
            isOpen: !this.state.isOpen
        })
    ]

    getRandomColor = () => {
        return Math.floor(Math.random() * this.state.colors.length);
    }

    lastMessage = (uid) => {
        let filter = this.props.messages.filter(el => el.from == uid || el.to == uid)
        return filter[filter.length - 1]?.value || 'Нет сообщений'
    }

    handleNavigate = (link) => {
        this.props.push(link)
    }

    removeChat = (uid) => {
        this.props.removeChat(uid)
        this.props.removeMessages(uid)
        console.log('messages', this.props.messages)
    }

    render () {
        const { colors, isOpen } = this.state
        const Component = this.props.component
        const { chats } = this.props
        
        return (
            <>
                <AppBar className="menu">
                    <Toolbar>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Typography
                                variant="h6"
                                className="title cursor-pointer"
                                onClick={() => this.handleNavigate('/')}
                            >
                                Chat
                            </Typography>
                            <Typography
                                onClick={() => this.handleNavigate('/login')}
                                className="title cursor-pointer"
                            >
                                Login
                            </Typography>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    className="root"
                >
                    <List className="sidebar">
                        {chats.map(chat => 
                            <ListItem
                                key={chat.uid}
                                alignItems="flex-start"
                                className="cursor-pointer"
                            >
                                <ListItemAvatar onClick={() => this.handleNavigate(`/chat/${chat.uid}`)}>
                                    <Avatar className={colors[this.getRandomColor()]}>
                                        {chat.name[0]}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={chat.name}
                                    onClick={() => this.handleNavigate(`/chat/${chat.uid}`)}
                                    secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className="inline"
                                            color="textPrimary"
                                        >
                                            {chat.name}
                                        </Typography>
                                        {' ' + this.lastMessage(chat.uid) + ' ' }
                                    </React.Fragment>
                                }
                                />
                                <button
                                    onClick={() => this.removeChat(chat.uid)}
                                    className="delete-chat"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </ListItem>
                        )}
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={this.toggleModal}
                        >
                            + Add chat
                        </Button>
                    </List>

                    { Component }
                    
                </Grid>
                <AddChatModal isOpen={isOpen} onClose={this.toggleModal} />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chats: state.chatsReducer.chats,
        messages: state.messagesReducer.messages,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        push: (link) => dispatch(push(link)),
        removeChat: (uid) => dispatch(removeChat(uid)),
        removeMessages: (uid) => dispatch(removeMessages(uid)),
    }
}

export const ChatLayout = connect(mapStateToProps, mapDispatchToProps)(ChatLayoutView)