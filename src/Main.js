import React from 'react'
import { Link } from 'react-router-dom'
import ParkMap from './map'
import Menu from './Menu'
import Filter from './Filter'

class Main extends React.Component {
  constructor(props) {
    super(props);
    // binding this to event-handler functions
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.setPark = this.setPark.bind(this);
    this.setGoogle = this.setGoogle.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      value: '',
      animation: null,
      google: {},
      children: []
    };
  }
  // on marker click
  handlePlaceChange(props, marker, e) {
    console.log(e)
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
    console.log(park)
    console.log(this.state.children)
    // this.state.google.maps.event.trigger( this.state.children, 'click')
    for(var marker of this.state.children){
      if(park.id === marker.key){
        console.log(marker)
        this.handlePlaceChange(park, marker)

      }
    }

    console.log('App selected park is ' + this.state.selectedPlace);
  }

  componentDidUpdate(nextProps, prevProps){
    console.log(nextProps, prevProps, this.props)

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

   setGoogle = (props) => {
     console.log(props)
     let root = document.getElementById('root')
     let map = root.getElementsByClassName('map')
     if(!this.props.ready){
       return;

     } else {
       this.setState({ google: props.google,
         children: props.children["0"]
       })
     }
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
        showingInfoWindow={this.state.showingInfoWindow}
        activeMarker={this.state.activeMarker}
        choosen={this.state.selectedPlace}
        value={this.state.value}
        setValue={this.setValue}
        animation={this.state.animation}
        setPark={this.setPark}
        handleChange={this.handleChange}
        />

        <Menu
        setPark={this.setPark}
        parks={this.props.parks}
        performMarkerClick={this.performMarkerClick}
        onPlaceChange={this.handlePlaceChange}
        hidden={this.state.hidden}
        showingInfoWindow={this.state.showingInfoWindow}
        activeMarker={this.state.activeMarker}
        choosen={this.state.selectedPlace}
        value={this.state.value}
        animation={this.state.animation}
        />


          <ParkMap
          // ready={this.props.ready}
          googleState={this.state.google}
          className='map-container'
          id='map-wrapper'
          parks={this.props.parks}
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
          children={this.state.children}
          // list={this.list}
          />


      </div>
  )
}

}

export default Main
