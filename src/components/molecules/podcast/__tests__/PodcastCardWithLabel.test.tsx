import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {PodcastCardWithLabel} from 'src/components/molecules';

describe('<PodcastCardWithLabel/>', () => {
  let instance: RenderAPI;

  //Test Data
  const imageUrl = 'https://picsum.photos/200';
  const title = 'إياد أبو شقرا';
  const description =
    'استعاد فريق الاتفاق نغمة انتصاراته وحقق فوزاً ثميناً خارج أرضه أمام نظيره فريق الحزم بثلاثة أهداف دون رد ضمن منافسات الجولة الثانية عشرة من الدوري السعودي للمحترفين';

  beforeEach(() => {
    const component = (
      <PodcastCardWithLabel
        imageUrl={imageUrl}
        title={title}
        description={description}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render PodcastCardWithLabel component', () => {
    expect(instance).toBeDefined();
  });
});
