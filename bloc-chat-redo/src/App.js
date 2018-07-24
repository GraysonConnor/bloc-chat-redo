import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import { RoomList } from './components/RoomList.js';
import { MessageList } from './components/MessageList.js';




var config = {
    apiKey: "AIzaSyB7LHrEgYQgmYzYOSuvOfRsBLw6QLP7NMc",
    authDomain: "bloc-chat-redo-989ca.firebaseapp.com",
    databaseURL: "https://bloc-chat-redo-989ca.firebaseio.com",
    projectId: "bloc-chat-redo-989ca",
    storageBucket: "",
    messagingSenderId: "43753766886"
  };
  firebase.initializeApp(config);


class App extends Component {
constructor(props) {
    super(props);
    this.state = {
      activeRoom: "",
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }

setActiveRoom(room) {
  this.setState({ activeRoom: room });
}



  render() {
    var listMessages = this.state.activeRoom;

    return (
      <div className="App">
      <h1>Bloc Chat</h1>
      <h2>{this.state.activeRoom.name}</h2>
      <RoomList firebase={firebase} setActiveRoom={this.setActiveRoom} />
      { listMessages ?
        <MessageList firebase = {firebase} activeRoom = {this.state.activeRoom.key}/>
        : null }
      </div>
    );
  }
}

export default App;
