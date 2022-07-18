import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ArchivesPodcast } from 'src/components/molecules';

describe('<ArchivesPodcast>', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component = <ArchivesPodcast />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('should render component', () => {
        expect(instance).toBeDefined()
    })

    it('When ArchivesPodcastTO1 is pressed', () => {
        const testItemId = instance.getByTestId('ArchivesPodcastTO1');
        fireEvent(testItemId, 'onPress');
        expect(console.log).toBeTruthy();
    });
})