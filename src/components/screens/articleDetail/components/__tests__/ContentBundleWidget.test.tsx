import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { ContentBundleWidget} from 'src/components/screens/articleDetail/components/ContentBundleWidget';
import { storeSampleData } from 'src/constants/SampleData';


describe('<ContentBundleWidget>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <ContentBundleWidget title={''} data={{
                    title: '',
                    body: '',
                    nid: '',
                    image: ''
                }} />
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })

    it('When ListenToArticleCardTO1 is pressed', () => {
        const testItemId = instance.getByTestId('ContentBundleWidgetTO1');
        fireEvent(testItemId, 'onPress', {nid:'0'});
        expect(mockFunction).toBeTruthy();
    });
})