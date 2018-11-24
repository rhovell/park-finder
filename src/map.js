import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: this.props.showingInfoWindow,
      activeMarker: this.props.activeMarker,
      selectedPlace: this.props.choosen,
      animation: this.props.animation
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }
  // handle marker click, sends props to props.onPlaceChange
  onMarkerClick = (props, marker, e) => {
    this.props.onPlaceChange(props, marker, e)
  };


  render() {
    return (
      <Map
          google={this.props.google}
          style={style}
          initialCenter={{
            lat: 53.410632,
            lng: -2.157533
          }}
          zoom={12}
          onClick = { this.props.onMapClick }
          visible={true}
          parks={this.props.parks}
          changePlace={this.props.onPlaceChange}
          id={'mapMain'}
          className={'map'}
          value={this.props.value}
          showingInfoWindow={this.props.showingInfoWindow}
          activeMarker={this.props.activeMarker}
          choosen={this.props.choosen}
          centerAroundCurrentLocation={true}
          ZoomControlStyle={1}
          children={this.props.children}
          >

             {this.props.parks.map(park => (
              <Marker
                google={this.props.google}
                park={park}
                name={park.title}
                key={park.id}
                title={park.title}
                id={park.title}
                onClick={this.onMarkerClick}
                position={this.props.getPosition(park.position)}
                vicinity={this.props.getAddress(park.vicinity)}
                className={"marker "+park.title}
                choosen={this.props.choosen}
                ref={this.props.onMarkerCreated}
                />
              ))
            }

          <InfoWindow
            key={this.props.choosen.title}
            title={this.props.choosen.title}
            id={this.props.choosen.id}
            // position={this.props.getPosition(this.props.choosen.position)}
            // vicinity={this.props.getAddress(this.props.choosen.vicinity)}
            onOpen={this.windowHasOpened}
            onClose={this.windowHasClosed}
            changePlace={this.props.onPlaceChange}
            value={this.props.value}
            marker={this.props.activeMarker}
            visible={this.props.showingInfoWindow}
            showingInfoWindow={this.props.showingInfoWindow}
            choosen={this.props.choosen}
            >
          <div
            key={this.props.choosen.id? this.props.choosen.id : ''}
            className={this.props.choosen.title ? this.props.choosen.title+' information' : ''}>
          <h3 className="info-title">{this.props.choosen.title ? this.props.choosen.title : ''}</h3>
          <div className="address">{this.props.choosen.vicinity ? this.props.getAddress(this.props.choosen.vicinity) : ''}</div>
          </div>
          </InfoWindow>

      </Map>
    );
  }
}
// AIzaSyCGfD8d1_EdM3fJANZ275OOsBAfIKWLqkw
export default GoogleApiWrapper({
  apiKey: ('AIzaSyCGfD8d1_EdM3fJANZ275OOsBAfIKWLqkw&libraries=places')
})(GoogleMapsContainer);

const style = {
  width: '90vw',
  height: '90vh',
  'marginTop': '1em',
  'marginLeft': 'auto',
  'marginRight': 'auto'
};
