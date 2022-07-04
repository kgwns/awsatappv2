import {render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import { BackIcon } from '../BackIcon'

describe('<BackIcon />', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  beforeEach(() => {
    const component = <BackIcon 
    onPressBack={mockFunction} />
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

