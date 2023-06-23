import { GoogleSignin } from "@react-native-google-signin/google-signin";
import SigninGoogle from "../SigninGoogle";
jest.mock("@react-native-google-signin/google-signin", () => ({
  GoogleSignin: {
    signOut: jest.fn(),
    revokeAccess: jest.fn().mockImplementation(() => Promise.resolve()),
    hasPlayServices: jest.fn().mockImplementation(() => Promise.resolve()),
    signIn: jest.fn().mockImplementation(() => Promise.resolve())
  }
}))

describe("test facebookSignIn", () => {
  let instance: any;
  const mockFunction = jest.fn();
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    instance = new SigninGoogle(mockFunction);
  });
  afterEach(() => {
    jest.clearAllMocks();
  })
  it("should render a component", () => {
    instance.login();
    expect(instance).toBeDefined();
  })
  it("test initialLogin() method", () => {
    const result = instance.initialLogin();
    expect(result).toBeUndefined();
  })
  it("test logout()", async () => {
    instance.logout();
    expect(GoogleSignin.revokeAccess).toHaveBeenCalled();
  })
})

