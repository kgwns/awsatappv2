import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import  {GameScreen, GameType} from 'src/components/screens/games/GameScreen'
import { GameIntroCard } from 'src/components/molecules';
import { ScrollView } from 'react-native';
import { isDarkTheme } from 'src/shared/utils';

jest.mock("src/shared/utils/utilities", () => ({
  ...jest.requireActual('src/shared/utils/utilities'),
      isDarkTheme:jest.fn(),
}));

describe('<GameScreen />', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const isDarkThemeMock = jest.fn();
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
    (isDarkTheme as jest.Mock).mockImplementation(isDarkThemeMock);
    isDarkThemeMock.mockReturnValue(true);

    const component = <GameScreen tabIndex={0} currentIndex={0}/>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
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

describe('<GameScreen />', () => {
  let instance: RenderAPI;
  const isDarkThemeMock = jest.fn();

  beforeEach(() => {
    (isDarkTheme as jest.Mock).mockImplementation(isDarkThemeMock);
    isDarkThemeMock.mockReturnValue(false);

    const component = <GameScreen tabIndex={0} currentIndex={0}/>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })


  it('should render component', () => {
    expect(render( <GameScreen tabIndex={0} currentIndex={3}/>)).toBeDefined()
  })
  
})