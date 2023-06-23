import SignInFacebook from "../SignInFacebook"
import { RenderAPI } from "@testing-library/react-native";
import { LoginManager, Settings } from "react-native-fbsdk-next";
jest.mock("react-native-fbsdk-next", () => ({
    ...jest.requireActual("react-native-fbsdk-next"),
    Settings: {
        setAppID: jest.fn()
    },
    LoginManager: {
        logInWithPermissions: jest.fn().mockResolvedValue({ isCancelled: false }),
        logOut: jest.fn()
    },
    AccessToken: {
        getCurrentAccessToken: jest.fn().mockResolvedValue({ accessToken: 'accessToken', userID: 'userID' })
    },
    GraphRequest: jest.fn(),
    GraphRequestManager: jest.fn().mockReturnValue({
        addRequest: jest.fn().mockReturnValue({
            start: jest.fn()
        })
    }),

}))
describe("test facebookSignIn", () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    beforeEach(() => {
        instance = new SignInFacebook(mockFunction);
    });
    afterEach(() => {
        jest.clearAllMocks();
    })
    it("should render a component", () => {
        instance.initialLogin();
        expect(instance).toBeDefined();
    })
    it("test init() method", () => {
        instance.init();
        expect(Settings.setAppID).toHaveBeenCalled();
    })
    it("test logout()", () => {
        instance.logout();
        expect(LoginManager.logOut).toHaveBeenCalled();
        expect(mockFunction).toHaveBeenCalled();
    })
    it("should render _responseInfoCallback error part", () => {
        instance._responseInfoCallback('error', { result: false });
        expect(mockFunction).toHaveBeenCalled();
    })
    it("should render _responseInfoCallback response part", () => {
        instance._responseInfoCallback('', { result: { name: 'name', emai: 'email@gmail.com', first_name: 'John', last_name: 'Doe' } });
        expect(mockFunction).toHaveBeenCalled();
    })
    it("login returns response", () => {
        instance.login();
        expect(mockFunction).not.toHaveBeenCalled();
    })
})