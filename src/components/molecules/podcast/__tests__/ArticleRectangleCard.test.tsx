import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import ArticleRectangleCard from '../ArticleRectangleCard';

describe('<NewsWithImageItem/>', () => {
  let instance: RenderAPI;

  //Test Data
  const trendingNumber = 1;
  const imageUrl = 'https://picsum.photos/200';
  const title = 'إياد أبو شقرا';
  const footerLeft = '45 دقيقه';
  const footerRight = 'الخميس';

  beforeEach(() => {
    const component = (
      <ArticleRectangleCard
        trendingNumber={trendingNumber}
        imageUrl={imageUrl}
        title={title}
        footerLeft={footerLeft}
        footerRight={footerRight}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render ArticleRectangleCard component', () => {
    expect(instance).toBeDefined();
  });

  it('should render ArticleRectangleCard component', () => {
    expect(render(<ArticleRectangleCard
      trendingNumber={trendingNumber}
      imageUrl={imageUrl}
      title={title}
      footerLeft={footerLeft}
      footerRight={footerRight}
      footerLeftHighlight= {false}
      footerRightHighlight= {false}
    />)).toBeDefined();
  });

  it('should render ArticleRectangleCard component', () => {
    expect(render(<ArticleRectangleCard
      trendingNumber={trendingNumber}
      imageUrl={imageUrl}
      title={title}
      footerLeft={footerLeft}
      footerRight={footerRight}
      footerLeftHighlight= {true}
      footerRightHighlight= {true}
    />)).toBeDefined();
  });

  it('Should Press bookMark', () => {
    const element = instance.getByTestId('bookMarkTestId');
    fireEvent.press(element);
  });
});
