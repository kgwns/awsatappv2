import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../constants/SampleData';
import {VideoContent} from '..';

describe('<VideoContent>', () => {
  let instance: RenderAPI;
  const sampleData: any = [
    {
      imageUrl: 'imageUrl',
      videoLabel: 'videoLabel',
      time: 'time',
      title: 'title',
      des: 'des',
      month: 'month',
      date: 'date',
      views: 'views',
    },
  ];

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <VideoContent data={sampleData} />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render VideoContent component', () => {
    expect(instance).toBeDefined();
  });
});
