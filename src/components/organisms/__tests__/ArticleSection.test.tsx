import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {ArticleSection} from 'src/components/organisms';

describe('<ArticleSection>', () => {
  let instance: RenderAPI;

  const sampleData: any = [
    {image: 'image', nid: 'nid', author: 'author', created: 'created'},
  ];

  beforeEach(() => {
    const component = <ArticleSection data={sampleData} />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render ArticleSection component', () => {
    expect(instance).toBeDefined();
  });
});
