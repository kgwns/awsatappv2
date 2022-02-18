import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {FollowFavoriteAuthorWidget} from 'src/components/organisms';

describe('<FollowFavoriteAuthorWidget>', () => {
  let instance: RenderAPI;

  const sampleData: any = [
    {
      name: 'name',
      tid: 'tid',
      field_opinion_writer_photo_export: 'field_opinion_writer_photo_export',
      isSelected: 'false',
    },
  ];

  beforeEach(() => {
    const component = <FollowFavoriteAuthorWidget data={sampleData} />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render FollowFavoriteAuthorWidget component', () => {
    expect(instance).toBeDefined();
  });
});
