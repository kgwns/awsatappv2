import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../constants/Constants';
import {LatestNewsSummarySection} from 'src/components/organisms/LatestNewsSummarySection';
import {LatestNewsSummarySectionData} from 'src/constants/Constants';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

describe('<LatestNewsSummarySection>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <GestureHandlerRootView>
          <LatestNewsSummarySection data={LatestNewsSummarySectionData} />
        </GestureHandlerRootView>
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
