import React from 'react';
import { shallow } from 'enzyme';
import MapComponent from '../../components/MapComponent';
import addresses from '../helpers/addresses';

test('should render MapComponent correctly', () => {
  const wrapper = shallow(<MapComponent addresses={addresses} />);
  expect(wrapper).toMatchSnapshot();
});