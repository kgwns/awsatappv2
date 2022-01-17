import 'react-native';
import React from 'react';
import {HomePage} from '~/components/screens/home/HomePage';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<HomePage />);
});
