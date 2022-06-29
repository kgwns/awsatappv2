import {render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import  {DynamicGameScreen} from 'src/components/screens/games/DynamicGameScreen'

describe('<DynamicGameScreen />', () => {
  let instance: RenderAPI
  beforeEach(() => {
    const component = <DynamicGameScreen route={{params: {gameData : '', showIntro: false}}}/>
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