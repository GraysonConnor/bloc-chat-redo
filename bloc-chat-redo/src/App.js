import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';




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
  render() {
    return (
      <div className="App">
        <RoomList database = {firebase}></RoomList>
      </div>
    );
  }
}

export default App;
