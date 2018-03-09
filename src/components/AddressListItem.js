import React from 'react';

const AddressListItem = (props) => (
  <div>
    {props.item.addressName}
    <button className='remove-btn'>Удалить</button>
  </div>
)

export default AddressListItem;

