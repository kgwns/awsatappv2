import {render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import  {GameScreen} from 'src/components/screens/games/GameScreen'

describe('<GameScreen />', () => {
  let instance: RenderAPI
  beforeEach(() => {
    const component = <GameScreen/>
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