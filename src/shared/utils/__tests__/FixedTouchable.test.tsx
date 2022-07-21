import {render, RenderAPI} from '@testing-library/react-native'
import FixedTouchable from '../FixedTouchable'
import React, {useRef}  from 'react';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
}));

const data: any = {current :
  [
  {
    pageX: 90,
    pageY: 89,
  },
  {
    pageX: 90,
    pageY: 89,
  },
  {
    pageX: 90,
    pageY: 89,
  },
  {
    pageX: 90,
    pageY: 89,
  },
]}

describe('<FixedTouchable />', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const _touchActivatePositionRef = mockFunction;

  beforeEach(() => {
    (useRef as jest.Mock).mockImplementation(() => [data, _touchActivatePositionRef]);
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
  
})

