import { store } from "src/redux/store";
import { DEBUG_BASE_URL, getBaseUrl, PROD_BASE_URL } from "../apiUrls";

describe('Check apiUrls',()=>{
    beforeEach(()=>{
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    })
    afterEach(()=>{
        jest.clearAllMocks();
    })
    it('test getBaseUrl Method',()=>{        
        jest.spyOn(store,'getState').mockReturnValueOnce({appCommon:{serverEnvironment:'Debug'}});
        const result = getBaseUrl();
        expect(result).toEqual(DEBUG_BASE_URL)
    })
    it('test getBaseUrl Method and return prod url',()=>{        
        const result = getBaseUrl();
        expect(result).toEqual(PROD_BASE_URL)
    })
})