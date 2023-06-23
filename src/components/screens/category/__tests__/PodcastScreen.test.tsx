import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {PodcastScreen} from 'src/components/screens/category/PodcastScreen';
import { PodcastCardSection } from 'src/components/organisms';
import {useNavigation} from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<PodcastScreen>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const navigation ={
    navigate: mockFunction
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = <GestureHandlerRootView><PodcastScreen /></GestureHandlerRootView>;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should render PodcastScreen', () => {
    expect(instance).toBeDefined();
  });

  test('Should call OpinionWritersSection onPress', () => {
    const element = instance.container.findAllByType(PodcastCardSection)[0]
    fireEvent(element, 'onPress', { imageUrl: 'abc.com', podcastTitle: 'example', announcerName: 'example'});
    expect(navigation.navigate).toBeTruthy()
  });

});
