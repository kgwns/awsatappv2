import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import FixedTouchable from '../FixedTouchable'
import React, {useRef}  from 'react';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
}));

const data = {
  _touchActivatePositionRef: {
    current: {
      pageX:32,
      pageY:49
    }
  }
  
}

describe('<FixedTouchable />', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();

  beforeEach(() => {
    (useRef as jest.Mock).mockReturnValue(data);
    const component = <FixedTouchable onPress={mockFunction} onPressIn={mockFunction}/>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  })

  it('test FixedTouchable01 onPress',() => {
    const testId = instance.getByTestId('FixedTouchable01');
    fireEvent(testId,'onPress', {nativeEvent:{pageX:3,pageY:5}});
    expect(mockFunction).toHaveBeenCalled();
  })

  it('test FixedTouchable01 onPressIn',() => {
    const testId = instance.getByTestId('FixedTouchable01');
    fireEvent(testId,'onPressIn', {nativeEvent:{pageX:3,pageY:5}});
    expect(mockFunction).toHaveBeenCalled();
  })
  
})

