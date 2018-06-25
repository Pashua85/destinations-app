import React from 'react';
import { shallow } from 'enzyme';
import AddressList from '../../components/AddressList';
import addresses from '../helpers/addresses';

let wrapper, handleReorder, deleteAddress;

beforeEach(() => {
  handleReorder = jest.fn();
  deleteAddress = jest.fn();
  wrapper = shallow(
    <AddressList 
      addresses={addresses}
      handleReorder={handleReorder}
    />
  );  
});

test('should render AddressList with addresses', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should call handleReorder on changing order', () => { 
  wrapper.find('Reorder').prop('callback')();
  expect(handleReorder).toHaveBeenCalled();
});





