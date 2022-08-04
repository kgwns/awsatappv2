import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { VideosVerticalList } from '../VideosVerticalList';

const mockData= {
  imageUrl: 'https://picsum.photos/200',
  title: '66 : عنوان الحلقه يوضع هنا',
  description: 'استعاد فريق الاتفاق نقمة انتصاراته وحقق فوزا ثمينا خارج أرضه اسلام نظيره فريق الحرم بثلاثة أهداف دون رد ضمن منافسات',
  time: '5:22'
}

describe('<VideosVerticalList>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  describe('when VideosVerticalList only', () => {
    beforeEach(() => {
      const component = (
          <VideosVerticalList itemOnPress={mockFunction} imageUrl={mockData.imageUrl} title={mockData.title} time={mockData.time} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render VideosVerticalList', () => {
      expect(instance).toBeDefined();
    });
    it('when Label is onTextLayout', () => {
      const testID = instance.getByTestId('onTextLayout');
      fireEvent(testID, 'onTextLayout', {nativeEvent: {lines: [{width: '2'},{width: '3'}]}});
      expect(mockFunction).toHaveBeenCalled;
    });
  });
});
