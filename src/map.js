import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Parks from './parks';
import * as parkData from './parkData'

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
    this.componentDidMount();
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
          >


          <Marker
            title={'Alexandra Park'}
            name={'Alexandra Park'}
            position={{lat: 53.45094, lng: -2.24502}}
            info={[]}
            onClick={this.onMarkerClick} />
          <Marker
            title={'Heaton Moor Park'}
            name={'Heaton Moor Park'}
            position={{lat: 53.425912, lng: -2.185507}}
            onClick={this.onMarkerClick} />
          <Marker
            name={'Mersey Vale Nature Park'}
            title={'Mersey Vale Nature Park'}
            address={'Stockport, SK4 3EA'}
            onClick={this.onMarkerClick} />
          <Marker
            name={'Abney Hall Park'}
            title={'Abney Hall Park'}
            position={{lat: 53.398543, lng: -2.21045}}
            onClick={this.onMarkerClick} />
          <Marker
            name={'Reddish Vale Country Park'}
            title={'Reddish Vale Country Park'}
            position={{lat: 53.437132, lng: -2.146727}}
            onClick={this.onMarkerClick} />
          <Marker
            name={'Woodbank Park'}
            title={'Woodbank Park'}
            position={{lat: 53.410599, lng: -2.141143}}
            onClick={this.onMarkerClick} />
          <Marker />

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onOpen={this.windowHasOpened}
            onClose={this.windowHasClosed}>
              <div>
                <h3>{this.state.selectedPlace.name}</h3>
                <div className="address">{this.state.selectedPlace.address}</div>
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
