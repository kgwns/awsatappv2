import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import FooterCaptionWithImage from 'src/components/atoms/footerCaptionWithImage/FooterCaptionWithImage'

describe('<FooterCaptionWithImage />', () => {
  let instance: RenderAPI;
  beforeEach(() => {
    const component = (
      <FooterCaptionWithImage
        title={'test'}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render component', () => {
    expect(instance).toBeDefined();
  });
});
