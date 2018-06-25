import React from 'react';
import { shallow } from 'enzyme';
import AddAddress from '../../components/AddAddress';
import addresses from '../helpers/addresses';

let wrapper, handleError;

beforeEach(() => {
  handleError = jest.fn();
  wrapper = shallow(<AddAddress handleError={handleError} />);
});

test('should render AddAddress correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should call handleError for empty form submition', () => {
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(handleError).toHaveBeenLastCalledWith('Please add an address');  
});

test('should set new state on input value change', () => {
  wrapper.find('PlacesAutocomplete').prop('inputProps').onChange('Test address');
  expect(wrapper.state('address')).toBe('Test address');
});

