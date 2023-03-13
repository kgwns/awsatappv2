import { appleSignin } from '../appleSignin';

describe('AppleSignIn', () => {

    beforeEach(() => {
        jest.useFakeTimers('legacy');
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    it('test appleSignin', async () => {
        const result = appleSignin();
        expect(result).toBeInstanceOf(Object);
    });
});