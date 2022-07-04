import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {NewsWithImageItem} from 'src/components/molecules';

describe('<NewsWithImageItem/>', () => {
  let instance: RenderAPI;

  //Test Data
  const imageUrl = 'https://picsum.photos/200';
  const highlightedTitle = 'إياد أبو شقرا';
  const title = 'إياد أبو شقرا';
  const description =
    'استعاد فريق الاتفاق نغمة انتصاراته وحقق فوزاً ثميناً خارج أرضه أمام نظيره فريق الحزم بثلاثة أهداف دون رد ضمن منافسات الجولة الثانية عشرة من الدوري السعودي للمحترفين';
  const footerLeftLabel = '45 دقيقه';
  const footerRightLabel = 'الخميس';

  beforeEach(() => {
    const component = (
      <NewsWithImageItem
        imageUrl={imageUrl}
        title={title}
        description={description}
        highlightedTitle={highlightedTitle}
        footerLeftLabel={footerLeftLabel}
        footerRightLabel={footerRightLabel}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render NewsWithImageItem component', () => {
    expect(instance).toBeDefined();
  });
});
