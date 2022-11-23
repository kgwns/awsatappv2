import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../constants/Constants';
import {mostPlayedSectionData} from 'src/constants/Constants';
import {MostPlayedSection} from '..';

describe('<MostPlayedSection>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <MostPlayedSection data={mostPlayedSectionData} />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render MostPlayedSection component', () => {
    expect(instance).toBeDefined();
  });
});
