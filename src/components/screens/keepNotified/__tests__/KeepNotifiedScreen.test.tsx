import React, { useState } from 'react';
import { fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/Constants';
import {KeepNotifiedScreen} from '../KeepNotifiedScreen';
import { NotificationDataType } from 'src/redux/keepNotified/types';
import { useKeepNotified } from 'src/hooks'
import KeepNotifiedWidget from 'src/components/organisms/KeepNotifiedWidget';
import { ScreensConstants } from '../../../../constants/Constants';
import { NextButton } from 'src/components/atoms';
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn().mockImplementation(() => [false,() => null]),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false
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

  test('Should render KeepNotifiedScreen in Tab', () => {
    DeviceTypeUtilsMock.isTab = true;
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
    (useState as jest.Mock).mockImplementation(() => [false, disableNext]);
    (useState as jest.Mock).mockImplementation(() => [true, canGoBack]);
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

describe("KeepNotifiedScreen",() => {
  let instance: RenderAPI;
  const setState = jest.fn();
  const useKeepNotifiedMock = jest.fn();
  beforeEach(() => {
    (useKeepNotified as jest.Mock).mockImplementation(useKeepNotifiedMock);
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
          code: 200,
          message: 'string'
        }
      },
      allNotificationList: {
        code: 200,
        data: data
      }
    });
    (useState as jest.Mock).mockImplementation(() => [false,setState]).mockImplementationOnce(() => [ [
      {
        id: '2',
        name: 'abc'
      },
      {
        id: '3',
        name: 'abc'
      },
    ],setState]);
    const navigate = {
      goBack: jest.fn(),
      navigate: jest.fn()
    }
    const component = (
      <KeepNotifiedScreen route={{params: {canGoBack: false}}} navigation = {navigate} />
    )
    instance = render(component);
  })
  afterEach(() => {
    jest.clearAllMocks();
  })
  it("should call setState",() => {
    expect(setState).toHaveBeenCalled();
  })
  it("should call navigate and it navigates to success screen",() => {
    expect(instance.container.props.navigation.navigate).toHaveBeenCalled();
    expect(instance.container.props.navigation.navigate).toHaveBeenCalledWith(ScreensConstants.SUCCESS_SCREEN);
  })
})


describe("KeepNotifiedScreen",() => {
  let instance: RenderAPI;
  const setState = jest.fn();
  const useKeepNotifiedMock = jest.fn();
  beforeEach(() => {
    (useKeepNotified as jest.Mock).mockImplementation(useKeepNotifiedMock);
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
          code: 200,
          message: 'string'
        }
      },
      allNotificationList: {
        code: 200,
        data: data
      }
    });
    (useState as jest.Mock).mockImplementation(() => [false,setState]).mockImplementationOnce(() => [[],setState]);
    const navigate = {
      goBack: jest.fn(),
      navigate: jest.fn()
    }
    const component = (
      <KeepNotifiedScreen route={{params: {canGoBack: true}}} navigation = {navigate} />
    )
    instance = render(component);
  })
  afterEach(() => {
    jest.clearAllMocks();
  })
  it("should call navigate and it navigates to back",() => {
    expect(instance.container.props.navigation.goBack).not.toHaveBeenCalled();
  })
  it("Should call NextButton onPress",() => {
    const testId = instance.container.findByType(NextButton)
    fireEvent(testId,'onPress');
  })
})
