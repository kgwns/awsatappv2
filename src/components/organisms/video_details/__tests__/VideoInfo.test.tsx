import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { VideoInfo } from '../VideoInfo';
import { HtmlRenderer } from 'src/components/atoms';
import { dateTimeAgo } from 'src/shared/utils';
import { DateIcon } from 'src/shared/utils/utilities';

jest.mock('src/shared/utils/utilities',() => ({
  ...jest.requireActual('src/shared/utils/utilities'),
  dateTimeAgo: jest.fn()
}))

const sampleVideoTitle = 'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات'
const sampleVideoDescription = 'تهليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.'

let instance: RenderAPI;
const mockFunction = jest.fn();
describe('when VideoInfo only', () => {
  const videoTabData = {
    title: sampleVideoTitle,
    body_export: sampleVideoDescription,
    views: '1374',
    field_thumbnil_multimedia_export: 'field_thumbnil_multimedia_export'
  }
    beforeEach(() => {
      (dateTimeAgo as jest.Mock).mockReturnValue({icon: DateIcon.CALENDAR, time: '4'});
      const component = (
        <VideoInfo 
          data={videoTabData} 
          onPress={mockFunction}
          isDocumentary = {true}
        />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });

    it('Should render VideoInfo', () => {
      expect(instance).toBeDefined();
    });

    it('When VideoInfoBOL1 is pressed', () => {
      const testItemId = instance.getByTestId('VideoInfoBOL1');
      fireEvent(testItemId, 'onPress', {nid:'0'});
      expect(mockFunction).toHaveBeenCalled();
    });

    it("should display title",() => {
      expect(instance.queryByTestId('titleId')).not.toBeNull();
    })
    it("should display body",() => {
      const element = instance.container.findByType(HtmlRenderer);
      expect(element).not.toBeNull();
    })
    it("should display View icon and the label",() => {
      expect(instance.queryByTestId('viewIconId')).not.toBeNull();
      expect(instance.queryByTestId('viewLabelId')).not.toBeNull();
    })
    it("Should display Calendar Icon, when the ",() => {
      (dateTimeAgo as jest.Mock).mockReturnValueOnce({icon: DateIcon.CALENDAR, time: '4'});
      expect(instance.queryByTestId('calendarIconId')).not.toBeNull();
      expect(instance.queryByTestId('clockIconId')).toBeNull();
    })
    it("Should display Clock Icon, when the ",() => {
      (dateTimeAgo as jest.Mock).mockReturnValueOnce({icon: DateIcon.CLOCK, time: '4'});
      expect(instance.queryByTestId('calendarIconId')).not.toBeNull();
      expect(instance.queryByTestId('clockIconId')).toBeNull();
    })
    
});
describe('when VideoInfo only', () => {
  const videoTabData = {
    title: sampleVideoTitle,
    body_export: sampleVideoDescription,
    views: '1374',
    field_thumbnil_multimedia_export: ''
  }
  beforeEach(() => {
    (dateTimeAgo as jest.Mock).mockReturnValue({icon: DateIcon.CLOCK, time: '4'});
    const component = (
      <VideoInfo 
        data={videoTabData} 
        onPress={mockFunction}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it("Should display Clock Icon, when the ",() => {
    expect(instance.queryByTestId('calendarIconId')).toBeNull();
    expect(instance.queryByTestId('clockIconId')).not.toBeNull();
  })
  
});

describe('when VideoInfo only', () => {
  const videoTabData = {
    title: sampleVideoTitle,
    body_export: sampleVideoDescription,
    views: '1374',
    field_thumbnil_multimedia_export: 'field_thumbnil_multimedia_export'
  }
  beforeEach(() => {
    (dateTimeAgo as jest.Mock).mockReturnValue({icon: DateIcon.CLOCK, time: '4'});
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it("By Default, it should not display title",() => {
    const component = (
      <VideoInfo 
        data={videoTabData} 
        onPress={mockFunction}
      />
    );
    instance = render(component);
    expect(instance.queryByTestId('titleId')).toBeNull();
  });

  it("Should not call onPress",() => {
    const component = (
      <VideoInfo 
        data={videoTabData} 
      />
    );
    instance = render(component);
    const testItemId = instance.getByTestId('VideoInfoBOL1');
    fireEvent(testItemId, 'onPress', {nid:'0'});
    expect(mockFunction).not.toHaveBeenCalled();
  });
  
});
