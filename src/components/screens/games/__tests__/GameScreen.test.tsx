import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import  {GameScreen, GameType} from 'src/components/screens/games/GameScreen'
import { GameIntroCard } from 'src/components/molecules';
import { ScrollView } from 'react-native';

describe('<GameScreen />', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const sampleData = {
    type: GameType.CROSS_WORD,
    imageBackgroundColor: 'example',
    image: "bookmarkActive",
    title: 'example',
    description: 'example',
    buttonTitle: 'example',
    hideButtonTitle: true,
    url: 'abc.com',
    onPress: mockFunction
  }

  beforeEach(() => {
    const component = <GameScreen tabIndex={0} currentIndex={0}/>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  })

  it('should render component', () => {
    expect(render( <GameScreen tabIndex={0} currentIndex={3}/>)).toBeDefined()
  })

  test('Should call GameIntroCard onPress', () => {
    const element = instance.container.findAllByType(GameIntroCard)[0];
    fireEvent(element, 'onPress', {data: sampleData});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call GameIntroCard onPress', () => {
    const element = instance.container.findAllByType(GameIntroCard)[1];
    fireEvent(element, 'onPress', {data: sampleData});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call ScrollView onScrollBeginDrag', () => {
    const element = instance.container.findAllByType(ScrollView)[0];
    fireEvent(element, 'onScrollBeginDrag');
    expect(global.refFlatList).toBeTruthy()
  });
  
})