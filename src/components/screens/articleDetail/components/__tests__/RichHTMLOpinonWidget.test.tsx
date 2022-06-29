import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { RichHTMLOpinonWidget} from 'src/components/screens/articleDetail/components/RichHTMLOpinonWidget';
import { storeSampleData } from 'src/constants/SampleData';


describe('<RichHTMLOpinonWidget>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <RichHTMLOpinonWidget data={{
                    name: '',
                    title: '',
                    image: '',
                    nid: '',
                    writerId: ''
                }}/>
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

    it('When RichHTMLOpinonWidgetLabel1 is pressed', () => {
        const testItemId = instance.getByTestId('RichHTMLOpinonWidgetLabel1');
        fireEvent(testItemId, 'onPress', {nid:'0'});
        expect(mockFunction).toBeTruthy();
    });

    it('When RichHTMLOpinonWidgetLabel2 is pressed', () => {
        const testItemId = instance.getByTestId('RichHTMLOpinonWidgetLabel2');
        fireEvent(testItemId, 'onPress', {nid:'0'});
        expect(mockFunction).toBeTruthy();
    });

    it('When RichHTMLOpinonWidgetTO1 is pressed', () => {
        const testItemId = instance.getByTestId('RichHTMLOpinonWidgetTO1');
        fireEvent(testItemId, 'onPress', {nid:'0'});
        expect(mockFunction).toBeTruthy();
    });

    it('When RichHTMLOpinonWidgetTO2 is pressed', () => {
        const testItemId = instance.getByTestId('RichHTMLOpinonWidgetTO2');
        fireEvent(testItemId, 'onPress', {nid:'0'});
        expect(mockFunction).toBeTruthy();
    });
      
})