import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../constants/Constants';
import {LatestNewsSummarySection} from 'src/components/organisms/LatestNewsSummarySection';
import {LatestNewsSummarySectionData} from 'src/constants/Constants';

describe('<LatestNewsSummarySection>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <LatestNewsSummarySection data={LatestNewsSummarySectionData} />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render LatestNewsSummarySection component', () => {
    expect(instance).toBeDefined();
  });
});
