import React from 'react'
import './App.css'
import * as Parks from './parks'
import ParkMap from './map'
import Menu from './Menu'
import Filter from './Filter'
import { Link } from 'react-router-dom'


class App extends React.Component {
  constructor(props) {
    super(props);
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.windowHasClosed = this.windowHasClosed.bind(this);
    this.windowHasOpened = this.windowHasOpened.bind(this);
    this.state = {
      parks: [],
      markers: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      value: '',
      animation: null,
      ready: false
    };
  }
  // ensure this.state.parks is mounted, then set state.ready to true
  componentDidMount() {
    Parks.getAll().then((parks) => {
      this.setState({ parks : parks.results.items });
    }).then(() => {
      if (this.state.parks.length === 0) { // in case of no results
        window.alert('Error! No available parks. Try to refresh the page')
      } else {
        this.setState({ ready: true })
      }
    }).catch((error) => {
      this.setState({
        parks: [],
        ready: false
      })
    })
  }

  // creates a list of marker objects on creation of each one
  onMarkerCreated = (marker) => {
    if (marker !== null) {
      this.state.markers.push({ marker });
    }
  }
  // on park select from any area of app
  onMarkerClick(props, marker) {
    console.log(props, marker)
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
        value: props.title,
        animation: 4,
      });
  }

  // clear selectedPlace and activeMarker on map click
  onMapClick = (props) => {
     if (this.state.showingInfoWindow === true) {
       this.setState({
         showingInfoWindow: false,
         activeMarker: {},
         animation: null,
         selectedPlace: {},
         value: ''
       });
     }
   }

   windowHasOpened = (props) => {

   }
   windowHasClosed = (props) => {

   }

   // format position for google maps
   getPosition = (position) => {
       var iterator = position.values();
       let lat = iterator.next().value;
       let lang = iterator.next().value;
       return {lat: lat ,lng: lang};
   };
   // format address from JSON to user friendly
   getAddress = (address) => {
     var formatAddress = address.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '\n');
     return formatAddress;
   }

  render() {
    return (
      <div className="park-map-app">
        <div className="park-selection">
          <div className="app-title">
            <Link to="/">
            <h1>Park Finder</h1>
            </Link>
          </div>

          <Filter
          parks={this.state.parks}
          choosen={this.state.selectedPlace}
          setPark={this.setPark}
          showingInfoWindow={this.state.showingInfoWindow}
          activeMarker={this.state.activeMarker}
          value={this.state.value}
          animation={this.state.animation}
          markers={this.state.markers}
          handlePlaceChange={this.onMarkerClick}
          />

          <Menu
          parks={this.state.parks}
          setPark={this.setPark}
          showingInfoWindow={this.state.showingInfoWindow}
          activeMarker={this.state.activeMarker}
          choosen={this.state.selectedPlace}
          value={this.state.value}
          animation={this.state.animation}
          markers={this.state.markers}
          handlePlaceChange={this.onMarkerClick}
          />
        </div>

          <ParkMap
          markers={this.state.markers}
          onMarkerCreated={this.onMarkerCreated}
          className='map-container'
          id='map-wrapper'
          parks={this.state.parks}
          onPlaceChange={this.onMarkerClick}
          showingInfoWindow={this.state.showingInfoWindow}
          activeMarker={this.state.activeMarker}
          selectedPlace={this.state.selectedPlace}
          value={this.state.value}
          animation={this.state.animation}
          getPosition={this.getPosition}
          getAddress={this.getAddress}
          onMapClick={this.onMapClick}
          windowHasOpened={this.windowHasOpened}
          windowHasClosed={this.windowHasClosed}
          />

      </div>
  )
}

}

export default App
