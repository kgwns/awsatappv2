import { RenderAPI, render, fireEvent } from '@testing-library/react-native'
import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import { LatestArticleDataType } from 'src/redux/latestNews/types';
import HeadlinesSection from '../HeadlinesSection';

const videoTabInfo: LatestArticleDataType[] = [
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    image: 'https://picsum.photos/300/200',
    nid: '2',
    author: 'أمريكا',
    created: 'أمريكا',
    body: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    isBookmarked: true,
    news_categories: [{
      id: 'example',
      title: 'example',
      url: 'example',
      bundle: 'example',
      name: 'example',
    }],
  },
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    image: 'https://picsum.photos/300/200',
    nid: '2',
    author: 'أمريكا',
    created: 'أمريكا',
    body: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    isBookmarked: true,
    news_categories: {
      id: 'example',
      title: 'example',
      url: 'example',
      bundle: 'example',
      name: 'example',
    },
  },
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    image: 'https://picsum.photos/300/200',
    nid: '2',
    author: 'أمريكا',
    created: 'أمريكا',
    body: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    isBookmarked: true,
    news_categories: {
      id: 'example',
      title: 'example',
      url: 'example',
      bundle: 'example',
      name: 'example',
    },
  },
];

const videoTabInfo1: LatestArticleDataType[] = [
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    image: 'https://picsum.photos/300/200',
    nid: null,
    author: 'أمريكا',
    created: 'أمريكا',
    body: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    isBookmarked: true,
    news_categories: {
      id: 'example',
      title: 'example',
      url: 'example',
      bundle: 'example',
      name: 'example',
    },
  },
];

jest.mock('react',() => ({
  ...jest.requireActual('react'),
  useState:jest.fn()
}))

describe('<Favorite Video Component >', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setIndexValue = jest.fn();
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useState as jest.Mock).mockImplementation(() => [0,setIndexValue]);

    const component = <HeadlinesSection tickerData={videoTabInfo} barColor={'red'} headlineDescriptionColor={'red'} repeatSpacer={20} marqueeDelay={10} loop={true} headlineTitle={'المهاجرين'} headlineTitleColor={'red'} headlineDescription={'أمريكا'} />
    instance = render(component)
  })

  it('Should render the component', () => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    expect(instance).toBeDefined()
  })

  it('when SearchResults only When onPress', () => {
    const testID = instance.container.findAllByType(TouchableWithoutFeedback)[0];
    fireEvent(testID, 'onPress');
    expect(mockFunction).toBeTruthy();
  });

  test('Should call TextTicker onMarqueeComplete', () => {
    const element = instance.container.findAllByType(TextTicker)[0];
    fireEvent(element, 'onMarqueeComplete');
    expect(mockFunction).toBeTruthy();
  });

  it('When View HeadlinesSectionView01 onLayout', () => {
    const testItemId = instance.getByTestId('HeadlinesSectionView01');
    fireEvent(testItemId, 'onLayout', { nativeEvent: { layout: { width: 20 } } });
    expect(mockFunction).toBeTruthy();
  });
  
  it('When Label HeadlinesSectionLabel01 onLayout', () => {
    const testItemId = instance.getByTestId('HeadlinesSectionLabel01');
    fireEvent(testItemId, 'onLayout', { nativeEvent: { layout: { width: 20 } } });
    expect(mockFunction).toBeTruthy();
  });

})

describe('<HeadlinesSection >', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  beforeEach(() => {
    const component = <HeadlinesSection tickerData={videoTabInfo1} loop={false} headlineTitle={'المهاجرين'} headlineDescription={'أمريكا'} duration = {3000} />
    instance = render(component)
  })

  it('Should render the component', () => {
    expect(instance).toBeDefined()
  })
  
  it('when SearchResults only When onPress', () => {
    const testID = instance.container.findAllByType(TouchableWithoutFeedback)[0];
    fireEvent(testID, 'onPress');
    expect(mockFunction).toBeTruthy();
  });
  
  test('Should call TextTicker onMarqueeComplete', () => {
    const element = instance.container.findAllByType(TextTicker)[0];
    fireEvent(element, 'onMarqueeComplete');
    expect(mockFunction).toBeTruthy();
  });

  it('When View HeadlinesSectionView01 onLayout', () => {
    const testItemId = instance.getByTestId('HeadlinesSectionView01');
    fireEvent(testItemId, 'onLayout', { nativeEvent: { layout: { width: 20 } } });
    expect(mockFunction).toBeTruthy();
  });

  it('When Label HeadlinesSectionLabel01 onLayout', () => {
    const testItemId = instance.getByTestId('HeadlinesSectionLabel01');
    fireEvent(testItemId, 'onLayout', { nativeEvent: { layout: { width: 20 } } });
    expect(mockFunction).toBeTruthy();
  });
})

describe('<Favorite Video Component >', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useState as jest.Mock).mockImplementation(() => [810,mockFunction]);

    const component = <HeadlinesSection tickerData={videoTabInfo} barColor={'red'} headlineDescriptionColor={'red'} repeatSpacer={20} marqueeDelay={10} loop={true} headlineTitle={'المهاجرين'} headlineTitleColor={'red'} headlineDescription={'أمريكا'} />
    instance = render(component)
  })

  it('Should render the component', () => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    expect(instance).toBeDefined()
    expect(mockFunction).toHaveBeenCalled();
  })
})
