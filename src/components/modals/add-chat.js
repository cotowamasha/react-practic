import React, { Component } from "react"
import { Modal as ModalBase, Typography, List, ListItem } from '@material-ui/core'
import { connect } from 'react-redux'
import { addChat } from '@store/chats'

export class AddChatModalView extends Component {
    render () {
        const {contacts, chats, isOpen, onClose, addChat} = this.props;

        let actualContacts = contacts.filter(el => {
            let find = chats.find(chat => chat.name == el)
            if (!find) return el
        })

        return (
            <ModalBase
                open={isOpen}
                onClose={onClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className="modal"
            >
                <div className="modal__box">
                    <Typography
                        variant="h5"
                    >
                        Добавить учасников
                    </Typography>
                    <List>
                        {actualContacts.map((contact) => (
                            <ListItem
                                key={contact}
                                className="contact"
                                onClick={() => addChat(contact)}
                            >
                                {contact}
                            </ListItem>
                        ))}
                    </List>
                </div>
            </ModalBase>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contacts: state.chatsReducer.contacts,
        chats: state.chatsReducer.chats,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addChat: (contact) => dispatch(addChat(contact))
    }
}

export const AddChatModal = connect(mapStateToProps, mapDispatchToProps)(AddChatModalView)