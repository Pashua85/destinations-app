import React from 'react';
import { shallow } from 'enzyme';
import AddressList from '../../components/AddressList';
import addresses from '../helpers/addresses';

test('should render AddressList with addresses', () => {
  const wrapper = shallow(<AddressList addresses={addresses} />);
  expect(wrapper).toMatchSnapshot();
});


