import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ParkMap from './map'
import Parks from './parkData'
import MenuButton from './MenuButton'


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

        <MenuButton />

        <div className="map-container">
        <ParkMap />
        </div>

        <div className="park-data">
        <Parks />
        </div>
      </div>
  )
}

}

export default Main
