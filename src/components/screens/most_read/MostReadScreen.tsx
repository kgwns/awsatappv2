import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  useColorScheme
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { colors } from '../../../shared/styles/colors';

export const MostReadScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{ height: '100%', width: '100%', alignItems: "center", justifyContent: "center", backgroundColor: colors.aquaHaze }}>
        <Text >{"Most Read"}</Text>
      </View>
    </SafeAreaView>
  );
};