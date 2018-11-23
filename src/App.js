import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Main from './Main'
import * as Parks from './parks'

class App extends Component {
  state = {
    parks: [],
    ready: false
  }
  componentDidMount() {
  Parks.getAll().then((parks) => {
    this.setState({ parks : parks.results.items })
  }).then(() => {

    if(this.state.parks){

      this.setState({ ready: true })
    }
  }
  ).catch((error) => {
    this.setState({ parks: [] })
    console.log('Error on park capture')
  })
}

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Main
          parks={this.state.parks}
          ready={this.state.ready}
          />
        )}/>
        </div>
    )
  }
}

export default App
