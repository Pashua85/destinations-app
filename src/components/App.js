import React from 'react';
import AddAddress from './AddAddress';
import AddressList from './AddressList';
import ErrorMessage from './ErrorMessage';
import Header from './Header';
import MapContainer from './MapContainer';

class App extends React.Component {
  state = {
    addresses: [],
    errorMessage: ''
  };

  handleError = (errorMessage) => {
    this.setState(() => ({ errorMessage }));
  };

  isUniqueAddress = (placeId) => {
    if(this.state.addresses.length > 0) {
      const repeatingAddress = this.state.addresses.filter(address => {
        return address.place_id === placeId;
      });
      return repeatingAddress.length === 0;
    }
    return true;
  }; 

  addAddress = (address) => {
    if(this.isUniqueAddress(address.place_id) || this.state.addresses.length === 0) {
      this.setState((prevState) => (
        { 
          addresses: prevState.addresses.concat(address),
          errorMessage: ''
        }
      ));
    } else {
      this.handleError('Эта точка уже есть в маршруте')
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="widget">
            <AddAddress 
              addAddress={this.addAddress}
              handleError={this.handleError}
            />
            <ErrorMessage errorMessage={this.state.errorMessage} />
            <AddressList />
          </div>
          <MapContainer />
        </div>
      </div>
    )
  }
};

export default App;