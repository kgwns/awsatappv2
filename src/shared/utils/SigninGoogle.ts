import SocialLogin from './socialLogin';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export default class SigninGoogle extends SocialLogin {

  constructor(callback: Function) {
    super(callback)
    this.init()
  }

  init(): void {
    try {
      GoogleSignin.configure()
    } catch (err) {
      console.log(err, 'google configure error')
    }
  }

  login(): void {
    this.signIn()
  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.callBack(userInfo, true, 'google')
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow')
        this.callBack(undefined, false, 'google')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google Error: ', 'Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Error: ', 'Play Services Not Available or Outdated');
        this.callBack(undefined, false, 'google', 'ErrorOccured')
      } else {
        console.log(`Google Error statusCode${JSON.stringify(statusCodes)}`, error.message);
        if (error.message !== 'DEVELOPER_ERROR' && error.message !== 'Sign-in in progress') {
          this.callBack(undefined, false, 'google', 'ErrorOccured')
        }
      }
    }
  }

  logout(): void {
    this.signOut()
  }

  initialLogin(): void {
    return
  }

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
      this.callBack(undefined, false, 'google')
    } catch (error: any) {
      this.callBack(undefined, false, 'google')
    }
  };
}
