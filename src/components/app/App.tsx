import React from 'react';
import './App.css';
import AppHeader from '../app-header/AppHeader';
import AppMain from '../app-main/AppMain'

class App extends React.Component {
  render() {
    return (
      <>
        <AppHeader/>
        <AppMain/>
      </>

    );
  }
}

export default App;
