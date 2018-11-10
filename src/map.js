import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    this.windowHasOpened(props);
    console.log(this.state.activeMarker)
  };

  onMapClick = (props) => {
     if (this.state.showingInfoWindow) {
       this.setState({
         showingInfoWindow: false,
         activeMarker: null
       });
     }
   }

  getPosition = (position) => {
      var iterator = position.values();
      let lat = iterator.next().value;
      let lang = iterator.next().value;
      return {lat: lat ,lng: lang};
  };

  getAddress = (address) => {
    var formatAddress = address.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '\n');
    // console.log(address)
    return formatAddress;
  }

  windowHasOpened = (props) => {
    console.log(props)
  };
  windowHasClosed = (props) => {

  };

componentDidUpdate(nextProps, prevProps) {
  // console.log(prevProps)
  console.log(nextProps)
  console.log(this.state.activeMarker)
  let selectMarker = nextProps;
  let previous = prevProps
   if (this.props.choosen !== selectMarker.choosen) {
     this.setState({ activeMarker : selectMarker })
     console.log(this.state.activeMarker)
  }
}



  render() {

    return (
      <Map google={this.props.google}
          style={style}
          initialCenter={{
            lat: 53.410632,
            lng: -2.157533
          }}
          zoom={12}
          onClick = { this.onMapClick }
          visible={true}
          parks={this.props.parks}
          changePlace={this.props.onPlaceChange}
          choosen={this.props.choosen}
          >

          {this.props.parks.map(park => (
          <Marker
            key={park.id}
            choosen={this.props.choosen}
            title={park.title}
            id={park.title}
            position={this.getPosition(park.position)}
            onClick={this.onMarkerClick}
            vicinity={this.getAddress(park.vicinity)}
            className={"marker "+park.title}
            changePlace={this.props.onPlaceChange}
            />
          ))
        }

          <InfoWindow
            key={this.props.parks.title}
            choosen={this.props.choosen}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onOpen={this.windowHasOpened}
            onClose={this.windowHasClosed}
            title={this.state.selectedPlace.title}
            id={this.state.selectedPlace.id}
            changePlace={this.props.onPlaceChange}
            >
          <div
            key={this.state.selectedPlace.id}
            className={this.state.selectedPlace.title+' information'}>
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
})(GoogleMapsContainer);

const style = {
  width: '90vw',
  height: '90vh',
  'marginTop': '1em',
  'marginLeft': 'auto',
  'marginRight': 'auto'
};
