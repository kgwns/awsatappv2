import React, { useState } from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from '../../../constants/Constants';
import { VideoContent } from '..';
import { VideoItemType } from 'src/redux/videoList/types';
import { ImageWithIcon, Label } from 'src/components/atoms';
import Share from 'react-native-share';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('src/services/videoDetailService',() => ({
  ...jest.requireActual('src/services/videoDetailService'),
  getVideoDetail: jest.fn().mockReturnValueOnce([{
    title: 'title',
    field_shorturl_export: 'field_shorturl_export',
    link_node: 'link_node',
    body_export: 'body_export'
  }])
}))

describe('<VideoContent>', () => {
  let instance: RenderAPI;
  const sampleData: VideoItemType[] = [
    {
      nid: '1',
      title: '123',
      isBookmarked: true,
      field_jwplayerinfo_export:'field_jwplayerinfo_export',
      field_thumbnil_multimedia_export:'field_thumbnil_multimedia_export'
    },
    {
      nid: '2',
      title: '124',
      isBookmarked: true,
      field_jwplayerinfo_export:'field_jwplayerinfo_export',
      field_thumbnil_multimedia_export:'field_thumbnil_multimedia_export'
    },
    {
      nid: '3',
      title: '124',
      isBookmarked: true,
      field_jwplayerinfo_export:'field_jwplayerinfo_export',
      field_thumbnil_multimedia_export:'field_thumbnil_multimedia_export'
    },
  ];
  const onPressMock = jest.fn();
  const setState = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    DeviceTypeUtilsMock.isTab = true;
    (useState as jest.Mock).mockImplementation(() => [false,setState])
    const component = (
      <Provider store={storeSampleData}>
        <GestureHandlerRootView>
          <VideoContent data={sampleData} isVideoList = {false} onPress={onPressMock} isTabDesign={true} />
        </GestureHandlerRootView>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should display title when the video is displayed in SectionStoryScreen', () => {
    expect(instance.queryByTestId('videoContentTitleId')).not.toBeNull();
  });

  it('should click a video and call onPress function', () => {
    const testId = instance.getAllByTestId('videoContentPressId')[0];
    fireEvent(testId, 'onPress');
    expect(onPressMock).toHaveBeenCalled();
  });

  it("should render label onTextLayout with event in Tab", () => {
    const element = instance.container.findAllByType(Label)[1];
    fireEvent(element,'onTextLayout',{nativeEvent:{lines:'event'}});
    expect(element.props.numberOfLines).toEqual(3);
  });

  it("should render ImageWithIcon, when the item press", () => {
    const element = instance.container.findAllByType(ImageWithIcon)[0];
    fireEvent(element,'onPress');
    expect(onPressMock).toHaveBeenCalled();
  });

  it('Should display Share icon when the video is displayed in SectionStoryScreen', () => {
    expect(instance.queryAllByTestId('shareId')[0]).not.toBeNull();
  });

  it("should click share icon and shared the video",() => {
    jest.spyOn(Share,'open').mockResolvedValueOnce({response: true} as any);
    const shareId = instance.getAllByTestId('shareId')[0];
    fireEvent.press(shareId);
  })

});

