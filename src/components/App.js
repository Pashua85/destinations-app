import React from 'react';
import { getLatLng } from 'react-places-autocomplete';
import AddAddress from './AddAddress';
import AddressList from './AddressList';
import ErrorMessage from './ErrorMessage';
import Header from './Header';
import MapComponent from './MapComponent';

function geoCodeLocation(latLng) {
  // return a Promise
  return new Promise(function(resolve,reject) {
    var geocoder = new window.google.maps.Geocoder;
    geocoder.geocode( { 'location': latLng}, function(results, status) {
      if (status === 'OK') {
        // resolve results upon a successful status
        resolve(results);
      } else {
        // reject status upon un-successful status
        reject(status);
      }
    });
  });
};

class App extends React.Component {
  state = {
    addresses: [],
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

  areAllBuildingsInRussia = (addresses) => {
    const index = addresses.findIndex(address => {
      if(address.addressComponents.length === 6 ||
        address.addressComponents.length === 7) {
        return (address.addressComponents[5].short_name !== 'RU' &&
          address.addressComponents[4].short_name !== 'RU')
      } else {
        return true;
      }
    })
    return index === -1;
  };

  setAddressNames = (addresses) => {
    const allInRussia = this.areAllBuildingsInRussia(addresses);
    this.setState((prevState) => ({
      addresses: prevState.addresses.map(address => {
        if(allInRussia) {
          address.addressName = address.formattedAddress.split(', ').slice(0,-2).join(', ');
          return address;
        } else {
          address.addressName = address.formattedAddress;
          return address;
        }
      })
    }))
  } 

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
      console.log(this.areAllBuildingsInRussia(this.state.addresses));
      this.setAddressNames(this.state.addresses);
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
    this.setAddressNames(this.state.addresses);
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
        this.setAddressNames(this.state.addresses);
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