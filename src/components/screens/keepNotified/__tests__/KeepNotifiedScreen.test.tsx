import React, { useState } from 'react';
import { fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/Constants';
import {KeepNotifiedScreen} from '../KeepNotifiedScreen';
import { NotificationDataType } from 'src/redux/keepNotified/types';
import { useKeepNotified } from 'src/hooks'
import KeepNotifiedWidget from 'src/components/organisms/KeepNotifiedWidget';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const data: NotificationDataType[] = [
  {
    id: 1,
    name: 'أخبار عاجلة',
    selected: true
  },
  {
    id: 2,
    name: 'إحاطة الصباح',
    selected: true,
  },
  {
    id: 3,
    name: 'أهم الأخبار',
    selected: true,
  },
  {
    id: 4,
    name: 'أخبار فيروس كورونا',
    selected: false,
  },
  {
    id: 5,
    name: 'إحاطة الصباح',
    selected: false,
  },
  {
    id: 6,
    name: 'أخبار عاجلة',
    selected: false,
  }
]

jest.mock('src/hooks/useKeepNotified', () => ({useKeepNotified: jest.fn()}));

describe('<KeepNotifiedScreen>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const disableNext = mockFunction;
  const canGoBack = mockFunction;
  const notificationDate = mockFunction;
  const useKeepNotifiedMock = mockFunction;

  beforeEach(() => {
    (useKeepNotified as jest.Mock).mockImplementation(useKeepNotifiedMock);
    (useState as jest.Mock).mockImplementation(() => [false, disableNext]);
    (useState as jest.Mock).mockImplementation(() => [false, canGoBack]);
    (useState as jest.Mock).mockImplementation(() => [data, notificationDate]);
    useKeepNotifiedMock.mockReturnValue({
      sendSelectedInfoRequest:()=>{},
      getSelectedInfoRequest:()=>{},
      removeSelectedNotificationInfo:()=>{},
      removeKeepNotificationInfo:()=>{},
      getAllNotificationList:()=>{},
      isLoading: false,
      selectedNotificationInfo: {
        code: 200,
        message: 'string',
        data: [
          {
            id: '2',
            name: 'abc'
          },
          {
            id: '3',
            name: 'abc'
          },
        ]
      },
      sendSelectedNotificationInfo: {
        message: {
          code: 200,
          message: 'string'

        }
      },
      allNotificationList: {
        code: 200,
        message: 'string',
        data: [
          {
            id: '2',
            name: 'abc'
          },
          {
            id: '3',
            name: 'abc'
          },
        ]
      },
    });
    const component = (
      <Provider store={storeSampleData}>
        <KeepNotifiedScreen route={{params: {canGoBack: false}}} />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render KeepNotifiedScreen', () => {
    expect(instance).toBeDefined();
  });

  it('When KeepNotifiedWidget onPress', () => {
    const testId = instance.container.findAllByType(KeepNotifiedWidget)[0];
    fireEvent(testId, 'onPress', data[0]);
    expect(mockFunction).toHaveBeenCalled;
  });

});

describe('<KeepNotifiedScreen>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const disableNext = mockFunction;
  const canGoBack = mockFunction;
  const notificationDate = mockFunction;
  const useKeepNotifiedMock = mockFunction;

  beforeEach(() => {
    (useKeepNotified as jest.Mock).mockImplementation(useKeepNotifiedMock);
    (useState as jest.Mock).mockImplementation(() => [true, disableNext]);
    (useState as jest.Mock).mockImplementation(() => [true, canGoBack]);
    (useState as jest.Mock).mockImplementation(() => [[], notificationDate]);
    useKeepNotifiedMock.mockReturnValue({
      sendSelectedInfoRequest:()=>{},
      getSelectedInfoRequest:()=>{},
      removeSelectedNotificationInfo:()=>{},
      removeKeepNotificationInfo:()=>{},
      getAllNotificationList:()=>{},
      isLoading: false,
      selectedNotificationInfo: {
        code: 200,
        message: 'string',
        data: []
      },
      sendSelectedNotificationInfo: {
        message: {
          code: 400,
          message: 'string'
        }
      },
      allNotificationList: {
        code: 400,
        message: 'string',
        data: []
      },
    });
    const component = (
      <Provider store={storeSampleData}>
        <KeepNotifiedScreen route={{params: {canGoBack: true}}} />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render KeepNotifiedScreen', () => {
    expect(instance).toBeDefined();
  });

  it('When KeepNotifiedWidget onPress', () => {
    const testId = instance.container.findAllByType(KeepNotifiedWidget)[0];
    fireEvent(testId, 'onPress', data[0]);
    expect(mockFunction).toHaveBeenCalled;
  });

});

describe('<KeepNotifiedScreen>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const disableNext = mockFunction;
  const canGoBack = mockFunction;
  const notificationDate = mockFunction;
  const useKeepNotifiedMock = mockFunction;

  beforeEach(() => {
    (useKeepNotified as jest.Mock).mockImplementation(useKeepNotifiedMock);
    (useState as jest.Mock).mockImplementation(() => [true, disableNext]);
    (useState as jest.Mock).mockImplementation(() => [true, canGoBack]);
    (useState as jest.Mock).mockImplementation(() => [[], notificationDate]);
    useKeepNotifiedMock.mockReturnValue({
      sendSelectedInfoRequest:()=>{},
      getSelectedInfoRequest:()=>{},
      removeSelectedNotificationInfo:()=>{},
      removeKeepNotificationInfo:()=>{},
      getAllNotificationList:()=>{},
      isLoading: false,
      selectedNotificationInfo: {
        code: 200,
        message: 'string',
        data: []
      },
      sendSelectedNotificationInfo: {},
      allNotificationList: {
        code: 400,
        message: 'string',
        data: []
      },
    });
    const component = (
      <Provider store={storeSampleData}>
        <KeepNotifiedScreen route={{params: {canGoBack: true}}} />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render KeepNotifiedScreen', () => {
    expect(instance).toBeDefined();
  });

  it('When KeepNotifiedWidget onPress', () => {
    const testId = instance.container.findAllByType(KeepNotifiedWidget)[0];
    fireEvent(testId, 'onPress', data[0]);
    expect(mockFunction).toHaveBeenCalled;
  });

});

describe('<KeepNotifiedScreen>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const disableNext = mockFunction;
  const canGoBack = mockFunction;
  const notificationDate = mockFunction;
  const useKeepNotifiedMock = mockFunction;

  beforeEach(() => {
    (useKeepNotified as jest.Mock).mockImplementation(useKeepNotifiedMock);
    (useState as jest.Mock).mockImplementation(() => [true, disableNext]);
    (useState as jest.Mock).mockImplementation(() => [true, canGoBack]);
    (useState as jest.Mock).mockImplementation(() => [[], notificationDate]);
    useKeepNotifiedMock.mockReturnValue({
      sendSelectedInfoRequest:()=>{},
      getSelectedInfoRequest:()=>{},
      removeSelectedNotificationInfo:()=>{},
      removeKeepNotificationInfo:()=>{},
      getAllNotificationList:()=>{},
      isLoading: false,
      selectedNotificationInfo: {
        code: 200,
        message: 'string',
        data: []
      },
      sendSelectedNotificationInfo: {
        message: {
          code: 400,
        }
      },
      allNotificationList: {
        code: 400,
        message: 'string',
        data: []
      },
    });
    const component = (
      <Provider store={storeSampleData}>
        <KeepNotifiedScreen route={{params: {canGoBack: true}}} />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render KeepNotifiedScreen', () => {
    expect(instance).toBeDefined();
  });

  it('When KeepNotifiedWidget onPress', () => {
    const testId = instance.container.findAllByType(KeepNotifiedWidget)[0];
    fireEvent(testId, 'onPress', data[0]);
    expect(mockFunction).toHaveBeenCalled;
  });

});