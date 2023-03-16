import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ButtonImage } from 'src/components/atoms/button-image/ButtonImage';
import { ArticleDetailDataType } from 'src/redux/articleDetail/types';
import { ArticleDetailFooter } from 'src/components/molecules/articleDetailFooter/ArticleDetailFooter';
import Share from 'react-native-share';
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false
}));
let instance: RenderAPI;

const mockFunction = jest.fn()

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
  created: 'asxdc'
}

describe('<ArticleDetailFooter with isBookmarked false>', () => {
  beforeEach(() => {
    const component = (
      <ArticleDetailFooter
        articleDetailData={data}
        isBookmarked={false}
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

  it('should render component', () => {
    expect(instance).toBeDefined();
  });

  it('should render component in iOS', () => {
    DeviceTypeUtilsMock.isIOS = true;
    expect(instance).toBeDefined();
  });

  it('Should call theme button', () => {
    const element = instance.container.findAllByType(ButtonImage)[0];
    fireEvent(element, 'onPress');
    expect(element).toBeTruthy();
  });

  it('Should call share button and return response', () => {
    jest.spyOn(Share,'open').mockResolvedValue({response:true} as any);
    const element = instance.container.findAllByType(ButtonImage)[1];
    fireEvent(element, 'onPress');
    expect(element).toBeTruthy();
  });

  it('Should call share button and throws error', () => {
    jest.spyOn(Share,'open').mockRejectedValue('error');
    const element = instance.container.findAllByType(ButtonImage)[1];
    fireEvent(element, 'onPress');
    expect(element).toBeTruthy();
  });
});

describe('<ArticleDetailFooter with isBookmarked true>', () => {

  beforeEach(() => {
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

  it('should render component', () => {
    expect(instance).toBeDefined();
  });
});

