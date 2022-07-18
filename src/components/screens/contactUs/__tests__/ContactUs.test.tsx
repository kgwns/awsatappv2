import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'
import { ContactUs } from '../ContactUs'

// jest.mock("src/hooks/useContactUs", () => ({
//     useContactUs: () => {
//       return {
//         isLoading: true,
//         sendSuccessInfo: {},
//         sendErrorInfo: 'error',
//         sendContactUsInfo: () => {},
//         emptyContactUsInfo: () => {},
//       }
//     },
//   }));

describe('<ContactUs>', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component =
            <Provider store={storeSampleData}>
                <ContactUs />
            </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        expect(instance).toBeDefined()
    })
})