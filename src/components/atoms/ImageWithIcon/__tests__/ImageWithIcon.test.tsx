import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {ImageWithIcon} from 'src/components/atoms/ImageWithIcon/ImageWithIcon';

describe('<ImageWithIcon/>', () => {
    let instance: RenderAPI;
    describe('when ImageWithIcon only', () => {
      beforeEach(() => {
        const component = (
          <ImageWithIcon
            bottomTag={''}
          />
        );
        instance = render(component);
      });
  
      afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
      });
      it('Should render ImageWithIcon', () => {
        expect(instance).toBeDefined();
      });
    });
  });