import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { AddChatModal } from '@components/modals/add-chat'

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
                            <Link to="/">
                                <Typography
                                    variant="h6"
                                    className="title"
                                >
                                    Chat
                                </Typography>
                            </Link>
                            <Link to="/login"
                                className="title"
                            >
                                Login
                            </Link>
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
                            <Link key={chat.uid} to={`/chat/${chat.uid}`}>
                                <ListItem
                                    alignItems="flex-start"
                                >
                                    <ListItemAvatar>
                                        <Avatar className={colors[this.getRandomColor()]}>
                                            {chat.name[0]}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={chat.name}
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
                                </ListItem>
                            </Link>
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

export const ChatLayout = connect(mapStateToProps, null)(ChatLayoutView)