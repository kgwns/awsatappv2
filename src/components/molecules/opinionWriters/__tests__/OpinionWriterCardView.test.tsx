import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {OpinionWriterCardView} from 'src/components/molecules';

describe('<OpinionWritersCardView>', () => {
  let instance: RenderAPI;

  //Test Data
  const imageUrl = 'https://picsum.photos/200';
  const writerTitle = 'إياد أبو شقرا';
  const headLine = 'هل بدأ العد العكسي لنهاية حكم جونسون في بريطانيا؟';
  const subHeadLine =
    'حتى الآن كانت معركة الرئاسة الفرنسية من دون مفاجآت تذكر: الرئيس الجالس هو الأقوى. مرشحة اليمين ماري لوبن، تشكل خطراً لكنه غير قاتل، وعلى يمينها إريك زمور';
  const audioLabel = 'استمع الي المقالة ';
  const duration = '3:22';

  beforeEach(() => {
    const component = (
      <OpinionWriterCardView
        imageUrl={imageUrl}
        writerTitle={writerTitle}
        headLine={headLine}
        subHeadLine={subHeadLine}
        audioLabel={audioLabel}
        duration={duration}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render OpinionWritersCardView component', () => {
    expect(instance).toBeDefined();
  });

  it('Should Press BookMark', () => {
    const element = instance.getByTestId('bookmarkTestId');
    fireEvent.press(element);
  });
  
  xit('Should Press PlayIcon', () => {
    const element = instance.getByTestId('playIconTestId');
    fireEvent.press(element);
  });
});
