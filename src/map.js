import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as Parks from './parks'

export class MapContainer extends Component {
  state = {
  showingInfoWindow: false,
  activeMarker: {},
  selectedPlace: {},
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    this.windowHasOpened(props);
    console.log(this.state.selectedPlace)
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  getPosition = (position) => {
      var iterator = position.values();
      let lat = iterator.next().value;
      let lang = iterator.next().value;
      return {lat: lat ,lng: lang};
  };

  getAddress = (address) => {
    var address = address.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '\n');
    // console.log(address)
    return address;
  }

  windowHasOpened = (props) => {
    
  };
  windowHasClosed = (props) => {

  };

  render() {
    return (
      <Map google={this.props.google}
          style={style}
          initialCenter={{
            lat: 53.410632,
            lng: -2.157533
          }}
          zoom={12}
          onClick={this.onMapClicked}
          visible={true}
          parks={this.props.parks}
          >

          {this.props.parks.map(park => (
          <Marker
            key={park.id}
            title={park.title}
            id={[park.title, park.id]}
            position={this.getPosition(park.position)}
            onClick={this.onMarkerClick}
            vicinity={this.getAddress(park.vicinity)}
            />
          ))
        }

          <InfoWindow
            key={this.state.activeMarker.title}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onOpen={this.windowHasOpened}
            onClose={this.windowHasClosed}
            title={this.state.selectedPlace.title}
            id={this.state.selectedPlace.id}>
          <div
            key={this.state.selectedPlace.id}
            className={this.state.selectedPlace.title, 'information'}>
          <h3 className="info-title">{this.state.selectedPlace.title}</h3>
          <div className="address">{this.state.selectedPlace.vicinity}</div>
          </div>
          </InfoWindow>

      </Map>
    );
  }
}
// AIzaSyCGfD8d1_EdM3fJANZ275OOsBAfIKWLqkw
export default GoogleApiWrapper({
  apiKey: ('AIzaSyCGfD8d1_EdM3fJANZ275OOsBAfIKWLqkw&libraries=places')
})(MapContainer);

const style = {
  width: '100%',
  height: '60%'
};
