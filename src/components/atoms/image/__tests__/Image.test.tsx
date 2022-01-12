import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';

import {Image} from 'src/components/atoms/image/Image';

describe('<Image>', () => {
  let instance: RenderAPI;
  const IMAGE_SIZE = 40;
  const IMAGE_URL = 'https:www.abc.com/abc.png';

  beforeEach(() => {
    const component = (
      <Image name={'homeIcon'} type="round" size={IMAGE_SIZE} />
    );
    instance = render(component);
  });

  it('should render component', () => {
    expect(instance).toBeDefined();
  });

  it('should Image name is homeIcon', () => {
    expect(instance.container.props.name).toBe('homeIcon');
  });

  it('should type is round', () => {
    expect(instance.container.props.type).toBe('round');
  });

  it('should size is 40', () => {
    expect(instance.container.props.size).toBe(IMAGE_SIZE);
  });

  describe('when Image render without type and size', () => {
    beforeEach(() => {
      const component = <Image name={'homeIcon'} />;
      instance = render(component);
    });

    it('Should render component', () => {
      expect(instance).toBeDefined();
    });
  });

  describe('when Image render with url', () => {
    beforeEach(() => {
      const component = <Image url={IMAGE_URL} />;
      instance = render(component);
    });

    it('Should render component', () => {
      expect(instance).toBeDefined();
    });
  });
});
