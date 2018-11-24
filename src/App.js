import React, { Component } from 'react'
import { Route } from 'react-router-dom'
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
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.setPark = this.setPark.bind(this);
    this.setGoogle = this.setGoogle.bind(this);
    this.state = {
      parks: [],
      google: {},
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
      let point = marker.marker;
      this.state.markers.push({ marker });
    }
  }
  // on park select from any area of app
  handlePlaceChange(props, marker) {
    // console.log(e)
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
        value: props.title,
        animation: 4,
        // google: props.google
      });
    console.log('App selected park is ' + this.state.selectedPlace);
  }
  // called on filter select submit and list view selection
  setPark(park){
    for(var point of this.state.markers){
      if(park.title === point.marker.marker.id){
        this.handlePlaceChange(park, point.marker.marker)
      }
    }
  }
  // clear selectedPlace and activeMarker on map click
  onMapClick = (props) => {
     if (this.state.showingInfoWindow === true) {
       this.setState({
         showingInfoWindow: false,
         activeMarker: null,
         animation: null,
         selectedPlace: {},
         value: ''
       });
     }
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
   // once this.props.parks is populated, this.props.ready changes to true
   setGoogle = (props) => {
     console.log(props)
     if(this.props.ready === true){
         this.setState({ google: props.google,
           children: props.children["0"]
         })
     } else {
       return;
     }
   }

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


        <Filter
        parks={this.state.parks}
        choosen={this.state.selectedPlace}
        setPark={this.setPark}
        value={this.state.value}
        />

        <Menu
        parks={this.state.parks}
        choosen={this.state.selectedPlace}
        setPark={this.setPark}
        value={this.state.value}
        />


          <ParkMap
          onMarkerCreated={this.onMarkerCreated}
          googleState={this.state.google}
          className='map-container'
          id='map-wrapper'
          parks={this.state.parks}
          onPlaceChange={this.handlePlaceChange}
          showingInfoWindow={this.state.showingInfoWindow}
          activeMarker={this.state.activeMarker}
          choosen={this.state.selectedPlace}
          value={this.state.value}
          animation={this.state.animation}
          getPosition={this.getPosition}
          getAddress={this.getAddress}
          onMapClick={this.onMapClick}
          setPark={this.setPark}
          onLoad={this.setGoogle}
          />


      </div>
  )
}

}

export default App
