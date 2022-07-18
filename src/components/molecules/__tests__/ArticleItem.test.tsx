import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import FixedTouchable from 'src/shared/utils/FixedTouchable'
import { ArticleItem, ArticleWithOutImage } from '..'
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<ImageArticle>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const navigation = {
        navigate: mockFunction,
    }
    const data = {
        image: 'https://picsum.photos/200/300',
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        body: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
        tagName: 'الحكومة'
    }

    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        const component = <ArticleItem nid={'2'} author={'بالقنال'} created={'بالقنال'} isBookmarked={false} index={0} {...data} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('should render component', () => {
        expect(instance).toBeDefined()
    })

    test('Should call FixedTouchable onPress', () => {
        const element = instance.container.findByType(FixedTouchable)
        fireEvent(element, 'onPress', {nid:'0'});
        expect(navigation.navigate).toBeTruthy()
    })

    test('Should call ArticleWithOutImage onPress', () => {
        const element = instance.container.findByType(ArticleWithOutImage)
        fireEvent(element, 'onPress', {nid:'0'});
        expect(navigation.navigate).toBeTruthy()
    })
})
