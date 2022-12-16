
import {
  REGISTER_USER,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  SOCIAL_LOGIN_START,
  SOCIAL_LOGIN_END,
  EMPTY_USER_INFO,
} from '../actionTypes';
import { emptyUserInfoData, registerFailed, registerSuccess, socialLoginEnd, socialLoginStart, userRegister } from '../action';
import { RegisterBodyType } from '../types';

describe('<RegisterUser', () => {

  const errorMessage = 'This is sample error'
  const payload: RegisterBodyType = {
    name: '',
    email: 'sample@test.com',
    password: 'sample',
    device_name: ''
  }

  it('Create Register Request', () => {
      const result = userRegister(payload)
      expect(result.type).toEqual(REGISTER_USER)
  })

  it('Register Request success', () => {
      const result = registerSuccess({user: null,token: {},message: {}})
      expect(result.type).toEqual(REGISTER_SUCCESS)
      expect(result.payload).toEqual({user: null,token: {},message: {}})
  })

  it('Register Request failed', () => {
      const result = registerFailed({ error: errorMessage })
      expect(result.type).toEqual(REGISTER_FAILED)
      expect(result.payload.error).toEqual(errorMessage)
  })

  it('social login start', () => {
    const result = socialLoginStart()
    expect(result.type).toEqual(SOCIAL_LOGIN_START)
})

it('social Login end', () => {
  const result = socialLoginEnd()
  expect(result.type).toEqual(SOCIAL_LOGIN_END)
})

it('empty the user info data', () => {
  const result = emptyUserInfoData()
  expect(result.type).toEqual(EMPTY_USER_INFO)
})
})