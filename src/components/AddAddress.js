import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

export default class AddAddress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: ''
    };
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    
    if(this.state.address) {
      this.handleSelect(this.state.address)
    } else {
      this.props.handleError('Введите название точки маршрута');
    }
  };

  handleSelect = (address) => {
    this.setState(() => ({ address }))

    let newAddress = {};
    geocodeByAddress(address)
      .then(results => {
        newAddress.formattedAddress = results[0].formatted_address;
        newAddress.placeId = results[0].place_id;

        if(results[0].address_components) {
          newAddress.addressComponents = results[0].address_components; 
        } else {
          newAddress.addressComponents = [];
        };
        console.log(results[0]);
        return getLatLng(results[0]);
      })
      .then(latLng => {
        newAddress.latLng = latLng;
        this.props.addAddress(newAddress);
        this.setState(() => ({ address: '' }))
      })
      .catch(error => {
        console.log('Error', error);
        this.setState(() => ({ address: ''}));
        this.props.handleError('Не удалось полусить данные о точке')
      })
  };

  handleChange = (address) => {
    this.setState(() => ({ address }));
  };

  onError = () => {};

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.handleChange
    }

    return (
      <form onSubmit={this.handleFormSubmit} id="add-address-form">
        <PlacesAutocomplete 
          inputProps={inputProps} 
          onSelect={this.handleSelect}
          onEnterKeyDown={this.handleSelect}
          onError={this.onError}
        />
        <button type="submit">Добавить</button>
      </form>
    )
  }
};