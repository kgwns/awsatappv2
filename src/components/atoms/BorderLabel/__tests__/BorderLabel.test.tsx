import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { BorderLabel } from 'src/components/atoms/BorderLabel/BorderLabel';

describe('<BorderLabel/>', () => {
  let instance: RenderAPI;
  // Test Data
  const labelTitle = 'label';
  const mockFunction = jest.fn();
  describe('when BorderLabel only', () => {
    beforeEach(() => {
      const component = (
        <BorderLabel
          testID={'BorderLabel'}
          label={labelTitle}
          onPress={mockFunction}
          isSelected={true}
          clickable={true}
        />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render BorderLabel', () => {
      expect(instance).toBeDefined();
    });
    it('should label name is label', () => {
      expect(instance.container.props.label).toBe('label');
    });
    it('When ButtonTab is pressed', () => {
      const testItemId = instance.getByTestId('BorderLabel');
      fireEvent(testItemId, 'onPress');
      expect(mockFunction).toHaveBeenCalled();
    });
  });
});

describe('<BorderLabel/>', () => {
  let instance: RenderAPI;
  // Test Data
  const labelTitle = 'label';
  const mockFunction = jest.fn();
  describe('when BorderLabel only', () => {
    beforeEach(() => {
      const component = (
        <BorderLabel
          testID={'BorderLabel'}
          label={labelTitle}
          onPress={mockFunction}
          isSelected={false}
          clickable={true}
        />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render BorderLabel', () => {
      expect(instance).toBeDefined();
    });
    it('should label name is label', () => {
      expect(instance.container.props.label).toBe('label');
    });
    it('When ButtonTab is pressed', () => {
      const testItemId = instance.getByTestId('BorderLabel');
      fireEvent(testItemId, 'onPress');
      expect(mockFunction).toHaveBeenCalled();
    });
  });
});

describe('<BorderLabel/>', () => {
  let instance: RenderAPI;
  // Test Data
  const labelTitle = 'label';
  const mockFunction = jest.fn();
  describe('when BorderLabel only', () => {
    beforeEach(() => {
      const component = (
        <BorderLabel
          testID={'BorderLabel'}
          label={labelTitle}
          onPress={mockFunction}
          isSelected={true}
          clickable={false}
        />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render BorderLabel', () => {
      expect(instance).toBeDefined();
    });
    it('should label name is label', () => {
      expect(instance.container.props.label).toBe('label');
    });
  });
});

describe('<BorderLabel/>', () => {
  let instance: RenderAPI;
  // Test Data
  const labelTitle = 'label';
  const mockFunction = jest.fn();
  describe('when BorderLabel only', () => {
    beforeEach(() => {
      const component = (
        <BorderLabel
          testID={'BorderLabel'}
          label={labelTitle}
          onPress={mockFunction}
          isSelected={false}
          clickable={false}
        />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render BorderLabel', () => {
      expect(instance).toBeDefined();
    });
    it('should label name is label', () => {
      expect(instance.container.props.label).toBe('label');
    });
  });
});

describe('<BorderLabel/>', () => {
  let instance: RenderAPI;
  // Test Data
  const labelTitle = 'label';
  const mockFunction = jest.fn();
  describe('when BorderLabel only', () => {
    beforeEach(() => {
      const component = (
        <BorderLabel
          testID={'BorderLabel'}
          label={labelTitle}
          onPress={mockFunction}
        />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render BorderLabel', () => {
      expect(instance).toBeDefined();
    });
    it('should label name is label', () => {
      expect(instance.container.props.label).toBe('label');
    });
  });
});
