import { LoginManager, AccessToken, Settings, GraphRequest, GraphRequestManager  } from "react-native-fbsdk-next";
import SocialLogin from './socialLogin';
import { store } from 'src/redux/store';

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
      LoginManager.logInWithPermissions(['public_profile', 'email', 'user_birthday']).then((result: any) => {
          if (result.isCancelled) {
              //store.dispatch(socialLoginEnded());
              console.log('** Facebook Login Canceled **')
              this.callBack(undefined, false, 'facebook')
          } else {
              AccessToken.getCurrentAccessToken().then((data: any) => {
                  const {accessToken} = data
                  const {userID} = data
                  this.fbUserId = userID
                  this.fetchUserInfo(accessToken)
              })
          }},
          (error: any) => {
              this.showErrorMessage('FB Login fail with error: ' + error)
          }
      )
  }

  logout(): void {
      LoginManager.logOut()
      this.callBack(undefined, false, 'facebook')
  }

  fetchUserInfo = (accessToken: String) => {
      const FB_FIELDS = 'email,gender,name,first_name,last_name,picture.type(large),birthday'
      const config = {
          accessToken: accessToken.toString(),
          parameters: {fields: {string: FB_FIELDS}}
      }
      const infoRequest = new GraphRequest('/me', config, this._responseInfoCallback)
      new GraphRequestManager().addRequest(infoRequest).start()
  }

  _responseInfoCallback = (error: any, result: any) => {
      if (error) {
          this.showErrorMessage('Error fetching data: ' +error.toString());
      } else {
          console.log('** FB Response result::', result)
          let resultData = {
            user:{
              name: result?.name,
              email: result?.email,
              givenName: result?.first_name,
              familyName: result?.last_name,
              id: this.fbUserId,
              birthday: result?.birthday
            },
          }
          this.callBack(resultData, true, 'facebook')
      }
  }
}

function socialLoginEnded(): any {
    throw new Error("Function not implemented.");
}
