import { LoginManager, AccessToken, Settings, GraphRequest, GraphRequestManager } from "react-native-fbsdk-next";
import SocialLogin from './socialLogin';

export default class SignInFacebook extends SocialLogin {
    fbUserId: string;

    constructor(callback: Function) {
        super(callback)
        this.fbUserId = ''
    }

    init(): void {
        Settings.setAppID('374745497486996');
    }

    login(): void {
        LoginManager.logInWithPermissions(['public_profile', 'email']).then((result: any) => {
            if (result.isCancelled) {
                //console.log('** Facebook Login Canceled **')
                this.callBack(undefined, false, 'facebook')
            } else {
                AccessToken.getCurrentAccessToken().then((data: any) => {
                    const { accessToken } = data
                    const { userID } = data
                    this.fbUserId = userID
                    this.fetchUserInfo(accessToken)
                })
            }
        },
            (error: any) => {
                console.log('Facebook Error:', error);
                this.callBack(undefined, false, 'facebook', 'ErrorOccured');
            }
        )
    }

    initialLogin(): void {
        AccessToken.getCurrentAccessToken().then((data: AccessToken | null) => {
            if (data !== null) {
                const { accessToken } = data
                const { userID } = data
                this.fbUserId = userID
                this.fetchUserInfo(accessToken)
            }
        })
    }

    logout(): void {
        LoginManager.logOut()
        this.callBack(undefined, false, 'facebook')
    }

    fetchUserInfo = (accessToken: string) => {
        const FB_FIELDS = 'email,gender,name,first_name,last_name,picture.type(large)'
        const config = {
            accessToken: accessToken.toString(),
            parameters: { fields: { string: FB_FIELDS } }
        }
        const infoRequest = new GraphRequest('/me', config, this._responseInfoCallback)
        new GraphRequestManager().addRequest(infoRequest).start()
    }

    _responseInfoCallback = (error: any, result: any) => {
        if (error) {
            console.log('Facebook Error: ', error.toString());
            this.callBack(undefined, false, 'facebook', 'ErrorOccured');
        } else {
            console.log('** FB Response result::', result)
            const resultData = {
                user: {
                    name: result?.name,
                    email: result?.email,
                    givenName: result?.first_name,
                    familyName: result?.last_name,
                    id: this.fbUserId,
                    profile_url: `https://graph.facebook.com/${this.fbUserId}/picture?type=large&width=720&height=720`
                },
            }
            this.callBack(resultData, true, 'facebook')
        }
    }
}

function socialLoginEnded(): any {
    throw new Error("Function not implemented.");
}
