import { Platform } from "react-native"
import { normalize } from "../dimensions"

describe("Dimensions", () => {

    describe('android', () => {

        it("normalize should return the pixel perfect value", () => {
            Platform.OS = 'android'
            let normalizeValue = (normalize(100, 'width'))
            expect(normalizeValue).not.toEqual(100)

            normalizeValue = (normalize(100, 'height'))
            expect(normalizeValue).not.toEqual(100)
        })
    })

    describe('ios', () => {

        it("normalize should return the pixel perfect value", () => {

            Platform.OS = 'ios'
            
            let normalizeValue = (normalize(100, 'width'))
            expect(normalizeValue).not.toEqual(100)

            normalizeValue = (normalize(100, 'height'))
            expect(normalizeValue).not.toEqual(100)
        })
    })
})
