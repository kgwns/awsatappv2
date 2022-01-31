import {render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import { BannerImageWithOverlay } from '../BannerImageWithOverlay'

describe('<BannerImageWithOverlay />', () => {
  let instance: RenderAPI
  beforeEach(() => {
    const component = <BannerImageWithOverlay />
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
