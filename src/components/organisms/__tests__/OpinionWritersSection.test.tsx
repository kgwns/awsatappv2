import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {
  opinionWritersData,
  storeSampleData,
} from '../../../constants/SampleData';
import {OpinionWritersSection} from '..';

describe('<OpinionWritersSection>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <OpinionWritersSection data={opinionWritersData} onPressWriter={function (tid: string): void {
          throw new Error('Function not implemented.');
        } } />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render OpinionWritersSection component', () => {
    expect(instance).toBeDefined();
  });
});
