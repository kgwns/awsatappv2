import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, {useState} from 'react';
import {StoryListView} from '../StoryListView';
import {TouchableWithoutFeedback} from 'react-native';
import { SearchBar } from 'src/components/molecules'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('<StoryListView>', () => {
  let instance: RenderAPI;
  const mockString = jest.fn();
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

  describe('when StoryListView only', () => {
    beforeEach(() => {
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
  });

});
