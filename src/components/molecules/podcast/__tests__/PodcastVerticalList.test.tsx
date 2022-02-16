import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { PodcastVerticalList } from '../PodcastVerticalList';

const mockData= {
  imageUrl: 'https://picsum.photos/200',
  title: '66 : عنوان الحلقه يوضع هنا',
  description: 'استعاد فريق الاتفاق نقمة انتصاراته وحقق فوزا ثمينا خارج أرضه اسلام نظيره فريق الحرم بثلاثة أهداف دون رد ضمن منافسات',
  footerLeft: '45 دقيقه',
  footerRight: 'الخسيس'
}

describe('<PodcastVerticalList>', () => {
  let instance: RenderAPI;

  describe('when PodcastVerticalList only', () => {
    beforeEach(() => {
      const component = (
          <PodcastVerticalList imageUrl={mockData.imageUrl} title={mockData.title} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render PodcastVerticalList', () => {
      expect(instance).toBeDefined();
    });
  });
});
