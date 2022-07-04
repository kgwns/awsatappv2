import React, { useState } from 'react';
import { render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/SampleData';
import {KeepNotifiedScreen} from '../KeepNotifiedScreen';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const data = [
  {
    nid: 1,
    label: 'أخبار عاجلة',
    selected: false
  },
  {
    nid: 2,
    label: 'إحاطة الصباح',
    selected: false,
  },
  {
    nid: 3,
    label: 'أهم الأخبار',
    selected: false,
  },
  {
    nid: 4,
    label: 'أخبار فيروس كورونا',
    selected: false,
  },
  {
    nid: 5,
    label: 'إحاطة الصباح',
    selected: false,
  },
  {
    nid: 6,
    label: 'أخبار عاجلة',
    selected: false,
  }
]

describe('<KeepNotifiedScreen>', () => {
  let instance: RenderAPI;

  const setDisableNext = jest.fn()
  const setNotificationData = jest.fn()

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, setDisableNext]);
    (useState as jest.Mock).mockImplementation(() => [data, setNotificationData]);
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
