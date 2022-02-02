import React from 'react';
import { View } from 'react-native'
import { MostReadList } from 'src/components/organisms';
import { ScreenContainer } from '..'
import { mostReadData } from 'src/constants/SampleData';
import { Label, LabelTypeProp } from 'src/components/atoms';
import { MOST_READ } from 'src/constants/SharedConstants';
import { Styles } from 'src/shared/styles';
import { normalize } from 'src/shared/utils';

export const MostReadScreen = () => {
  return (
    <ScreenContainer>
      <View style={{ paddingLeft: normalize(20), paddingVertical: normalize(5) }}>
        <Label children={MOST_READ} labelType={LabelTypeProp.h2} color={Styles.color.greenishBlue} />
      </View>
      <MostReadList data={mostReadData}/>
    </ScreenContainer>
  )
}