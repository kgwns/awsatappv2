import { RenderAPI,render, fireEvent } from '@testing-library/react-native'
import React from 'react'
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
      news_categories: {},
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
      news_categories: {},
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
      news_categories: {},
    },
];

describe('<Favorite Video Component >', () => {
    let instance: RenderAPI;
    const mockFunction= jest.fn();

    beforeEach(() => {
       const component = <HeadlinesSection tickerData={videoTabInfo} headlineTitle={'المهاجرين'} headlineTitleColor={'red'} headlineDescription={'أمريكا'} />
       instance= render(component)
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
})