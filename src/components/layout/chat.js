import React, { Component } from 'react'
import { Link } from 'react-router-dom';

// material-ui
import { AppBar, Toolbar, Typography, Button, Grid, Avatar } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'

export class ChatLayout extends Component {
    state = {
        classes: {
            root: {
                backgroundColor: 'white',
                height: '100%',
                paddingTop: '64px',
                flexWrap: 'nowrap'
            },
            sidebar: {
                width: '100%',
                maxWidth: '36ch',
                backgroundColor: '#FAFAFA',
                height: '100%',
                paddingRight: '20px'
              },
            inline: {
                display: 'inline',
            },
            blue: {
                color: 'white',
                backgroundColor: '#00a'
            },
            orange: {
                color: 'white',
                backgroundColor: '#FF8C00'
            },
            green: {
                color: 'white',
                backgroundColor: '#7FFF00'
            },
            menu: {
                position: 'fixed',
                zIndex: 100
            },
            title: {
                color: 'white'
            }
        },
        chats: [
            {
                uid: 213,
                name: 'Ali Connors'
            },
            {
                uid: 117,
                name: 'Alex'
            },
            {
                uid: 48,
                name: 'Sandra Adams'
            }
        ],
        colors: ['blue', 'orange', 'green']
    }

    getRandomColor = () => {
        return Math.floor(Math.random() * this.state.colors.length);
    }

    render () {
        const { classes, chats, colors } = this.state
        
        return (
            <>
                <AppBar style={classes.menu}>
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
                                    style={classes.title}
                                >
                                    Chat
                                </Typography>
                            </Link>
                            <Button
                                color="inherit"
                            >
                                Login
                            </Button>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    style={classes.root}
                >
                    <List style={classes.sidebar}>
                        {chats.map(chat => 
                            <Link key={chat.uid} to={`/chat/${chat.uid}`}>
                                <ListItem
                                    alignItems="flex-start"
                                >
                                    <ListItemAvatar>
                                        <Avatar style={classes[colors[this.getRandomColor()]]}>
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
                                                style={classes.inline}
                                                color="textPrimary"
                                            >
                                                {chat.name}
                                            </Typography>
                                            {" — I'll be in your neighborhood doing errands this…"}
                                        </React.Fragment>
                                    }
                                    />
                                </ListItem>
                            </Link>
                        )}
                    </List>

                    {this.props.component}
                    
                </Grid>
            </>
        )
    }
}