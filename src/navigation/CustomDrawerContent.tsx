import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import * as React from 'react';
import {Text, View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {ImagesName} from '../shared/styles/images';
import {Image} from '../components/atoms';
import {ButtonList, Divider} from 'src/components/atoms';
import {useTranslation} from 'react-i18next';
import {normalize} from 'src/shared/utils';
import CloseIcon from 'src/assets/images/icons/close.svg';
import { DrawerActions, useNavigation } from '@react-navigation/native';

interface CustomDrawerContentProps {}

const CustomDrawerContent = (props: CustomDrawerContentProps) => {
  const [t] = useTranslation();
  const navigation = useNavigation();


  const header = () => (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} name={ImagesName.headerLogo} />
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <CloseIcon style={styles.closeIcon} />
        </TouchableOpacity>
        
      </View>
    </View>
  );
  return (
    <SafeAreaView>
      {header()}
      <View style={styles.menuContainer}>
        <ButtonList
          title={t('drawer.latestNews')}
          onPress={() => console.log('clicked')}
        />
        <ButtonList
          title={t('drawer.first')}
          onPress={() => console.log('clicked')}
        />
        <ButtonList
          title={t('drawer.firstNews')}
          onPress={() => console.log('clicked')}
        />
        <ButtonList
          title={t('drawer.theOpinion')}
          onPress={() => console.log('clicked')}
        />
        <ButtonList
          title={t('drawer.economy')}
          onPress={() => console.log('clicked')}
        />
        <ButtonList
          title={t('drawer.sports')}
          onPress={() => console.log('clicked')}
        />
        <ButtonList
          title={t('drawer.supplements')}
          onPress={() => console.log('clicked')}
        />
        <ButtonList
          title={t('drawer.culture')}
          onPress={() => console.log('clicked')}
        />
        <ButtonList
          title={t('drawer.eastFiles')}
          onPress={() => console.log('clicked')}
        />
        <ButtonList
          title={t('drawer.mix')}
          onPress={() => console.log('clicked')}
        />
        <Divider />
        <ButtonList
          title={t('drawer.advertiseWithUs')}
          onPress={() => console.log('clicked')}
          titleStyle={styles.nonBoldTitle}
        />
        <ButtonList
          title={t('drawer.aboutTheEast')}
          onPress={() => console.log('clicked')}
          titleStyle={styles.nonBoldTitle}
        />
        <ButtonList
          title={t('drawer.callUs')}
          onPress={() => console.log('clicked')}
          titleStyle={styles.nonBoldTitle}
        />
      </View>
    </SafeAreaView>

    // <View style={{marginTop:60}}><LeftArrow/></View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center'
  },
  closeIcon: {
    margin: 7
  },
  headerRight:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
  },
  menuContainer: {
    marginHorizontal: normalize(35),
  },
  drawerItemStyle: {
    left: 0,
    width: '100%',
  },
  logo: {
    height: 30,
    width: 140,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  nonBoldTitle: {
    fontWeight: 'normal'
  }
});
