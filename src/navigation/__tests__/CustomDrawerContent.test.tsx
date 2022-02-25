import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { useRoute } from '@react-navigation/native';
import { Provider } from 'react-redux'
import { storeSampleData } from 'src/constants/SampleData'
import CustomDrawerContent  from '../CustomDrawerContent'



describe('<CustomDrawerContent>', () => {
    let instance: RenderAPI

    const params = {"key":"SectionArticlesScreen-91cFeh9o2Kg1fsaaeteVu","name":"SectionArticlesScreen","params":{"sectionId":102811,"title":"رياضة عالمية"}}

    beforeEach(() => {
       // (useRoute as jest.Mock).mockReturnValue(params);
        const component = 
            <Provider store={storeSampleData}>
                <CustomDrawerContent />
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

function navigationParams(navigationParams: any) {
    throw new Error('Function not implemented.');
}
