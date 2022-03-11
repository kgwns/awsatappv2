import React from 'react';
import { render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/SampleData';
import {KeepNotifiedScreen} from '../KeepNotifiedScreen';

describe('<KeepNotifiedScreen>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <KeepNotifiedScreen route={{params: {canGoBack: false}}} />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render KeepNotifiedScreen', () => {
    expect(instance).toBeDefined();
  });
});
