import { appleSignin } from '../appleSignin';

describe('AppleSignIn', () => {

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    it('test appleSignin', async () => {
        const result = appleSignin();
        expect(result).toBeInstanceOf(Object);
    });
});