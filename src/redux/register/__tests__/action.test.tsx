
import {
  REGISTER_USER,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
} from '../actionTypes';
import { registerFailed, registerSuccess, userRegister } from '../action';
import { RegisterBodyType } from '../types';

describe('<RegisterUser', () => {

  const errorMessage = 'This is sample error'
  const payload: RegisterBodyType = {
      name: '',
      email: 'sample@test.com',
      password: 'sample'
  }

  it('Create Register Request', () => {
      const result = userRegister(payload)
      expect(result.type).toEqual(REGISTER_USER)
  })

  it('Register Request success', () => {
      const result = registerSuccess({ userInfo: {}})
      expect(result.type).toEqual(REGISTER_SUCCESS)
      expect(result.payload.userInfo).toEqual({})
  })

  it('Register Request failed', () => {
      const result = registerFailed({ error: errorMessage })
      expect(result.type).toEqual(REGISTER_FAILED)
      expect(result.payload.error).toEqual(errorMessage)
  })

})