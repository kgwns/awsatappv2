import { recordCurrentScreen, recordLogEvent } from "../analytics";

describe("test analytics",() => {
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    it("test recordCurrentScreen",() => {
        const result = recordCurrentScreen('screenName');
        expect(result).toBeInstanceOf(Object);
    })

    it("test recordLogEvent",() => {
        const result = recordLogEvent('name');
        expect(result).toBeInstanceOf(Object);
    })
})