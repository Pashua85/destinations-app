import React from 'react';

const AddressListItem = (props) => (
  <div>
    {props.item.addressName}
    <button className='remove-btn'>Delete</button>
  </div>
)

export default AddressListItem;

