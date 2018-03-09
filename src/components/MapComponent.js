import React from 'react';
import { compose, withProps } from 'recompose';
import { 
  withGoogleMap, 
  GoogleMap, 
  Marker, 
  Polyline, 
  InfoWindow
} from 'react-google-maps';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfoBox: false,
      selectAddress: null    
    };
  };

  componentDidUpdate() {
    console.log(this.state.pathCoords);
    console.log(this.props.addresses);
    if(this.props.addresses.length > 1) {
      const bounds = new window.google.maps.LatLngBounds();
      this.props.addresses.map((address, i) => {
        bounds.extend(new window.google.maps.LatLng(
          address.latLng.lat,
          address.latLng.lng
        ));
      });
      this.map.fitBounds(bounds);
    }
  }

  handleClickedMarker = (address) => () => {
    this.setState(() => ({
      selectAddress: address,
      showInfoBox: true
    }))
  };

  onStartChangePosition = ()  => {
    this.setState(() => ({
      showInfoBox: false
    }))
  };

  render() {    
    var center;
    this.props.addresses.length ?
    center = this.props.addresses[0].latLng :
    center = {
      lat: 56.80950300000001,
      lng: 60.606506999999965
    };

    return (
      <GoogleMap
        ref={ref => { this.map = ref;}}
        defaultZoom={12}  
        center={center}
      > 
        { this.props.addresses &&
        <Polyline
          path={this.props.pathCoords}
          options={{
            strokeColor: '#FF0000',
            strokeOpacity: 1.0
          }}
        />
        }
        { 
          this.props.addresses &&
          this.props.addresses.map((address, index) => {
            return (
              <Marker 
                key={address.placeId}
                position={address.latLng} 
                draggable={true}
                onDragStart={this.onStartChangePosition}
                onDragEnd={(event) => this.props.onChangePosition(address.placeId, event.latLng)}
                onClick={this.handleClickedMarker(address)}
              />
            )
          })
        }   
        {
          this.state.showInfoBox && <InfoWindow
            key={Math.random()}
            onClick={this.handleCloseInfoBox}
            position={this.state.selectAddress.latLng}
          >
            <p>{this.state.selectAddress.formattedAddress}</p>
          </InfoWindow>
        }
      </GoogleMap>
    )
  }
};

const MyMapComponent = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withGoogleMap
)(Map);

export default MyMapComponent;