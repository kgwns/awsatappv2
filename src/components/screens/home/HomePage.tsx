import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  useColorScheme
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useHome } from 'src/hooks';

const HomePage = () => {
  const [t] = useTranslation();
  const { fetchHomeRequest, isLoading, homeError, homeData } = useHome();
  useEffect(() => {
    fetchHomeRequest({ page: 1 })
  }, [])

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{ height: '100%', width: '100%', alignItems: "center", justifyContent: "center" }}>
        <Text >{"Welcome to AL-AWSAT APP"}</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomePage