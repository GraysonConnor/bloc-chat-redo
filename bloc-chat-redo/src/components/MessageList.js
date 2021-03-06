import React, { Component } from 'react';
import * as firebase from 'firebase';


export class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            content: "",
            sentAt: "",
            roomId: "",
            messages: []
        };

        this.messagesRef = this.props.firebase.database().ref('messages');
        this.createMessage = this.createMessage.bind(this);
        this.messageContent = this.messageContent.bind(this);

    }

    componentDidMount() {
        this.messagesRef.on('child_added', (snapshot) => {
            var message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat(message)})
        });
    }

    createMessage(e) {
        e.preventDefault();
        this.messagesRef.push({
            username: this.state.username,
            content: this.state.content,
            sentAt: this.state.sentAt,
            roomId: this.state.roomId
        });
        this.setState({
            username: "",
            content: "",
            sentAt: "",
            roomId: ""
        });
        e.target.reset()
    };

    messageContent(e) {
        e.preventDefault();
        this.setState({
            username: "user",
            content: e.target.value,
            sentAt: firebase.database.ServerValue.TIMESTAMP,
            roomId: this.props.activeRoom
        });
    }


    render() {
        var activeRoom = this.props.activeRoom

        var currentMessages = (
            this.state.messages.map((message) => {
                if(message.roomId === activeRoom) {
                    return <ol key={message.key}>{message.content}</ol>
                }
                return null;
            })
        );
        var messageBox = (
            <form onSubmit = {this.createMessage}>
                <h4> Message </h4>
                <textarea type= "text" onChange={this.messageContent}/>
                <input type="submit" value="Submit"/>
            </form>
        )

        return (
             <div>
                <div> {messageBox} </div>
                <div> {currentMessages} </div>
            </div>
        );
    }
}
