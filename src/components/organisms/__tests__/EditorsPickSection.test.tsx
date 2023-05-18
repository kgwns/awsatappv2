import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {ScreensConstants, storeSampleData} from '../../../constants/Constants';
import {EditorsPickSection} from 'src/components/organisms/EditorsPickSection';
import { FlatList, TouchableOpacity } from 'react-native';
import { HomePageArticleType, MainSectionBlockType } from 'src/redux/latestNews/types';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
}));
const sampleData: MainSectionBlockType[] = [
  {
    body: 'example',
    title: 'example',
    nid: '223232',
    image: 'example',
    news_categories : {
      id: '1',
      title: 'abc',
      url: 'acs',
      bundle: 'abc',
      name: 'example',
    },
    author: 'example',
    created: 'example',
    isBookmarked: true,
    type: HomePageArticleType.ARTICLE,
    blockName: 'example',
    position: 'example',
    displayType: 'example',
  },
  {
    body: 'example',
    title: 'example',
    nid: '222333',
    image: 'example',
    news_categories : {
      id: '1',
      title: '',
      url: 'acs',
      bundle: 'abc',
      name: 'example',
    },
    author: 'example',
    created: 'example',
    isBookmarked: true,
    type: HomePageArticleType.ALBUM,
    blockName: 'example',
    position: 'example',
    displayType: 'example',
  },
  {
    body: 'example',
    title: 'example',
    nid: '',
    image: 'example',
    news_categories : {
      id: '1',
      title: 'abc',
      url: 'acs',
      bundle: 'abc',
      name: 'example',
    },
    author: 'example',
    created: 'example',
    isBookmarked: true,
    type: HomePageArticleType.ALBUM,
    blockName: 'example',
    position: 'example',
    displayType: 'example',
  },
]

describe('<EditorsPickSection>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();


  const navigation = {
    navigate: jest.fn()
  }
  const titleMock = 'EditorSection';

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(navigation);
    const component = (
      <Provider store={storeSampleData}>
        <GestureHandlerRootView>
          <EditorsPickSection data={sampleData} headerRight={titleMock}/>
        </GestureHandlerRootView>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should display title and the EditorSectionList', () => {
    const titleLabel:any = instance.queryByTestId('headerRightId')
    expect(titleLabel).not.toBeNull();
    expect(titleLabel.props.children).toEqual(titleMock);
    expect(instance.queryByTestId('editorContainerId')).not.toBeNull();
  });

  test('Should call FlatList onPress', () => {
    const element = instance.container.findAllByType(FlatList)[0]
    fireEvent(element, 'renderItem', {item: sampleData[0], index: 0});
    expect(mockFunction).toBeTruthy()
  });

  test('Should navigate to ArticleDetailScreen, when the article is pressed', () => {
    const element = instance.container.findAllByType(TouchableOpacity)[0];
    fireEvent.press(element);
    expect(navigation.navigate).toHaveBeenCalled();
    expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.ARTICLE_DETAIL_SCREEN, {nid: '223232'});
  });

  test('Should navigate to PhotoGalleryScreen, when the article(album) is pressed', () => {
    const element = instance.container.findAllByType(TouchableOpacity)[1];
    fireEvent.press(element);
    expect(navigation.navigate).toHaveBeenCalled();
    expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.PHOTO_GALLERY_DETAIL_SCREEN, {nid: '222333'});
  });

  test('Should not navigate to any screens, when the nid is empty', () => {
    const element = instance.container.findAllByType(TouchableOpacity)[2];
    fireEvent.press(element);
    expect(navigation.navigate).not.toHaveBeenCalled();
  });

  test('Should display 3 articles', () => {
    const element = instance.container.findAllByType(TouchableOpacity);
    expect(element).toHaveLength(3);
  });

});

describe('<EditorsPickSection>', () => {
  let instance: RenderAPI;

  const navigation = {
    navigate: jest.fn()
  }

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true;
    (useNavigation as jest.Mock).mockReturnValue(navigation);
    const component = (
      <Provider store={storeSampleData}>
        <GestureHandlerRootView>
          <EditorsPickSection data={sampleData} />
        </GestureHandlerRootView>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should display Divider in Tab', () => {
    expect(instance.queryByTestId('dividerLineId')).not.toBeNull();
  });
});

describe('<EditorsPickSection>', () => {
  test('Should not display EditorsPickSection, if the data is empty', () => {
    const { queryByTestId } = render(
      <Provider store={storeSampleData}>
        <GestureHandlerRootView>
          <EditorsPickSection data={[]} />
        </GestureHandlerRootView>
      </Provider>
    );
    expect(queryByTestId('editorContainerId')).toBeNull();
  });

  test('Should not display title', () => {
    const { queryByTestId } = render(
      <Provider store={storeSampleData}>
        <GestureHandlerRootView>
          <EditorsPickSection data={sampleData} />
        </GestureHandlerRootView>
      </Provider>
    );
    expect(queryByTestId('headerRightId')).toBeNull();
  });

});
