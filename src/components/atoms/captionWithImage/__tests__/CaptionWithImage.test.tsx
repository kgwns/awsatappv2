import React from 'react'
import { render, RenderAPI } from "@testing-library/react-native";
import { ImageName } from "../../index";
import { ImagesName, Styles } from "../../../../shared/styles";
import CaptionWithImage from "../CaptionWithImage";


describe('<Caption with Image', () => {
    let instance: RenderAPI
    const data = {
        title: 'يتحمل',
        icon: ImagesName.clock as ImageName,
        color: Styles.color.silverChalice,
    }

    beforeEach(() => {
        const component = (
            <CaptionWithImage
                title={data.title} icon={data.icon} color={data.color}
            />
        )
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Check render method', () => {
        expect(instance).toBeDefined()
    })
})