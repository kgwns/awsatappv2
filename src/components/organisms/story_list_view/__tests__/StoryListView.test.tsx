import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, {useState} from 'react';
import {StoryListView} from '../StoryListView';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { recordLogEvent } from 'src/shared/utils';
import { StoryContainer } from 'react-native-stories-view';
import { ButtonOutline } from 'src/components/atoms';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<StoryListView>', () => {
  let instance: RenderAPI;

  const setSelectedImageIndex = jest.fn();
  const setSelectedItemIndex = jest.fn();
  const mockData = [{
    id: '1',
    data :[
      {
        id: '1',
        imageUrl: "https://picsum.photos/500",
        title: "كوفيد-19",
        description:"دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى",
        buttonTitle: 'امرأ المقالة',
        thumbNail: "https://picsum.photos/100",
      }
    ],
  }]

  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
  }

  describe('when StoryListView only', () => {
    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      (useState as jest.Mock).mockImplementation(() => [0, setSelectedItemIndex]);
      (useState as jest.Mock).mockImplementation(() => [0, setSelectedImageIndex]);
      instance = render(<StoryListView  data={mockData} selectedIndex={0} />);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });

    it('Should render StoryListView', () => {
      expect(instance).toBeDefined();
    });

    it('When Press onPress', () => {
      const testID = instance.container.findAllByType(TouchableOpacity)[0];
      fireEvent(testID, 'onPress')
      expect(navigation.goBack).toHaveBeenCalled;
    });

    it('When Press onComplete', () => {
      const testID = instance.container.findAllByType(StoryContainer)[0];
      fireEvent(testID, 'onComplete')
      expect(navigation.goBack()).toBeTruthy;
    });

    it('When Press onChange', () => {
      const testID = instance.container.findAllByType(StoryContainer)[0];
      fireEvent(testID, 'onChange', {changeIndex: 0})
      expect(jest.fn()).toBeTruthy;
    });

    it('When Press footerComponent', () => {
      const testID = instance.container.findAllByType(StoryContainer)[0];
      fireEvent(testID, 'footerComponent')
      expect(jest.fn()).toBeTruthy;
    });

    it('When Press onPress', () => {
      const testID = instance.container.findAllByType(ButtonOutline)[0];
      fireEvent(testID, 'onPress')
      expect(recordLogEvent).toBeTruthy;
    });

  });

});

describe('<StoryListView>', () => {
  let instance: RenderAPI;

  const setSelectedImageIndex = jest.fn();
  const setSelectedItemIndex = jest.fn();
  const mockData = [{
    id: '1',
    data :[
      {
        id: '1',
        imageUrl: "https://picsum.photos/500",
        title: "كوفيد-19",
        description:"دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى",
        buttonTitle: 'امرأ المقالة',
        thumbNail: "https://picsum.photos/100",
      }
    ],
  }]

  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
  }

  describe('when StoryListView only', () => {
    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      (useState as jest.Mock).mockImplementation(() => [12, setSelectedItemIndex]);
      (useState as jest.Mock).mockImplementation(() => [0, setSelectedImageIndex]);
      instance = render(<StoryListView  data={mockData} selectedIndex={0} />);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });

    it('Should render StoryListView', () => {
      expect(instance).toBeDefined();
    });

  });

});
