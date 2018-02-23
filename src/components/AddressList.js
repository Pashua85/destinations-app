import React from 'react';
import Reorder from 'react-reorder';
import AddressListItem from './AddressListItem';

export default class AddressList extends React.Component {
  onReorder(
    event,
    itemThatHasBeenMoved, 
    itemsPreviousIndex, 
    itemsNewIndex, 
    reorderedArray) {
    this.props.handleReorder(reorderedArray);
  };

  render() {
    return (
      <Reorder
        itemKey='place_id'
        lock='horizontal'
        holdTime='250'
        list={this.props.addresses}
        template={AddressListItem}
        callback={this.onReorder.bind(this)}
      />
    )
  }
};