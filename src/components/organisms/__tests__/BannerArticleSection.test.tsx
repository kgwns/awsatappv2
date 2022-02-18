import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {BannerArticleSection} from 'src/components/organisms';

describe('<BannerArticleSection>', () => {
  let instance: RenderAPI;

  const sampleData: any = [
    {
      title: 'title',
      body: 'body',
      nid: 'nid',
      image: 'image',
      news_categories: {
        id: 'id',
        title: 'title',
        url: 'url',
        bundle: 'bundle',
        name: 'name',
      },
      author: 'author',
      created: 'created',
    },
  ];

  beforeEach(() => {
    const component = <BannerArticleSection data={sampleData} />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render BannerArticleSection component', () => {
    expect(instance).toBeDefined();
  });
});
