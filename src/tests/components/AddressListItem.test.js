import React from 'react';
import { shallow } from 'enzyme';
import AddressListItem from '../../components/AddressListItem';
import addresses from '../helpers/addresses';

test('should render AddressListItem with fixture data', () => {
  const wrapper = shallow(<AddressListItem item={addresses[0]} />);
  expect(wrapper).toMatchSnapshot();
});