import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
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
          animation={this.props.animation}
          centerAroundCurrentLocation={true}
          ZoomControlStyle={1}
          children={this.props.children}
          >

             {this.props.parks.map(park => (
              <Marker
                value={this.props.value}
                showingInfoWindow={this.props.showingInfoWindow}
                activeMarker={this.props.activeMarker}
                centerAroundCurrentLocation={true}
                animation={this.props.animation}
                google={this.props.google}
                park={park}
                name={park.title}
                key={park.id}
                onClick={this.onMarkerClick}
                position={this.props.getPosition(park.position)}
                vicinity={this.props.getAddress(park.vicinity)}
                className={"marker "+park.title}
                ref={this.props.onMarkerCreated}
                id={park.title}
                />
              ))
            }
          <InfoWindow
            key={this.props.activeMarker.title ? this.props.activeMarker.title : ''}
            id={this.props.activeMarker.title ? this.props.activeMarker.id : ''}
            title={this.props.activeMarker.title ? this.props.activeMarker.title : ''}
            // changePlace={this.props.onPlaceChange}
            value={this.props.value}
            marker={this.props.activeMarker}
            visible={this.props.showingInfoWindow}
            centerAroundCurrentLocation={true}
            animation={this.props.animation}
            onOpen={this.props.windowHasOpened}
            onClose={this.props.windowHasClosed}
            >
          <div
            key={this.props.activeMarker.name ? this.props.activeMarker.name +'Info' : ''}
            className={this.props.activeMarker.name ? this.props.activeMarker.name+' information' : ''}>
          <h3 className="info-title">{this.props.activeMarker.name ? this.props.activeMarker.name : ''}</h3>
          <div className="address">{this.props.activeMarker.name ? this.props.getAddress(this.props.activeMarker.vicinity) : ''}</div>
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
  width: '95vw',
  height: '85vh',
  top: '5%',
  'marginTop': '2em',
  'marginLeft': 'auto',
  'marginRight': 'auto'
};
