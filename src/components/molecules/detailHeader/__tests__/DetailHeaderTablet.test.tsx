import * as React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { DetailHeaderTablet } from '../DetailHeaderTablet';

jest.mock('react-native-safe-area-context', () => ({
    ...jest.requireActual('react-native-safe-area-context'),
    useSafeAreaInsets: () => ({
        top: 10,
    })
}));

describe('<<< DetailHeaderTablet >>>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();

    beforeEach(() => {
        const component = <DetailHeaderTablet
            onBackPress={mockFunction}
            onHomePress={mockFunction}
            visibleHome={true}
        />
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('### check render method', () => {
        expect(instance).toBeDefined();
    });

    it('### check render method without HomeIcon', () => {
        const component = <DetailHeaderTablet
            onBackPress={mockFunction}
            onHomePress={mockFunction}
        />
        instance = render(component);
        expect(instance).toBeDefined();
    })
});
