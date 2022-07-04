import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import  {PodCastMiniPlayer} from '../PodCastMiniPlayer'

describe('<PodCastMiniPlayer />', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  beforeEach(() => {
    const component = <PodCastMiniPlayer/>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  });
  it('When Press Miniplayer', () => {
    const testID = instance.getByTestId('Miniplayer');
    fireEvent(testID, 'onPress')
    expect(mockFunction).toHaveBeenCalled;
  });
  it('When Press closeIcon', () => {
    const testID = instance.getByTestId('closeIcon');
    fireEvent(testID, 'onPress')
    expect(mockFunction).toHaveBeenCalled;
  });
  it('When Press playPause', () => {
    const testID = instance.getByTestId('playingState');
    fireEvent(testID, 'onPress')
    expect(mockFunction).toHaveBeenCalled;
  });

})
