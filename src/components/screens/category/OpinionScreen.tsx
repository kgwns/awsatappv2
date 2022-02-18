import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  OpinionWritersArticlesSection,
  OpinionWritersSection,
} from 'src/components/organisms';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {useOpinionWriter} from 'src/hooks/useOpinionWriter';
import {useOpinions} from 'src/hooks/useOpinions';
import {WritersBodyGet} from 'src/redux/writers/types';
import {OpinionsBodyGet} from 'src/redux/opinions/types';

export const OpinionScreen = () => {
  const [page, setPage] = useState(0);
  const writersPayload: WritersBodyGet = {
    items_per_page: 10,
  };

  const opinionsPayload: OpinionsBodyGet = {
    page: page,
  };

  const gotoNextPage = () => {
    setPage(page + 1);
  };

  const style = useThemeAwareObject(customStyle);

  const {opinionWriterData, fetchOpinionWriterRequest} = useOpinionWriter();
  const {opinionsData, isLoading, fetchOpinionsRequest} = useOpinions();

  useEffect(() => {
    fetchOpinionWriterRequest(writersPayload);
    fetchOpinionsRequest(opinionsPayload);
  }, [page]);

  const renderItem = () => (
    <View>
      <OpinionWritersSection data={opinionWriterData} />
      <OpinionWritersArticlesSection
        data={opinionsData}
        onScroll={() => gotoNextPage()}
        isLoading={isLoading}
      />
    </View>
  );

  return (
    <View style={style.container}>
      <FlatList
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const OpinionScreenStyle = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
    },
  });
  return OpinionScreenStyle;
};
