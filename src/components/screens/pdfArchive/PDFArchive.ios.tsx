import React, { useState } from 'react';
import { requireNativeComponent, TouchableOpacity, StyleSheet } from 'react-native';
import { horizontalAndTop, screenWidth } from 'src/shared/utils';
import { TranslateConstants, TranslateKey } from 'src/constants/TranslateConstants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreensConstants } from 'src/constants';
import { ScreenContainer } from '../ScreenContainer/ScreenContainer';
import { Image } from 'src/components/atoms';
import { ImagesName, Styles } from 'src/shared/styles';
import { useAppCommon } from 'src/hooks';
import { Theme } from 'src/redux/appCommon/types';

const PDFArchiveView: any = requireNativeComponent('RNPDFArchiveView')

enum ArchiveLayoutType {
  grid = 'grid',
  list = 'list',
}

export const PDFArchiveIOS = () => {
  const navigation = useNavigation<StackNavigationProp<any>>()
  const { theme } = useAppCommon()

  const [layoutSelectedType, setLayoutSelectedType] = useState(ArchiveLayoutType.grid)

  const onClickOpenPDF = (selectedPDF: any) => {
    navigation.navigate(ScreensConstants.PDF_EDITOR_VIEW, { selectedPDF: selectedPDF })
  }

  const headerTitle = TranslateConstants({ key: TranslateKey.DRAWER_PDF_ARCHIVE })

  const onPressChangeLayout = () => {
    const newLayout = layoutSelectedType == ArchiveLayoutType.grid ? ArchiveLayoutType.list : ArchiveLayoutType.grid
    setLayoutSelectedType(newLayout)
  }

  const headerLeftElement = () => {
    const iconName = layoutSelectedType == ArchiveLayoutType.grid ? ImagesName.gridToggleIcon : ImagesName.listToggleIcon
    const tintColor = theme === Theme.DARK ? Styles.color.white : Styles.color.black
    return (
      <TouchableOpacity style={style.iconContainer} onPress={onPressChangeLayout}>
        <Image name={iconName} size={20} style={{ tintColor: tintColor }} />
      </TouchableOpacity>
    )
  }

  return (
    <ScreenContainer edge={horizontalAndTop} showHeader={true} headerTitle={headerTitle}
      headerLeft={headerLeftElement}>
      <PDFArchiveView style={{ flex: 1 }}
        onItemClick={(data: any) => onClickOpenPDF(data.nativeEvent.SelectedPDF)}
        selectedLayoutTypeInfo={layoutSelectedType.toString()}
      />
    </ScreenContainer>
  );
};

const style = StyleSheet.create({
  iconContainer: {
    position: 'absolute', right: 0.04 * screenWidth
  }
})