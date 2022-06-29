import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {ShortArticle} from 'src/components/organisms';
import { shortArticleData } from 'src/constants/SampleData';

describe('<ShortArticle>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  beforeEach(() => {
    const component = <ShortArticle data={shortArticleData} onPress={mockFunction} onUpdateBookmark={mockFunction} showSignUpPopUp={mockFunction}/>;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render ShortArticle component', () => {
    expect(instance).toBeDefined();
  });
  
});

