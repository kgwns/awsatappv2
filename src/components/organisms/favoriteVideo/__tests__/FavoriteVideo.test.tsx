import { RenderAPI,render } from '@testing-library/react-native'
import React from 'react'
import { VideoItemProps } from 'src/components/molecules';
import { FavoriteVideo } from '../favoriteVideo'

const videoTabInfo: VideoItemProps[] = [
    {
      title:
        'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
      imageUrl: 'https://picsum.photos/300/200',
      videoLabel: 'أمريكا',
      des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
      isBookmarked: true,
      onPressBookmark: () => {},
    },
    {
      title:
        'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
      imageUrl: 'https://picsum.photos/300/200',
      videoLabel: 'أمريكا',
      time: '05:22',
      des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
      date: '7 ديسمبر ',
      views: '1374',
      toWatchTitle: 'ديسمبر',
      isBookmarked: true,
      onPressBookmark: () => {},
    },
    {
      title:
        'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
      imageUrl: 'https://picsum.photos/300/200',
      videoLabel: 'أمريكا',
      des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
      isBookmarked: true,
      onPressBookmark: () => {},
    },
];

describe('<Favorite Video Component >', () => {
    let instance: RenderAPI;
    beforeEach(() => {
       const component = <FavoriteVideo data={videoTabInfo} />
       instance= render(component)
    })

    it('Should render the component', () => {
        expect(instance).toBeDefined()
    })
})