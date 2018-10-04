import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  state = {
  showingInfoWindow: false,
  activeMarker: {},
  selectedPlace: {},
  };

  fetchPlaces = (mapProps, map) => {
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

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
          visible={true}>


          <Marker
            title={'Alexandra Park'}
            name={'Alexandra Park'}
            onClick={this.onMarkerClick}
            position={{lat: 53.399576, lng: -2.17249}} />
          <Marker
            title={'Heaton Moor Park'}
            name={'Heaton Moor Park'}
            onClick={this.onMarkerClick}
            position={{lat: 53.425912, lng: -2.185507}} />
          <Marker
            name={'Mersey Vale Nature Park'}
            title={'Mersey Vale Nature Park'}
            onClick={this.onMarkerClick}
            position={{lat: 53.407278, lng: -2.194373}} />
          <Marker />

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onOpen={this.windowHasOpened}
            onClose={this.windowHasClosed}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow>

      </Map>
    );
  }
}
// AIzaSyCGfD8d1_EdM3fJANZ275OOsBAfIKWLqkw
export default GoogleApiWrapper({
  apiKey: ('AIzaSyCGfD8d1_EdM3fJANZ275OOsBAfIKWLqkw')
})(MapContainer);

const style = {
  width: '100%',
  height: '100%'
};
