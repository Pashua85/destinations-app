import React from 'react';
import { shallow } from 'enzyme';
import MapComponent from '../../components/MapComponent';
import addresses from '../helpers/addresses';
import pathCoords from '../helpers/pathCoords';


test('should render MapComponent correctly', () => {
  const wrapper = shallow(
    <MapComponent addresses={addresses} pathCoords={pathCoords} />
  );
  expect(wrapper).toMatchSnapshot();
});