import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {
  opinionWritersArticlesData,
  storeSampleData,
} from '../../../constants/SampleData';
import {OpinionWritersArticlesSection} from '..';
import OpinionWritersCardView from 'src/components/molecules/opinionWriters/OpinionWriterCardView';
import { FlatList } from 'react-native';

describe('<OpinionWritersArticlesSection>', () => {
  let instance: RenderAPI;
  const mockFn = jest.fn();

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <OpinionWritersArticlesSection data={opinionWritersArticlesData} onScroll={mockFn} isLoading={false} onUpdateOpinionArticlesBookmark={mockFn}/>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render OpinionWritersArticlesSection component', () => {
    expect(instance).toBeDefined();
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'onEndReached');
    expect(mockFn).toBeTruthy()
  });
});
