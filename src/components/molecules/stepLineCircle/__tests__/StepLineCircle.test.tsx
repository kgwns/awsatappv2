import { render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { StepLineCircle } from 'src/components/molecules/stepLineCircle/StepLineCircle'

jest.mock("src/hooks/useAppCommon", () => ({
    useAppCommon: () => {
        return {
            theme: 'dark',
        }
    },
}));

describe('<StepLineCircle />', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component = <StepLineCircle currentStep={0} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('should render component', () => {
        expect(instance).toBeDefined()
    })

    it('should render component with different step', () => {
        const stepComponent = <StepLineCircle currentStep={3} />
        instance = render(stepComponent)
        expect(instance).toBeDefined()
    })

})