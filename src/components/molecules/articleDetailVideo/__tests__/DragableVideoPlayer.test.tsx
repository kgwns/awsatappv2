import {render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import DraggableVideoPlayer  from '../DraggableVideoPlayer'

describe('<DraggableVideoPlayer />', () => {
  let instance: RenderAPI
  beforeEach(() => {
    const component = <DraggableVideoPlayer paused={false}/>
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

