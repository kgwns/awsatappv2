import SocialLogin from './socialLogin';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';

export default class SigninGoogle extends SocialLogin {

    constructor(callback:Function){
        super(callback)
        this.init()
    }

    init(): void {
      try {
        GoogleSignin.configure()
      }
      catch (err) {
        console.log(err,'google configure error')
      }
    }

    login(): void {
        this.signIn()
    }

    signIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        this.callBack(userInfo,true,'google')
      } catch (error:any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('User Cancelled the Login Flow')
        } else if (error.code === statusCodes.IN_PROGRESS) {
          //this.showErrorMessage('Signing In')
          console.log('Google Error: ','Signing In');
          this.callBack(undefined, false, 'ErrorOccured')
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('Google Error: ','Play Services Not Available or Outdated');
          this.showErrorMessage('Play Services Not Available or Outdated')
          this.callBack(undefined, false, 'ErrorOccured')
        } else {
          this.showErrorMessage('Error occured. Please try again')
          this.callBack(undefined, false, 'ErrorOccured')
        }
      }
    }

    logout(): void {
        this.signOut()
    }

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess()
            await GoogleSignin.signOut()
            this.callBack(undefined, false, 'google')
        } catch (error:any) {
            this.showErrorMessage(error)
            this.callBack(undefined, false, 'google')
        }
    };
}