import React, { Component } from 'react'

// material-ui
import { AppBar, Toolbar, Typography, Button, Grid, Avatar } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'

// components
import { MessageField } from '@components/index/message-field'

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
              }
        }
    }

    render () {
        const { classes } = this.state
        
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
                            <Typography
                                variant="h6"
                            >
                                Chat
                            </Typography>
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
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar style={classes.blue}>N</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Brunch this weekend?"
                                secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        style={classes.inline}
                                        color="textPrimary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar style={classes.orange}>N</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                            primary="Summer BBQ"
                            secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    style={classes.inline}
                                    color="textPrimary"
                                >
                                    to Scott, Alex, Jennifer
                                </Typography>
                                {" — Wish I could come, but I'm out of town this…"}
                            </React.Fragment>
                            }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar style={classes.green}>N</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                            primary="Oui Oui"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        style={classes.inline}
                                        color="textPrimary"
                                    >
                                        Sandra Adams
                                    </Typography>
                                {' — Do you have Paris recommendations? Have you ever…'}
                                </React.Fragment>
                            }
                            />
                        </ListItem>
                    </List>

                    {/* чтобы сюда можно было вставить любой компонент???? */}
                    <MessageField />
                    
                </Grid>
            </>
        )
    }
}