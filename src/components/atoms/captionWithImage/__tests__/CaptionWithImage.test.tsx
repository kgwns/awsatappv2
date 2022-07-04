import React from 'react'
import { render, RenderAPI } from "@testing-library/react-native";
import { ImagesName, Styles } from "../../../../shared/styles";
import CaptionWithImage from "../CaptionWithImage";
import { normalize } from 'src/shared/utils';
import { getSvgImages } from 'src/shared/styles/svgImages';


describe('<Caption with Image', () => {
    let instance: RenderAPI
    const data = {
        title: 'يتحمل',
        icon: () => {return getSvgImages({
            name: ImagesName.clock,
            size: normalize(12),
            style: { marginRight: normalize(7) }
        })},
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