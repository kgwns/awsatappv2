import { View, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { ScreenContainer } from '..'
import { RelatedArticles, ShortArticle, ShortArticleProps } from 'src/components/organisms'
import { shortArticleWithTagData } from 'src/constants/SampleData'
import { ArticleDetailFooter } from 'src/components/molecules'
import { Divider, HeaderElementProps, LabelTypeProp, Label } from 'src/components/atoms'
import { Styles } from 'src/shared/styles'
import { normalize } from 'src/shared/utils'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { ArticleDetailWidget } from 'src/components/organisms';
import { ArticlePodCastWidget } from 'src/components/organisms';

const relatedShortArticleHeaderLeft: HeaderElementProps = {
  title: 'مقالات ذات صلة',
  labelType: LabelTypeProp.h2,
  color: Styles.color.greenishBlue
}
const data = 'ثمة تعابيرُ في التقارير الإعلامية تتحاشى التفسير العميق، مثل تقرير وكالة أنباء أمس عن مبادرة فرنسية – سعودية «لمعالجة الأزمة بين الرياض وبيروت».ظاهرياً هذا الكلام صحيح، وهو ما ورد في بيان صحافي بمناسبة لقاء ولي العهد السعودي الأمير محمد بن سلمان وضيفه الرئيس الفرنسي إيمانويل ماكرون.هذا هو ظاهر النصّ، لكن لدى النظر إلى ما بين سطور المباحثات، فإنني أزعم أنَّه لو كان قرار بيروت تأخذه بيروت… لما كانت هناك أزمة تستلزم المعالجة. ومن ناحية أخرى، ما كانت ثمة حاجة إلى دخول فرنسا على الخط بين دولتين عربيتين شقيقتين ربطت بين شعبيهما صلات الدم واللغة والثقافة لقرون خلت. وهذا الواقع عبّر عنه مباشرة وزير الخارجية السعودية الأمير فيصل بن فرحان منذ اليوم الأول عندما قال إن الأزمة «في لبنان وليست بين السعودية ولبنان».وبالفعل، الإشكالية الراهنة تكمن في أن قرار بيروت لا هو لبيروت ولا هو لمصلحة اللبنانيين، واستطراداً، ليس في مصلحة العرب. وهنا بيت القصيد.بطبيعة الحال، مسعى الرئيس الفرنسي في المملكة العربية السعودية وشقيقاتها الخليجيات مشكورٌ ومقدَّرٌ، إن كان لشيء فلغايات إنسانية تهدف إلى تخفيف معاناة ما تبقى من وطن محتل بسلاح أجنبي وقرار أجنبي، وهو ينهار اقتصادياً وثقافياً ومؤسساتياً وخدماتياً أمام أعين مواطنيه التوّاقين إلى اللحاق بإخوتهم في ديار الهجرة البعيدة.ولئن كانت أخطر المؤشرات وأوضحها على هذا الانهيار تتمثل في السقوط الحر لقيمة صرف الليرة اللبنانية أمام العملات الأجنبية -وعلى رأسها الدولار الأميركي - وأزمة الدواء والطبابة في عز جائحة «كوفيد - 19»، فإن تداعي هيبة القضاء، والشلل الحكومي، والانفلات الأمني قية '

export const ArticleDetailScreen = () => {
  const { themeData } = useTheme()
  shortArticleWithTagData.map((item: ShortArticleProps) => item.titleColor = themeData.primaryBlack)

  const articleLabel = () => (
    <Label style={articleDetailScreenStyle.labelStyle}
    labelType={LabelTypeProp.p3}
    children={data}
    color={themeData.primaryBlack} />
  )

  const renderItem = () => (
    <View>
      <ArticleDetailWidget />
      {articleLabel()}
      <ArticlePodCastWidget />
      {articleLabel()}
      <RelatedArticles />
      {articleLabel()}
      <ShortArticle data={shortArticleWithTagData} headerLeft={relatedShortArticleHeaderLeft} />
      <Divider style={{ height: normalize(80) }} />
    </View>
  )

  return (
    <ScreenContainer edge={['bottom']}>
      <FlatList
        style={{ flex: 1, height: '100%' }}
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ }) => renderItem()}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
      <ArticleDetailFooter />
    </ScreenContainer>
  )
}
const articleDetailScreenStyle = StyleSheet.create({
  labelStyle: {
    paddingHorizontal: normalize(30),
    paddingVertical: normalize(15),
  },
})