import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ParkMap from './map'
import MenuButton from './MenuButton'
import * as Parks from './parks'
import Menu from './Menu'

class Main extends Component {
  render() {
    return (
      <div className="park-map-app">
        <div className="app-title">
          <Link to="/">
          <h1>Park Finder</h1>
          </Link>
          <div className="logo-container">
          <Link to="/">
          </Link>
          </div>
        </div>

        <MenuButton
        />
        <Menu
        parks={this.props.parks}/>

        <div className="map-container">
        <ParkMap
        parks={this.props.parks}/>
        </div>


      </div>
  )
}

}

export default Main
