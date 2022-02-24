import { getRegisterUserInfo, getIsLoading, getRegisterError } from "../selectors";
import { RegisterSuccessPayloadType } from "../types";
import { storeInfo } from "src/constants/SampleData";

describe('Register Selector', () => {
    const registerData = storeInfo[0]
    test('Get loading state', () => {
        const isLoading: boolean = getIsLoading(registerData)
        expect(isLoading).toEqual(false)
    })

    test('Get user info state', () => {
        const data: RegisterSuccessPayloadType|null = getRegisterUserInfo(registerData)
        expect(data).toEqual({})
    })

    test('Get error state', () => {
        const error: string = getRegisterError(registerData)
        expect(error).toEqual('')
    })
})
