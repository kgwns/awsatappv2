import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { horizontalAndTop, screenWidth } from 'src/shared/utils';
import { TranslateConstants, TranslateKey, ScreensConstants } from 'src/constants/Constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreenContainer } from '../ScreenContainer/ScreenContainer';
import { ImagesName } from 'src/shared/styles';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { getRequiredNativeComponent } from 'src/shared/utils/NativeComponent';

export const PDFArchiveView: any = getRequiredNativeComponent('RNPDFArchiveView')

enum ArchiveLayoutType {
  grid = 'grid',
  list = 'list',
}

export const PDFArchiveIOS = () => {
  const navigation = useNavigation<StackNavigationProp<any>>()

  const [layoutSelectedType, setLayoutSelectedType] = useState(ArchiveLayoutType.grid)

  const onClickOpenPDF = (selectedPDF: any) => {
    navigation.navigate(ScreensConstants.PDF_EDITOR_VIEW, { selectedPDF })
  }

  const headerTitle = TranslateConstants({ key: TranslateKey.DRAWER_PDF_ARCHIVE })

  const onPressChangeLayout = () => {
    const newLayout = layoutSelectedType === ArchiveLayoutType.grid ? ArchiveLayoutType.list : ArchiveLayoutType.grid
    setLayoutSelectedType(newLayout)
  }

  const ToggleSVG = ({ iconName }: { iconName: ImagesName }) => {
    const iconSize = iconName === ImagesName.listToggleIcon ? 25 : 22
    const iconStyle = {marginRight: iconName === ImagesName.listToggleIcon ? 5 : 0}
    return (
      <>
        {getSvgImages({
          name: iconName, width: iconSize, height: iconSize, style:{iconStyle}
        })}
      </>
    )
  }

  const headerLeftElement = () => {
    const iconName = layoutSelectedType === ArchiveLayoutType.grid ? ImagesName.listToggleIcon : ImagesName.gridToggleIcon
    return (
      <TouchableOpacity style={style.iconContainer} onPress={onPressChangeLayout}>
        <ToggleSVG iconName={iconName} />
      </TouchableOpacity>
    )
  }

  return (
    <ScreenContainer edge={horizontalAndTop} showHeader={true} headerTitle={headerTitle}
      headerLeft={headerLeftElement}>
      <PDFArchiveView style={style.container}
        onItemClick={(data: any) => onClickOpenPDF(data.nativeEvent.SelectedPDF)}
        selectedLayoutTypeInfo={layoutSelectedType.toString()}
      />
    </ScreenContainer>
  );
};

const style = StyleSheet.create({
  iconContainer: {
    position: 'absolute', right: 0.04 * screenWidth
  },
  container: {
    flex: 1 
  }
})
