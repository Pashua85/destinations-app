import React from 'react';

export default class AddressListItem extends React.Component {
  render() {
    const addressArray = this.props.item.address.split(', ');
    const addressString = addressArray.slice(0,addressArray.length - 1).join(', ');

    return (
      <p>{addressString}</p>
    )
  }
}

