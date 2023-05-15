import {  RenderAPI } from "@testing-library/react-native";
import AdjustAnalyticsManager from "../AdjustAnalyticsManager";
import React from "react";
jest.mock('react-native-adjust',() => ({
    ...jest.requireActual('react-native-adjust'),
    Adjust: {
        getSdkVersion: jest.fn(),
        create: jest.fn(),
    },
}))
describe("test facebookSignIn",() => {
  let instance: RenderAPI;
  beforeEach(() => {
    jest.useFakeTimers({
        legacyFakeTimers: true
    });
    instance = <AdjustAnalyticsManager/>
  });
  afterEach(() => {
      jest.clearAllMocks();
  })
  it("should render a component",() => {
      expect(instance).toBeDefined();
  })
})

