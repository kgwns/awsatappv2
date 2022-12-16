import { store } from "src/redux/store";
import { DEBUG_BASE_URL, getBaseUrl } from "../apiUrls";

describe('Check apiUrls',()=>{
    beforeEach(()=>{
        jest.useFakeTimers();
    })
    afterEach(()=>{
        jest.clearAllMocks();
    })
    it('test getBaseUrl Method',()=>{        
        jest.spyOn(store,'getState').mockReturnValueOnce({appCommon:{serverEnvironment:'Debug'}});
        const result = getBaseUrl();
        expect(result).toEqual(DEBUG_BASE_URL)
    })
})