import {render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import GridviewItem from '../GridViewItem'

describe('<GridviewItem />', () => {
  let instance: RenderAPI
  
  beforeEach(() => {
    const component = <GridviewItem index={0} isAlbum={false}  />
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