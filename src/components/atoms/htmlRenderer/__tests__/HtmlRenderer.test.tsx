import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { HtmlRenderer } from '../HtmlRenderer';

describe('<HtmlRenderer />', () => {
  let instance: RenderAPI;
  const source = `<p>This is test HTML tag</p>`

  beforeEach(() => {
    const component = <HtmlRenderer source={source} ignoredDomTags={['h2', 'h1']} tagsStyles={{}} />;
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

describe('<HtmlRenderer />', () => {
  let instance: RenderAPI;
  const source = `<p>This is test HTML tag</p>`

  beforeEach(() => {
    const component = <HtmlRenderer source={source} tagsStyles={{}} />;
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
