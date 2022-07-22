import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { PopulateWidget, PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget';
import { moleculesTestID } from 'src/constants';
import { VideoItem } from '../../video-item/VideoItem';
import {useNavigation} from '@react-navigation/native';
import { ArticlePodCastWidget } from 'src/components/organisms';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<PopulateWidget/>', () => {
  let instance: RenderAPI;

  const sampleArticleData: any = {
    image: 'image',
    nid: 'nid',
    author: 'author',
    created: 'created'
  }

  const mockOnPressBookmark = jest.fn()
  const navigation = {
    navigate: mockOnPressBookmark,
  }

  describe('when article data only', () => {
    beforeEach(() => {
      const component = <PopulateWidget type={PopulateWidgetType.ARTICLE} props={sampleArticleData}
        onPressBookmark={mockOnPressBookmark} />;
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render SectionVideoFooter', () => {
      expect(instance).toBeDefined();
    });

    it('Should Press bookMark', () => {
      const element = instance.getByTestId(moleculesTestID.storySaveBtn);
      fireEvent.press(element);
    });
  });

  describe('when empty data only', () => {
    beforeEach(() => {
      const component = <PopulateWidget props={null}
        onPressBookmark={mockOnPressBookmark} />;
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render SectionVideoFooter', () => {
      expect(instance).toBeDefined();
    });
  });

  describe('when opinion data only', () => {
    beforeEach(() => {
      const component = <PopulateWidget type={PopulateWidgetType.OPINION} props={sampleArticleData}
        onPressBookmark={mockOnPressBookmark} />;
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render widget', () => {
      expect(instance).toBeDefined();
    });
  });

  describe('when podcast data only', () => {
    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      const component = <PopulateWidget type={PopulateWidgetType.PODCAST} props={sampleArticleData}
        onPressBookmark={mockOnPressBookmark} />;
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render widget', () => {
      expect(instance).toBeDefined();
    });
    it('Should call ArticlePodCastWidget onPress', () => {
      const element = instance.container.findAllByType(ArticlePodCastWidget)[0];
      fireEvent(element, 'onPress');
      expect(navigation.navigate).toBeTruthy();
    });
  });

  describe('when video data only', () => {
    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      const component = <PopulateWidget type={PopulateWidgetType.VIDEO} props={sampleArticleData}
        onPressBookmark={mockOnPressBookmark} />;
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render widget', () => {
      expect(instance).toBeDefined();
    });
    it('Should call VideoItem onPress', () => {
      const element = instance.container.findAllByType(VideoItem)[0];
      fireEvent(element, 'onPress');
      expect(navigation.navigate).toBeTruthy();
    });
  });
});
