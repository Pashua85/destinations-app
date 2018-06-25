import React from 'react';
import { shallow } from 'enzyme';
import App from '../../components/App';
import addresses from '../helpers/addresses';
import pathCoords from '../helpers/pathCoords';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<App />);
  addresses.forEach(address => {
    wrapper.find('AddAddress').prop('addAddress')(address);
  });
})

test('should render App', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should add addresses', () => {
  expect(wrapper.state('addresses')).toEqual(addresses);
});

test('should set pathCoords', () => {
  expect(wrapper.state('pathCoords')).toEqual(pathCoords);
});

test('should delete address', () => {
  const placeIdToDelete = addresses[0].placeId;
  wrapper.find('AddressList').prop('deleteAddress')(placeIdToDelete);
  expect(wrapper.state('addresses').length).toEqual(addresses.length - 1);
});

test('should set error message and render it correctly', () => {
  wrapper.find('AddAddress').prop('handleError')('Test error message');
  expect(wrapper.state('errorMessage')).toBe('Test error message');
  expect(wrapper).toMatchSnapshot();
});

test('should reorder addresses and set new pathCoords', () => {
  const reverseAddresses = addresses.slice().reverse();
  const reverseCoords = pathCoords.slice().reverse();
  wrapper.find('AddressList').prop('handleReorder')(reverseAddresses);
  expect(wrapper.state('addresses')).toEqual(reverseAddresses);
  expect(wrapper.state('pathCoords')).toEqual(reverseCoords);
});

test('should throw an error for trying to duplicate address', () => {
  wrapper.find('AddAddress').prop('addAddress')(addresses[0]);
  expect(wrapper.state('addresses').length).toEqual(addresses.length);
  expect(wrapper.state('errorMessage')).toEqual('This address is already in the route');
});


