import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import MainMenu from './components/MainMenu';

class App extends Component {

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <div>
          
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">React DevArts</h1>
          </div>
          
        </header>

        <MainMenu />
      
      </div>
    );
  }
}

export default App;
