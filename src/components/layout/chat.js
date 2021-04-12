import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { increment, decrement } from '../../store/counter'
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

    render () {
        const { colors, isOpen } = this.state
        const Component = this.props.component
        const { chats } = this.props
        console.log(this.props)
        
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
                                            — I'll be in your neighborhood doing errands this…
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

const mapStateToProps = (state, props) => {
    return {
        count: state.counterReducer.count,
        chats: state.chatsReducer.chats,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement())
    }
}

export const ChatLayout = connect(mapStateToProps, mapDispatchToProps)(ChatLayoutView)