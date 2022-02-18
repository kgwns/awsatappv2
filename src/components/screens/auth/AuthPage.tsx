import React, {FunctionComponent} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenContainer} from '..';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../../shared/styles/colors';
import {normalize} from '../../../shared/utils';
import {Label, Image} from '../../atoms';
import {ImagesName} from '../../../shared/styles/images';
import {SocialButtonSection} from '../../../components/organisms/';
import {ScreensConstants} from 'src/constants';

export enum NavigateTypes {
  google = 'GOOGLE',
  apple = 'APPLE',
  facebook = 'FACEBOOK',
  email = 'EMAIL',
  termsAndConditions = 'TERMSANDCONDITIONS',
  signinPage = 'SIGNINPAGE',
}

export const AuthPage: FunctionComponent = () => {
  const navigation = useNavigation();

  const navigateToSection = (type: string) => {
    switch (type) {
      case NavigateTypes.google:
        return;
      case NavigateTypes.apple:
        return;
      case NavigateTypes.facebook:
        return;
      case NavigateTypes.email:
        return;
      case NavigateTypes.termsAndConditions:
        return;
      case NavigateTypes.signinPage:
        return;
      default:
        navigation.reset({
          index: 0,
          routes: [{name: ScreensConstants.OnBoardNavigator}],
        });
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <TouchableOpacity
            testID="signin_skip"
            accessibilityLabel="signin_skip"
            onPress={() => navigateToSection('')}>
            <Label
              children={'تخطى'}
              labelType="underlinedTitle"
              color={colors.greenishBlue}
              style={styles.headerLabelStyle}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.containerStyle}>
          <Image style={styles.logo} name={ImagesName.headerLogo} />
          <SocialButtonSection
            style={styles.sectionStyle}
            onButtonPress={navigateToSection}
          />
          <View style={styles.footerLabelContainer}>
            <Label
              children={'لديك حساب بالفعل؟'}
              labelType="p4"
              color={colors.greyDark50}
            />
            <TouchableOpacity
              testID="signin_button"
              accessibilityLabel="signin_button"
              onPress={() => navigateToSection('SIGNINPAGE')}>
              <Label
                children={'تسجيل الدخول'}
                labelType="p4"
                color={colors.greenishBlue}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footerStyle}>
          <View style={styles.footerLabelContainer}>
            <Label
              children={'عن طريق تسجيل الدخول تكون قد وافقت على'}
              labelType="p5"
              color={colors.greyDark50}
            />
            <TouchableOpacity
              testID="terms_and_conditions"
              accessibilityLabel="terms_and_conditions"
              onPress={() => navigateToSection('TERMSANDCONDITIONS')}>
              <Label
                children={'القواعد و الشروط'}
                labelType="p5"
                color={colors.greenishBlue}
              />
            </TouchableOpacity>
          </View>
          <Label
            children={
              'لاستخدام التطبيق و باقي حقوق الملكية و الموافقه للبراجراف'
            }
            labelType="p5"
            color={colors.greyDark50}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: normalize(20),
    paddingHorizontal: normalize(20),
    justifyContent: 'space-between',
  },
  headerStyle: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headerLabelStyle: {
    fontSize: normalize(15),
  },
  containerStyle: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalize(30),
  },
  footerStyle: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: normalize(15),
  },
  logo: {
    width: normalize(150),
    height: normalize(30),
  },
  sectionStyle: {
    marginTop: normalize(50),
  },
});
