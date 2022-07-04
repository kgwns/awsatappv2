import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../constants/SampleData';
import {EditorsPickSection} from 'src/components/organisms/EditorsPickSection';
import {EditorsPickSectionData} from 'src/constants/SampleData';

describe('<EditorsPickSection>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <EditorsPickSection data={EditorsPickSectionData} />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render EditorsPickSection component', () => {
    expect(instance).toBeDefined();
  });
});
