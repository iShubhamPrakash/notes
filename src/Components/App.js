import React, { Component } from 'react'
import Notes from './Notes';
import Header from './Header';
import Footer from './Footer';

class App extends Component {

  state = {
    
  }

  render() {
    return (
      <div className="App">
      <Header />
      
      <Notes />
      <Footer/>
    </div>
    )
  }
}
export default App;