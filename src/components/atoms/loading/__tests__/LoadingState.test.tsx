import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';

import {LoadingState} from 'src/components/atoms/loading/LoadingState';

describe('<LoadingState>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    instance = render(<LoadingState />);
  });

  afterEach(() => {
    instance.unmount();
  });

  it('should render `ActivityIndicator`', () => {
    expect(instance.queryByTestId('activityIndicator')).not.toBeNull();
  });
});
