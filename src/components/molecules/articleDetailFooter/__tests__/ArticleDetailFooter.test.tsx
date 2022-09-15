import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ButtonImage } from 'src/components/atoms';
import { ArticleDetailDataType } from 'src/redux/articleDetail/types';
import { ArticleDetailFooter } from '../ArticleDetailFooter';

describe('<ArticleDetailFooter>', () => {
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

describe('<ArticleDetailFooter>', () => {
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
