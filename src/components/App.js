import React from 'react';
import { getLatLng } from 'react-places-autocomplete';
import AddAddress from './AddAddress';
import AddressList from './AddressList';
import ErrorMessage from './ErrorMessage';
import Header from './Header';
import MapComponent from './MapComponent';

function geoCodeLocation(latLng) {
  return new Promise(function(resolve,reject) {
    var geocoder = new window.google.maps.Geocoder;
    geocoder.geocode( { 'location': latLng}, function(results, status) {
      if (status === 'OK') {
        resolve(results);
      } else {
        reject(status);
      }
    });
  });
};

class App extends React.Component {
  state = {
    addresses: [
      {
         formattedAddress: 'ул. Щорса, 94А, Екатеринбург, Свердловская обл., Россия, 620144',
         latLng: {
           lat: 56.80950300000001,
           lng: 60.606506999999965
         },
         placeId: "ChIJc8sXNttuwUMRWSTSqEBCxrY"
      },
      {
         formattedAddress: 'ул. Чайковского, 62, Екатеринбург, Свердловская обл., Россия, 620130',
         latLng: {
           lat: 56.8073729,
           lng: 60.62031009999998
         },
         placeId: 'ChIJASguT89uwUMRMbx0H8V2uNk'
      },
    ],
    errorMessage: '',
    pathCoords: []
  };

  handleError = (errorMessage) => {
    this.setState(() => ({ errorMessage }));
  };

  setPathCoords = () => {
    this.setState((prevState) => ({
      pathCoords: prevState.addresses.map(address => address.latLng)
    }))
  }; 

  isUniqueAddress = (placeId) => {
    if(this.state.addresses.length > 0) {
      const repeatingAddress = this.state.addresses.filter(address => {
        return address.placeId === placeId;
      });
      return repeatingAddress.length === 0;
    }
    return true;
  }; 

  addAddress = (address) => {
    if(this.isUniqueAddress(address.placeId) || this.state.addresses.length === 0) {
      this.setState((prevState) => (
        { 
          addresses: prevState.addresses.concat(address),
          errorMessage: ''
        }
      ));
      this.setPathCoords();
    } else {
      this.handleError('Эта точка уже есть в маршруте')
    }
  };

  reorderAddreses = (addresses) => {
    this.setState(() => ({ addresses }));
    this.setPathCoords();
  };

  deleteAddress = (placeId) => {
    this.setState(prevState => ({
      addresses: prevState.addresses.filter(address => address.placeId !== placeId)
    }));
    this.setPathCoords();
  };

  onChangePosition = (oldPlaceId, newLatLng ) => {
    
    let newAddress = {};
    geoCodeLocation(newLatLng)
      .then(results => {
        newAddress.formattedAddress = results[0].formatted_address;
        newAddress.placeId = results[0].place_id;
        newAddress.addressComponents = results[0].address_components;
        return getLatLng(results[0]);
      })
      .then(latLng => {
        newAddress.latLng = latLng;
        const addressesCopy = this.state.addresses.slice();
        const newAddresses = addressesCopy.map(address => {
          if (address.placeId === oldPlaceId) {
            return newAddress
          } else {
            return address
          }
          
        });
        this.setState(() => ({ addresses: newAddresses }));
        this.setPathCoords();
      })
      .catch(error => {
        console.log('Error', error);
      })
  };

  render() {
    return (
      <div className="app-container">
        <Header />
        <div className="main-container container">
          <div className="widget">
            <AddAddress 
              addAddress={this.addAddress}
              handleError={this.handleError}
            />
            <ErrorMessage errorMessage={this.state.errorMessage} />
            <AddressList 
              handleReorder={this.reorderAddreses} 
              addresses={this.state.addresses}
              deleteAddress={this.deleteAddress}
            />
          </div>
          <MapComponent
            isMarkerShown addresses={this.state.addresses} 
            onChangePosition={this.onChangePosition}
            pathCoords={this.state.pathCoords}
          />
        </div>
      </div>
    )
  }
};

export default App;