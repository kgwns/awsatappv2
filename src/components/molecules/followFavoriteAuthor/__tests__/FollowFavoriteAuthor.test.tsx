import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {FollowFavoriteAuthor} from 'src/components/molecules';

describe('<FollowFavoriteAuthor />', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  // Test Data
  const authorName = 'authorName';
  const authordescription = 'authorDescription';
  const authorImage = 'https://picsum.photos/200';
  const isSelected = false;
  const testID = 'FollowFavoriteAuthorTestId';

  beforeEach(() => {
    const component = (
      <FollowFavoriteAuthor
        authorName={authorName}
        authorDescription={authordescription}
        authorImage={authorImage}
        isSelected={isSelected}
        testId={testID}
        onPress={mockFunction}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should render FollowFavoriteAuthor', () => {
    expect(instance).toBeDefined();
  });
  it('should label name is AuthorName', () => {
    expect(instance.container.props.authorName).toBe('authorName');
  });
  it('should label name is AuthorDescription', () => {
    expect(instance.container.props.authorDescription).toBe(
      'authorDescription',
    );
  });
  it('When FollowFavoriteAuthor is pressed', () => {
    const testItemId = instance.getByTestId('FollowFavoriteAuthorTestId');
    fireEvent(testItemId, 'onPress');
    expect(mockFunction).toHaveBeenCalled();
  });
});
