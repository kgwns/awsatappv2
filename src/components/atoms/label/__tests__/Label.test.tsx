import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {Label} from 'src/components/atoms/label/Label';
import {Styles} from 'src/shared/styles';

describe('<Label />', () => {
  let instance: RenderAPI;

  // Test Data
  const labelTitle = 'label';

  beforeEach(() => {
    instance = render(<Label>{labelTitle}</Label>);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should display title', () => {
    expect(instance.queryByText(labelTitle)).not.toBeNull();
  });

  describe.each`
    labelType            | color
    ${'h1'}              | ${Styles.color.black}
    ${'h3'}              | ${Styles.color.black}
    ${'h4'}              | ${Styles.color.black}
    ${'h5'}              | ${Styles.color.black}
    ${'h6'}              | ${Styles.color.black}
    ${'h8'}              | ${Styles.color.black}
    ${'caption2'}        | ${Styles.color.black}
    ${'caption4'}        | ${Styles.color.black}
    ${'caption3'}        | ${Styles.color.black}
    ${'caption5'}        | ${Styles.color.black}
    ${'caption6'}        | ${Styles.color.black}
    ${'caption7'}        | ${Styles.color.black}
    ${'caption8'}        | ${Styles.color.black}
    ${'caption9'}        | ${Styles.color.black}
    ${'p5'}              | ${Styles.color.black}
    ${'p6'}              | ${Styles.color.black}
    ${'p3'}              | ${Styles.color.black}
    ${'p4'}              | ${Styles.color.black}
    ${'label10'}         | ${Styles.color.black}
    ${'underlinedTitle'} | ${Styles.color.black}
    ${'content'}         | ${Styles.color.black}
    ${'title4'}         | ${Styles.color.black}
    ${undefined}         | ${Styles.color.black}
  `(
    'when label type and color is $labelType',
    ({
      labelType,
      color,
    }: {
      labelType?:
        | 'h1'
        | 'h3'
        | 'h5'
        | 'h5'
        | 'h6'
        | 'h8'
        | 'caption5'
        | 'caption5'
        | undefined;
      color?: string;
    }) => {
      beforeEach(() => {
        instance = render(
          <Label color={color} labelType={labelType}>
            {labelTitle}
          </Label>,
        );
      });

      afterEach(() => {
        instance.unmount();
      });
      it('should display title', () => {
        expect(instance.queryByText(labelTitle)).not.toBeNull();
      });
    },
  );
});
