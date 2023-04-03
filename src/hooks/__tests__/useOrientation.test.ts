import { renderHook, RenderHookResult, } from '@testing-library/react-hooks';
import { UseOrientationReturn, useOrientation } from '../useOrientation';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
}));

describe('#useOrientation', () => {
    let result: RenderHookResult<undefined, UseOrientationReturn>;

    beforeAll(() => {
        result = renderHook<undefined, UseOrientationReturn>(() =>
            useOrientation(),
        );
    });

    afterAll(() => {
        jest.clearAllMocks();
        result.unmount();
    });

    it('### isPortrait boolean', () => {
        const {
            result: {
                current: { isPortrait },
            },
        } = result;

        expect(isPortrait).toBeTruthy();
    });

});
