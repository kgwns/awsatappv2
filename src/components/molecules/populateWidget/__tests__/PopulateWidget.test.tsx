import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React, { useState } from 'react';
import { PopulateWidget, PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget';
import { moleculesTestID } from 'src/constants/Constants';
import { VideoItem } from '../../video-item/VideoItem';
import {useNavigation} from '@react-navigation/native';
import { PhotoGalleryItem } from '../../photogallery/PhotoGalleryItem';
import ArticlePodCastWidget from 'src/components/organisms/FavoritePodCastWidget';


jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
  useNavigationState: () => ([]),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false
}));

jest.mock('react-native-safe-area-context', () => ({
  ...jest.requireActual('react-native-safe-area-context'),
  useSafeAreaInsets: () => ({
    top: 10,
    bottom: 10
  })
}));

jest.mock("src/hooks/usePodcast", () => ({
  usePodcast: () => {
    return {
      isLoading: true,
      podcastEpisodeData: [],
      fetchPodcastEpisodeRequest: () => {
        return []
      }
    }
  },
}));

jest.mock("react-native-safe-area-context", () => {
  const insets = { top: 0 }
  return {
      useSafeAreaInsets: jest.fn().mockImplementation(() => insets)
  }
})

describe('<PopulateWidget/>', () => {
  let instance: RenderAPI;

  const sampleArticleData: any = {
    image: 'image',
    nid: 1,
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
    it('Should render widget', () => {
      expect(instance).toBeDefined();
    });

    it('Should render widget in Tab', () => {
      DeviceTypeUtilsMock.isTab = true;
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
    it('Should render widget', () => {
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
      const component = <PopulateWidget type={PopulateWidgetType.PODCAST} {...sampleArticleData}
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

  describe('when Album data only', () => {
    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      const component = <PopulateWidget type={PopulateWidgetType.ALBUM} props={sampleArticleData}
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
    it('Should call Album onPress', () => {
      const element = instance.container.findAllByType(PhotoGalleryItem)[0];
      fireEvent(element, 'onPress');
      expect(navigation.navigate).toBeTruthy();
    });
  });
});