describe('<VideoContent>', () => {
  let instance: RenderAPI;
  const sampleData: VideoItemType[] = [
    {
      nid: '1',
      title: '123',
      isBookmarked: true,
      field_jwplayerinfo_export:'field_jwplayerinfo_export',
      field_thumbnil_multimedia_export:'field_thumbnil_multimedia_export'
    },
    {
      nid: '2',
      title: '124',
      isBookmarked: true,
      field_jwplayerinfo_export:'field_jwplayerinfo_export',
      field_thumbnil_multimedia_export:'field_thumbnil_multimedia_export'
    },
    {
      nid: '3',
      title: '124',
      isBookmarked: true,
      field_jwplayerinfo_export:'field_jwplayerinfo_export',
      field_thumbnil_multimedia_export:'field_thumbnil_multimedia_export'
    },
  ];
  const onPressMock = jest.fn();
  const setState = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    DeviceTypeUtilsMock.isTab = true;
    jest.spyOn(Share,'open').mockRejectedValueOnce({response: false} as any);
    (useState as jest.Mock).mockImplementation(() => [false,setState])
    const component = (
      <Provider store={storeSampleData}>
        <GestureHandlerRootView>
          <VideoContent data={sampleData} onPress={onPressMock} isTabDesign={true} />
        </GestureHandlerRootView>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it("should click share icon and cancelled the share request", async() => {
    const shareId = instance.getAllByTestId('shareId')[0];
    fireEvent.press(shareId);
  })
});

describe('<VideoContent>', () => {
  let instance: RenderAPI;
  const sampleData: VideoItemType[] = [
    {
      nid: '1',
      title: '123',
      isBookmarked: true
    },
    {
      nid: '2',
      title: '124',
      isBookmarked: true
    },
    {
      nid: '3',
      title: '124',
      isBookmarked: true
    },
  ];
  const onPressMock = jest.fn();
  const setIsTwoLine = jest.fn();

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false;
    (useState as jest.Mock).mockImplementation(() => [true,setIsTwoLine]);
    const component = (
      <Provider store={storeSampleData}>
        <GestureHandlerRootView>
          <VideoContent data={sampleData} onPress={onPressMock} isVideoList = {true} />
        </GestureHandlerRootView>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should display Divider when the video is displayed in mainSectionScreen', () => {
    expect(instance.queryAllByTestId('dividerLineId')[0]).not.toBeNull();
  });

  it('Should not display title when the video is displayed in mainSectionScreen', () => {
    expect(instance.queryByTestId('videoContentTitleId')).toBeNull();
  });

  it('should click a video and call onPress function', () => {
    const testId = instance.getAllByTestId('videoContentPressId')[0];
    fireEvent(testId, 'onPress');
    expect(onPressMock).toHaveBeenCalled();
  });

  it("should render label onTextLayout with event", () => {
    const element = instance.container.findAllByType(Label)[1];
    fireEvent(element,'onTextLayout',{nativeEvent:{lines:'event'}});
  });

  it("should render ImageWithIcon, when the item press", () => {
    const element = instance.container.findAllByType(ImageWithIcon)[0];
    fireEvent(element,'onPress');
    expect(onPressMock).toHaveBeenCalled();
  });

  it('Should not display Share icon when the video is displayed in mainSectionScreen', () => {
    expect(instance.queryByTestId('shareId')).toBeNull();
  });
});

describe('<VideoContent>', () => {
  let instance: RenderAPI;
  const sampleData: VideoItemType[] = [
    {
      nid: '1',
      title: '123',
      isBookmarked: true
    },
    {
      nid: '2',
      title: '124',
      isBookmarked: true
    },
    {
      nid: '3',
      title: '124',
      isBookmarked: true
    },
  ];
  const mockFunction = jest.fn();
  const setState = jest.fn();

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false;
    (useState as jest.Mock).mockImplementation(() => [false,setState]);
    const component = (
      <Provider store={storeSampleData}>
        <GestureHandlerRootView>
          <VideoContent data={sampleData} onPress={mockFunction} isVideoList = {false}/>
        </GestureHandlerRootView>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it("should render label onTextLayout with event in mobile", () => {
    const element = instance.container.findAllByType(Label)[1];
    fireEvent(element,'onTextLayout',{nativeEvent:{lines:'event'}});
    expect(element.props.numberOfLines).toEqual(2);
  });

});

describe('<VideoContent>', () => {
  let instance: RenderAPI;
  const sampleData: VideoItemType[] = [
    {
      nid: '1',
      title: '123',
      isBookmarked: true
    },
    {
      nid: '2',
      title: '124',
      isBookmarked: true
    },
    {
      nid: '3',
      title: '124',
      isBookmarked: true
    },
  ];
  const mockFunction = jest.fn();
  const setState = jest.fn();

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false;
    (useState as jest.Mock).mockImplementation(() => [false,setState]);
    const component = (
      <Provider store={storeSampleData}>
        <GestureHandlerRootView>
          <VideoContent data={sampleData} isVideoList = {false}/>
        </GestureHandlerRootView>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it("should not call onPress function", () => {
    const element = instance.container.findAllByType(ImageWithIcon)[0];
    fireEvent.press(element)
    expect(mockFunction).not.toHaveBeenCalled();
  });

});

