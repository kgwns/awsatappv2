import {render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import  {GameIntroCard} from 'src/components/molecules/gameIntroCard/GameIntroCard'
import { GameType } from 'src/components/screens/games/GameScreen'

describe('<GameIntroCard />', () => {
  let instance: RenderAPI
  beforeEach(() => {
    const component = <GameIntroCard 
    type={GameType.CROSS_WORD} 
    imageBackgroundColor={''} 
    image={'bookmarkActive'} 
    title={'title'} 
    description={'description'} 
    buttonTitle={'buttonTitle'} 
    url={''}/>
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

