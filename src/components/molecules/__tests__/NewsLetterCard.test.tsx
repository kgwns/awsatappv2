import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {NewsLetterCard} from 'src/components/molecules';
describe('<NewsLetterCard>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const labelTitle = 'النشره الصباحيه';
  beforeEach(() => {
    const component = (
      <NewsLetterCard title={''} subTitle={''} description={''} image={undefined} isSelected={false} onPress={mockFunction}/>
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
  it('Should Press Card', () => {
    const element = instance.getByTestId('CardTestId');
    fireEvent.press(element);
  });
});
