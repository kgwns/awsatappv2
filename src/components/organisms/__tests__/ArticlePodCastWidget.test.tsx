import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ArticlePodCastWidget } from 'src/components/organisms'
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
}));
describe('<ArticlePodCastWidget>', () => {
    let instance: RenderAPI;

    const mockFunction = jest.fn();
    const imageUrl = 'https://picsum.photos/200';
    const title = 'إياد أبو شقرا';
    const body = 'هل بدأ العد العكسي لنهاية حكم جونسون في بريطانيا؟';
    const header = 'حتى الآن كانت معركة الرئاسة الفرنسية من دون مفاجآت تذكر: الرئيس الجالس هو الأقوى. مرشحة اليمين ماري لوبن، تشكل خطراً لكنه غير قاتل، وعلى يمينها إريك زمور';
    const rightTitle = 'إستمع إلى المقالة ';
    const duration = '3:22';

    beforeEach(() => {
        const component = <ArticlePodCastWidget imageUrl={imageUrl} title={title} body={body} podcastHeader={header} 
                                allEpisodes={header} tagName={header} timeDuration={duration} rightTitle={rightTitle} 
                                isBookmarked={false} onPressBookmark={mockFunction} onPress={mockFunction} spreakerEpisode={imageUrl}
                            />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('should render component', () => {
        DeviceTypeUtilsMock.isTab = true
        expect(instance).toBeDefined()
    })

    it('should render component', () => {
        DeviceTypeUtilsMock.isTab = false
        expect(render( <ArticlePodCastWidget imageUrl={''} title={''} body={''} podcastHeader={''} 
        allEpisodes={''} tagName={''} timeDuration={''} rightTitle={''} isBookmarked={false} spreakerEpisode={''}/>)).toBeDefined()
    })
})