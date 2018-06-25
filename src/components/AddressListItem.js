import React from 'react';

const AddressListItem = (props) => (
  <div className="address-list__item">
    <div className="address-list__title">
      {props.item.formattedAddress}
    </div>
    <button className='address-list__btn remove-btn'>Delete</button>
  </div>
);

export default AddressListItem;

