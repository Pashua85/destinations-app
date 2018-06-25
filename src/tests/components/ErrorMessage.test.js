import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from '../../components/ErrorMessage';

test('should render ErrorMessage correctly', () => {
  const wrapper = shallow(<ErrorMessage errorMessage={'Test error message'} />);
  expect(wrapper).toMatchSnapshot();
})