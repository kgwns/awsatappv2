import React, { useState } from 'react';
import { render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/SampleData';
import {KeepNotifiedScreen} from '../KeepNotifiedScreen';
import { NotificationDataType } from 'src/redux/keepNotified/types';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock("src/hooks/useKeepNotified", () => ({
  useKeepNotified: () => {
      return {
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
      }
  },
}));

const data: NotificationDataType[] = [
  {
    id: 1,
    name: 'أخبار عاجلة',
    selected: false
  },
  {
    id: 2,
    name: 'إحاطة الصباح',
    selected: false,
  },
  {
    id: 3,
    name: 'أهم الأخبار',
    selected: false,
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

describe('<KeepNotifiedScreen>', () => {
  let instance: RenderAPI;

  const setDisableNext = jest.fn()
  const notificationDate = jest.fn()

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, setDisableNext]);
    (useState as jest.Mock).mockImplementation(() => [data, notificationDate]);
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
});
