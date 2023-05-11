import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native';
import  {GameIntroCard} from 'src/components/molecules/gameIntroCard/GameIntroCard'
import { GameType } from 'src/components/screens/games/GameScreen'


const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: true,
  isIOS: false
}));

describe('<GameIntroCard />', () => {
  let instance: RenderAPI
  const onPressMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('Should click a game in mobile device', () => {
    const component = <GameIntroCard 
    type={GameType.CROSS_WORD} 
    imageBackgroundColor={''} 
    image={'bookmarkActive'} 
    title={'title'} 
    description={'description'} 
    buttonTitle={'buttonTitle'} 
    url={''}
    isDynamic={false}
    onPress={onPressMock}
    />
    instance = render(component)
    DeviceTypeUtilsMock.isTab = false;
    const element = instance.container.findByType(TouchableWithoutFeedback);
    fireEvent.press(element);
    expect(onPressMock).toHaveBeenCalled();
  })

  it('Should click a game in iPad/Tab device', () => {
    const component = <GameIntroCard 
      type={GameType.CROSS_WORD} 
      imageBackgroundColor={''} 
      image={'bookmarkActive'} 
      title={'title'} 
      description={'description'} 
      buttonTitle={'buttonTitle'} 
      url={''}
      isDynamic={false}
      onPress={onPressMock}
    />
    instance = render(component)
    DeviceTypeUtilsMock.isTab = true;
    const element = instance.container.findByType(TouchableWithoutFeedback);
    fireEvent.press(element);
    expect(onPressMock).toHaveBeenCalled();
    expect(instance.queryByTestId('mobileContainerId')).not.toBeNull();
  })
  it('Should click a game in iPad/Tab device', () => {
    const component = <GameIntroCard 
      type={GameType.CROSS_WORD} 
      imageBackgroundColor={''} 
      image={'bookmarkActive'} 
      title={'title'} 
      description={'description'} 
      buttonTitle={'buttonTitle'} 
      url={''}
      isDynamic={false}
      onPress={onPressMock}
    />
    instance = render(component)
    const element = instance.container.findByType(TouchableWithoutFeedback);
    fireEvent.press(element);
    expect(onPressMock).toHaveBeenCalled();
    expect(instance.queryByTestId('tabContainerId')).not.toBeNull();
  })
  it('By Default, mobile device UI is rendered when dynamic prop is not given', () => {
    DeviceTypeUtilsMock.isTab = false;
    const component = <GameIntroCard 
      type={GameType.CROSS_WORD} 
      imageBackgroundColor={''} 
      image={'bookmarkActive'} 
      title={'title'} 
      description={'description'} 
      buttonTitle={'buttonTitle'} 
      url={''}
      onPress={onPressMock}
    />
    instance = render(component)
    expect(instance.queryByTestId('tabContainerId')).toBeNull();
    expect(instance.queryByTestId('mobileContainerId')).not.toBeNull();
  })
  it('mobile UI rendered when dynamic prop is set to true', () => {
    DeviceTypeUtilsMock.isTab = true;
    const component = <GameIntroCard 
      type={GameType.CROSS_WORD} 
      imageBackgroundColor={''} 
      image={'bookmarkActive'} 
      title={'title'} 
      description={'description'} 
      buttonTitle={'buttonTitle'} 
      url={''}
      onPress={onPressMock}
      isDynamic = {true}
    />
    instance = render(component)
    expect(instance.queryByTestId('tabContainerId')).toBeNull();
    expect(instance.queryByTestId('mobileContainerId')).not.toBeNull();
  })
  it('Should display button when we are sending hideButtonTitle Props as false', () => {
    DeviceTypeUtilsMock.isTab = false;
    const component = <GameIntroCard 
      type={GameType.CROSS_WORD} 
      imageBackgroundColor={''} 
      image={'bookmarkActive'} 
      title={'title'} 
      description={'description'} 
      buttonTitle={'buttonTitle'} 
      url={''}
      onPress={onPressMock}
      isDynamic = {true}
      hideButtonTitle = {false}
    />
    instance = render(component)
    const element = instance.getByTestId('arrowId');
    fireEvent.press(element);
    expect(onPressMock).toHaveBeenCalled();
  })
  it('Should not display button when we are sending hideButtonTitle Props as true', () => {
    DeviceTypeUtilsMock.isTab = true;
    const component = <GameIntroCard 
      type={GameType.CROSS_WORD} 
      imageBackgroundColor={''} 
      image={'bookmarkActive'} 
      title={'title'} 
      description={'description'} 
      buttonTitle={'buttonTitle'} 
      url={''}
      onPress={onPressMock}
      isDynamic = {true}
      hideButtonTitle = {true}
    />
    instance = render(component)
    expect(instance.queryByTestId('arrowId')).toBeNull();
  })
})

