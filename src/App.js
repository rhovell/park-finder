import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Main from './Main'
import * as Parks from './parks'

class App extends Component {
  state = {
    parks: []
  }
  componentDidMount() {
  Parks.getAll().then((parks) => {
    this.setState({ parks : parks.results.items })
  })
}
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Main
          parks={this.state.parks}/>
        )}/>
        </div>
    )
  }
}

export default App
