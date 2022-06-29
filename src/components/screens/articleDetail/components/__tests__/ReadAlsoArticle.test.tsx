import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { ReadAlsoArticle} from 'src/components/screens/articleDetail/components/ReadAlsoArticle';
import { storeSampleData } from 'src/constants/SampleData';


describe('<ReadAlsoArticle>', () => {
    let instance: RenderAPI;
    
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <ReadAlsoArticle title={''} data={[]}/>
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
    
})