import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {NumberTab} from 'src/components/atoms/number-tab/NumberTab';
import {Styles} from 'src/shared/styles';

describe('<NumberTab />', () => {
  let instance: RenderAPI;

  // Test Data
  const numberTitle = 1;
  const labelTitle = 'label';
  const bgColor = Styles.color.altoGray;

  beforeEach(() => {
    const component = (
      <NumberTab
        numberBgColor={bgColor}
        labelBgColor={bgColor}
        numberValue={numberTitle}
        labelValue={labelTitle}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should render NumberTab', () => {
    expect(instance).toBeDefined();
  });
});
