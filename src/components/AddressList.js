import React from 'react';
import Reorder from 'react-reorder';
import AddressListItem from './AddressListItem';

export default class AddressList extends React.Component {

  itemClicked = (event, clickedItem, itemsIndex) => {
    if(event.target.closest('.remove-btn')) {
      this.props.deleteAddress(clickedItem.placeId)
    }
  };

  onReorder =  (
    event,
    itemThatHasBeenMoved, 
    itemsPreviousIndex, 
    itemsNewIndex, 
    reorderedArray) => {
    this.props.handleReorder(reorderedArray);
  };

  render() {

    return (
      <Reorder
        itemKey='placeId'
        lock='horizontal'
        holdTime='250'
        list={this.props.addresses}
        template={AddressListItem}
        callback={this.onReorder}
        itemClicked={this.itemClicked}
      />
    )
  }
};