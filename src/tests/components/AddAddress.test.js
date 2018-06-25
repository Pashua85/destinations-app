import React from 'react';
import { shallow } from 'enzyme';
import AddAddress from '../../components/AddAddress';

test('should render AddAddress correctly', () => {
  const wrapper = shallow(<AddAddress />);
  expect(wrapper).toMatchSnapshot();
})