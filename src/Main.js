import React from 'react'
import { Link } from 'react-router-dom'
import ParkMap from './map'
import Menu from './Menu'
import Filter from './Filter'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
    this.state = {
      hidden: true,
      selectedPlace: ''
    };
  }

  handlePlaceChange(choosen) {
    this.setState({selectedPlace: choosen });
  }

  render() {
    const choosen = this.state.selectedPlace;
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


        <Filter
        parks={this.props.parks}
        onPlaceChange={this.handlePlaceChange}
        selectedPlace={choosen}
        />

        <Menu
        parks={this.props.parks}
        onPlaceChange={this.handlePlaceChange}
        selectedPlace={choosen}
        />

        <div className="map-container">
        <ParkMap
        parks={this.props.parks}
        onPlaceChange={this.handlePlaceChange}
        choosen={choosen}
        />
        </div>


      </div>
  )
}

}

export default Main
