import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {NextButton} from 'src/components/atoms/NextButton/NextButton';

describe('<NextButton/>', () => {
  let instance: RenderAPI;

  // Test Data
  const stringData = 'title';

  beforeEach(() => {
    const component = (
      <NextButton
        title={stringData}
        onPress={() => {}}
        style={{
          nextButtonContainer: {},
          nextButtonIconContainer: {},
          nextButtonText: {},
        }}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should render NextButton', () => {
    expect(instance).toBeDefined();
  });
});
