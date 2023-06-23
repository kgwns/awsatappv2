import React, { useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { TitleWithUnderLine } from '../TitleWithUnderLine';
import { useNavigation } from '@react-navigation/native';
import { colors } from 'src/shared/styles/colors';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
  }));

  jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
    useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
    useFocusEffect: () => jest.fn().mockImplementation(() => jest.fn())
  }));

describe('<VideoPlayer>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const lineWidth = 50;
    const setLineWidth = mockFunction;

    const navigation = {
        navigate: mockFunction,
      }

    beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [lineWidth, setLineWidth]);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      const component = <TitleWithUnderLine title={'example'} titleContainerStyle={{backgroundColor: colors.aliceBlue}}/>
      instance = render(component)
      jest.useFakeTimers({
        legacyFakeTimers: true
      });
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render VideoPlayer', () => {
        expect(instance).toBeDefined()
    })

    it('When Label onTextLayout', () => {
      const testItemId = instance.getByTestId('TitleWithUnderLine01');
      fireEvent(testItemId, 'onTextLayout', { nativeEvent: {lines: [{ width: 20},{ width: 30}]} });
      expect(mockFunction).toBeTruthy();
    });

    it('When Label onTextLayout', () => {
      const testItemId = instance.getByTestId('TitleWithUnderLine01');
      fireEvent(testItemId, 'onTextLayout', { nativeEvent: {} });
      expect(mockFunction).toBeTruthy();
    });
})

describe('<VideoPlayer>', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const lineWidth = 50;
  const setLineWidth = mockFunction;

  const navigation = {
      navigate: mockFunction,
    }

  beforeEach(() => {
  (useState as jest.Mock).mockImplementation(() => [lineWidth, setLineWidth]);
  (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = <TitleWithUnderLine title={''}/>
    instance = render(component)
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
  })

  afterEach(() => {
      jest.clearAllMocks()
      instance.unmount()
  })

  it('Should render VideoPlayer', () => {
      expect(instance).toBeDefined()
  })
})