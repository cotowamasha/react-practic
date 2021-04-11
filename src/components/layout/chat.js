import React, { Component } from 'react'
import { Link } from 'react-router-dom';

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

export class ChatLayout extends Component {
    state = {
        colors: ['blue', 'orange', 'green']
    }

    getRandomColor = () => {
        return Math.floor(Math.random() * this.state.colors.length);
    }

    render () {
        const { colors } = this.state
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
                                            — I'll be in your neighborhood doing errands this…
                                        </React.Fragment>
                                    }
                                    />
                                </ListItem>
                            </Link>
                        )}
                    </List>

                    { Component }
                    
                </Grid>
            </>
        )
    }
}