import AppPlayer from "../appPlayer"

describe("AppPlayer",() => {
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    it("test app player",() => {
        const instance = new AppPlayer();
        expect(instance).toBeDefined();
    })
    it("when AppPlayer throws error",() => {
        try{
            AppPlayer.initializePlayer();
        }
        catch(e){
            const spyon = jest.spyOn(console,'log');
            expect(spyon).toHaveBeenCalled();
        }
    })
})