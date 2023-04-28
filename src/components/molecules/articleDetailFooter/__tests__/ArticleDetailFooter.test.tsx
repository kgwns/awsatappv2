import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ButtonImage } from 'src/components/atoms/button-image/ButtonImage';
import { ArticleDetailDataType } from 'src/redux/articleDetail/types';
import { ArticleDetailFooter } from 'src/components/molecules/articleDetailFooter/ArticleDetailFooter';
import Share from 'react-native-share';
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false,
  isTab: false
}));
let instance: RenderAPI;

const mockFunction = jest.fn();
const onPressFontChangeMock = jest.fn();

const data: ArticleDetailDataType = {
  title: 'title',
  body: 'body',
  nid: 'nid',
  image: 'image',
  view_node: 'view_node',
  news_categories: {
    title: 'news_categories_title',
    id: 'news_categories_id',
    url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
    bundle: 'news_categories_bundle',
    name: 'news_categories_name'
  },
  author: 'author',
  tag_topics: {
    id: '1',
    title: 'asd',
    url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
    bundle: 'asd',
    name: 'qsd'
  },
  isBookmarked: false,
  caption: 'asd',
  subtitle: 'asdf',
  jwplayerId: '1',
  created: 'asxdc',
  journalistId: [],
  journalistName: [],
  journalistCity: [],
  shortUrl: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
  scribbleLiveId: '233423',
  link_node: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
  publishedDate: 'date',
  tagTopicsList: 'tagName1,tagName2'
}

describe('<ArticleDetailFooter with isBookmarked false>', () => {
  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true;
    DeviceTypeUtilsMock.isIOS = true;
    const component = (
      <ArticleDetailFooter
        articleDetailData={data}
        isBookmarked={false}
        onPressSave={mockFunction}
        onPressFontChange={onPressFontChangeMock}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should call fontChange button', () => {
    const element = instance.container.findAllByType(ButtonImage)[0];
    fireEvent(element, 'onPress');
    expect(onPressFontChangeMock).toHaveBeenCalled();
  });

  it('Should call share button and return response', () => {
    jest.spyOn(Share,'open').mockResolvedValue({response:true} as any);
    const element = instance.container.findAllByType(ButtonImage)[1];
    fireEvent(element, 'onPress');
    expect(Share.open).toHaveBeenCalled();
  });

  it('Should call share button and throws error', () => {
    jest.spyOn(Share,'open').mockRejectedValue('error');
    const element = instance.container.findAllByType(ButtonImage)[1];
    fireEvent(element, 'onPress');
    expect(Share.open).toHaveBeenCalled();
  });

  it('Should call fontChange button', () => {
    const element = instance.container.findAllByType(ButtonImage)[2];
    fireEvent(element, 'onPress');
    expect(mockFunction).toHaveBeenCalled();
  });

  it("Container Height Should be 104 in Tablet",() => {
    const containerId = instance.getByTestId('containerId');
    expect(containerId.props.style.height).toBe(104);
  });
});

describe('<ArticleDetailFooter with isBookmarked true>', () => {

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false;
    DeviceTypeUtilsMock.isIOS = false;
    const component = (
      <ArticleDetailFooter
        articleDetailData={data}
        isBookmarked={true}
        onPressSave={mockFunction}
        onPressFontChange={mockFunction}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should call fontChange button', () => {
    const element = instance.container.findAllByType(ButtonImage)[2];
    fireEvent(element, 'onPress');
    expect(mockFunction).toHaveBeenCalled();
  });

  it("Container Height Should be normalize(60) in Mobile android",() => {
    const containerId = instance.getByTestId('containerId');
    expect(containerId.props.style.height).toBe(120);
  });

});

describe('<ArticleDetailFooter with isBookmarked true> in iOS Mobile', () => {

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false;
    DeviceTypeUtilsMock.isIOS = true;
    const component = (
      <ArticleDetailFooter
        articleDetailData={data}
        isBookmarked={true}
        onPressSave={mockFunction}
        onPressFontChange={mockFunction}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it("Container Height Should be normalize(70) in Mobile ios",() => {
    const containerId = instance.getByTestId('containerId');
    expect(containerId.props.style.height).toBe(140);
  });

});
