import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { ButtonImage } from 'src/components/atoms';
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
  const mockFunction = jest.fn();

  describe('when PodcastVerticalList only', () => {

    beforeEach(() => {
      const component = (
          <PodcastVerticalList 
            imageUrl={mockData.imageUrl} 
            title={mockData.title} 
            nid={'2'} 
            isBookmarked={false} 
            spreakerId={'2'}
            onPressBookmark={mockFunction} 
            itemOnPress={mockFunction}
          />
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

    test('Should call button image onPress', () => {
      const element = instance.container.findByType(ButtonImage)
      fireEvent(element, 'onPress');
      expect(mockFunction).toBeTruthy();
    })

    it('When Label PodcastVerticalList01', () => {
      const testItemId = instance.getByTestId('PodcastVerticalList01');
      fireEvent(testItemId, 'onTextLayout', { nativeEvent: {lines: [{ width: 20},{ width: 30}]} });
      expect(mockFunction).toBeTruthy();
    });
  });
});
