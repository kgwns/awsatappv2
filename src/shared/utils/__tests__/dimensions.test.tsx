import { Dimensions, Platform } from "react-native"
import { isPortrait, normalize, normalizeBy320 } from "../dimensions"

describe("Dimensions", () => {

    describe('android', () => {

        it("normalize should return the pixel perfect value", () => {
            Platform.OS = 'android'
            let normalizeValue = (normalize(100, 'width'))
            expect(normalizeValue).not.toEqual(100)

            normalizeValue = (normalize(100, 'height'))
            expect(normalizeValue).not.toEqual(100)
        });

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

    describe('isPortrait',() => {
        it("test isPortrait",() => {
            const result = isPortrait();
            expect(Dimensions.get('window')).toBeDefined();
            expect(result).toBeTruthy();
            expect(typeof result).toBe("boolean");
        })
    });

    describe('normalizeBy320',() => {
        it('test normalizeBy320',() => {
            const result = normalizeBy320(20,'width');
            expect(result).toBeDefined();
            expect(typeof result).toBe("number")
        })

        it('test normalizeBy320',() => {
            const result = normalizeBy320(20,'height');
            expect(result).toBeDefined();
            expect(typeof result).toBe("number")
        })
    })
})
