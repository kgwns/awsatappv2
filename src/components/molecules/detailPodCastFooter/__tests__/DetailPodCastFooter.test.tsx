import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { DetailPodCastFooter } from 'src/components/molecules';

jest.mock('src/shared/utils/dimensions', () => ({
    ...jest.requireActual('src/shared/utils/dimensions'),
    isIOS: false,
}));

describe('<DetailPodCastFooter>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn()

    beforeEach(() => {
        jest.resetModules();
        const component = <DetailPodCastFooter isBookmarked={false} onPress={mockFunction} onPressBookmark={mockFunction} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        jest.resetModules();
        instance.unmount()
    })

    it('should render component', () => {
        expect(instance).toBeDefined()
    })

    it('should render component', () => {
        expect(instance).toBeDefined()
    })

    it('should render component with isBookmarked true', () => {
        expect(render(<DetailPodCastFooter isBookmarked onPress={mockFunction} onPressBookmark={mockFunction} />)).toBeDefined
    });
})