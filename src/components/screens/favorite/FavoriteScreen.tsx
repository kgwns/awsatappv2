import React, { useRef } from 'react';
import { View, StyleSheet} from 'react-native';
import { horizontalEdge, isTab, screenWidth } from 'src/shared/utils';
import { SignupAlertCard } from 'src/components/molecules';
import { ScreenContainer } from '..';
import { Archives } from 'src/components/organisms';
import {useLogin} from 'src/hooks';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ARCHIVES_UNIT_ID } from 'src/hooks/useAds'
import { AdContainer } from 'src/components/atoms/adContainer/AdContainer';


export const FavoriteScreen = () => {

  const navigation = useNavigation();

  const {isLoggedIn} = useLogin();
  const SIGN_UP_PH_SIGNUP = TranslateConstants({key:TranslateKey.SIGN_UP_PH_SIGNUP})
  const SIGN_UP_PH_MESSAGE = TranslateConstants({key:TranslateKey.SIGN_UP_PH_MESSAGE})
  const SIGN_UP_PH_TITLE = TranslateConstants({key:TranslateKey.SIGN_UP_PH_TITLE})

  const showupUp = useRef(!isLoggedIn)

  const style = useThemeAwareObject(customStyle);

  const ref = React.useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      global.refFlatList = ref;
    }, [])
  );

  const renderArchives = () => (
    <View style={[style.container, isTab && {marginHorizontal: 0.03 * screenWidth}]}>
      <Archives />
    </View>
  )

  const renderItem = () => (
    <View style={style.container}>
      {renderArchives()}
    </View>
  )

  const onPressSignup = () => {
    navigation.reset({
      index: 0,
      routes: [{name: ScreensConstants.AuthNavigator}],
    });
  }

  const onCloseSignUpAlert = () => {
    showupUp.current = false
  }

  return (
    <ScreenContainer edge={horizontalEdge}
      isSignUpAlertVisible={showupUp.current}
      onCloseSignUpAlert={onCloseSignUpAlert}
    >
      <AdContainer unitId={ARCHIVES_UNIT_ID}/>
      {isLoggedIn  ?
       renderItem() :
     <SignupAlertCard title={SIGN_UP_PH_TITLE} message={SIGN_UP_PH_MESSAGE}
     buttonText={SIGN_UP_PH_SIGNUP} onPress={onPressSignup}/> }
     
    </ScreenContainer>
  );
};
const customStyle = () => StyleSheet.create({
  container: {
      flex: 1
  }
})
