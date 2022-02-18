import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {ButtonImage} from 'src/components/atoms';
import {ArticleDetailFooter} from '../ArticleDetailFooter';

describe('<ArticleDetailFooter>', () => {
  let instance: RenderAPI;

  const articleDetailSampleData = {
    title: 'mocktitle',
    body: 'mockbody',
    nid: '2982096',
    image: 'https://picsum.photos/200/300',
    view_node: 'mockViewNode',
    news_categories: {
      id: '11',
      title: 'العالم العربي',
      url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/11',
      bundle: 'news_categories',
      name: 'العالم العربي',
    },
    tag_topics: {
      id: '1791',
      title: 'النزاع الفلسطيني-الاسرائيلي',
      url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/1791',
      bundle: 'tags_topics',
      name: 'النزاع الفلسطيني-الاسرائيلي',
    },
    author: 'mockAuthor',
  };

  beforeEach(() => {
    const component = (
      <ArticleDetailFooter articleDetailData={articleDetailSampleData} />
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

  it('Should call theme button', () => {
    const element = instance.container.findAllByType(ButtonImage)[0];
    fireEvent(element, 'onPress');
    expect(element).toBeTruthy();
  });

  it('Should call font increase button', () => {
    const element = instance.container.findAllByType(ButtonImage)[1];
    fireEvent(element, 'onPress');
    expect(element).toBeTruthy();
  });

  it('Should call share button', () => {
    const element = instance.container.findAllByType(ButtonImage)[2];
    fireEvent(element, 'onPress');
    expect(element).toBeTruthy();
  });
});
