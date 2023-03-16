import {render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import {SignupAlertCard} from 'src/components/molecules/signupAlertCard/SignupAlertCard'

describe('<SignupAlertCard />', () => {
  let instance: RenderAPI
  
  beforeEach(() => {
    const component = <SignupAlertCard title={''} message={''} buttonText={''} />
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  })
})