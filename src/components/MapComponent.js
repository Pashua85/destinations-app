import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs,
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
      selectAddress: null, 
      draggableItem: null
    };
  };

  componentDidMount() {
    if(this.props.addresses.length) {
      const bounds = new window.google.maps.LatLngBounds();
      this.props.addresses.map((address, i) => {
        bounds.extend(new window.google.maps.LatLng(
          address.latLng.lat,
          address.latLng.lng
        ));
      });
      this.map.fitBounds(bounds);
    }
  };

  componentDidUpdate() {
    if(this.props.addresses.length) {
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
    const pathCoords = this.props.addresses.map(address => address.latLng);
    let defaultCenter;
    this.props.addresses ?
      defaultCenter = {
        lat: 56.80950300000001,
        lng: 60.606506999999965
      } :
      defaultCenter = this.props.addresses[0].latLng;  

    return (
      <GoogleMap
        ref={ref => { this.map = ref;}}
        defaultZoom={12}  
        defaultCenter={defaultCenter}
      > { this.props.addresses &&
        <Polyline
          path={pathCoords}
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
                key={index}
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
            <p>{this.state.selectAddress.address}</p>
          </InfoWindow>
        }
      </GoogleMap>
    )
  }
};

const MyMapComponent = compose(
  withProps({
    //googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDtqFU3lz7jKSCxTj_qc7iNjvCadpmT5Ls&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  //withScriptjs,
  withGoogleMap
)(Map);

export default MyMapComponent;