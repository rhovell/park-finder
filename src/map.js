import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick = (props, marker, e) => {
    console.log('selected marker is ' + marker)
    this.props.onPlaceChange(props, marker, e)
  };

  componentDidUpdate(nextProps, prevProps){
    if(this.props.choosen){
      let choosen = this.props.choosen;
      console.log('map choosen place is ' + choosen)
    }

  }

  render() {
    const selectMarker = this.props.choosen;
    return (
      <Map google={this.props.google}
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
          markers={this.props.children}
          centerAroundCurrentLocation={true}
          >

             {this.props.parks.map(park => (
              <Marker
                park={park}
                name={park.title}
                key={park.id}
                title={park.title}
                id={park.title}
                onClick={this.onMarkerClick}
                position={this.props.getPosition(park.position)}
                vicinity={this.props.getAddress(park.vicinity)}
                className={"marker "+park.title}
                value={this.props.value}
                animation={this.props.animation}
                showingInfoWindow={this.props.showingInfoWindow}
                activeMarker={this.props.activeMarker}
                choosen={this.props.choosen}
                />
              ))
            }

          <InfoWindow
            key={this.props.choosen.title ? this.props.choosen.title : ''}
            title={this.props.choosen.title ? this.props.choosen.title : ''}
            id={this.props.choosen.id ? this.props.choosen.id : ''}
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
          <div className="address">{this.props.choosen.vicinity ? this.props.choosen.vicinity : ''}</div>
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
