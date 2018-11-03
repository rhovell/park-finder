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
            position={this.getPosition(park.position)}
            onClick={this.onMarkerClick}
            />
          ))
        }
        {this.props.parks.map(park => (
          <div key={park.id}
          className="pop-up">
          <InfoWindow

            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onOpen={this.windowHasOpened}
            onClose={this.windowHasClosed}
            title={park.title}
          />

          <div className="info-title">{park.title}</div>
          </div>
          ))
        }
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
