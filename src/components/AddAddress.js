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
      let newAddress = {};
      geocodeByAddress(this.state.address)
        .then(results => {
          newAddress.address = results[0].formatted_address;
          newAddress.place_id = results[0].place_id;
          newAddress.address_components = results[0].address_components;
          return getLatLng(results[0]);
        })
        .then(lanLng => {
          newAddress.lanLng = lanLng;
          console.log(newAddress);
          this.props.addAddress(newAddress);
          this.setState(() => ({ address: '' }))
        })
        .catch(error => {
          console.log('Error', error);
          this.setState(() => ({ address: ''}));
          this.props.handleError('Не удалось полусить данные о точке')
        })
    } else {
      this.props.handleError('Введите название точки маршрута');
    }
  };

  handleSelect = (address) => {
    this.setState(() => ({ address }))

    let newAddress = {};
    geocodeByAddress(address)
      .then(results => {
        newAddress.address = results[0].formatted_address;
        newAddress.place_id = results[0].place_id;
        newAddress.address_components = results[0].address_components;
        return getLatLng(results[0]);
      })
      .then(lanLng => {
        newAddress.lanLng = lanLng;
        console.log(newAddress);
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