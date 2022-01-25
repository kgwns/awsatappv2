import { WidgetHeaderProps } from "../components/atoms/widgetHeader/WidgetHeader";
import { LabelTypeProp } from "../components/atoms";
import { ImagesName, Styles } from "../shared/styles";
import { ShortArticleProps, TextWithFlagProps } from "./types";
import { AuthorItemProps } from "../components/molecules/AuthorItem";

export const sampleTextWithFlag: TextWithFlagProps = {
  title: ' يدمّر مسيّرتين بالأجواء اليمنية أُطلقت نحو المملكة',
  titleColor: Styles.color.davyGrey,
  barColor: Styles.color.greenishBlue,
  flag: 'آخر الأخبار',
  flagColor: Styles.color.darkSlateGray,
  labelType: LabelTypeProp.p5
}

export const shortArticleData: ShortArticleProps[] = [
  {
    image: 'https://picsum.photos/200/300',
    title: `لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار `,
    labelType: LabelTypeProp.h3
  },
  {
    image: 'https://picsum.photos/200/300',
    title: `لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار `,
    labelType: LabelTypeProp.h3
  },
  {
    image: 'https://picsum.photos/200/300',
    title: `لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار `,
    labelType: LabelTypeProp.h3
  },
  {
    image: 'https://picsum.photos/200/300',
    title: `لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار `,
    labelType: LabelTypeProp.h3
  }
]

export const shortArticleWithTagData: ShortArticleProps[] = [
  {
    image: 'https://picsum.photos/200/300',
    title: 'ميقاتي: استقالة قرداحي كانت ضرورية',
    titleColor: Styles.color.black,
    flag: 'استنكار',
    flagColor: Styles.color.greenishBlue,
    barColor: Styles.color.greenishBlue,
    labelType: LabelTypeProp.h3
  },
  {
    image: 'https://picsum.photos/200/300',
    title: 'مواشنطن تعيد فتح ملف خاطفي الرهائن الأميركيين في بيروت',
    titleColor: Styles.color.black,
    flag: 'استنكار',
    flagColor: Styles.color.greenishBlue,
    barColor: Styles.color.greenishBlue,
    labelType: LabelTypeProp.h3
  },
  {
    image: 'https://picsum.photos/200/300',
    title: 'واشنطن تعيد فتح ملف خاطفي الرهائن الأميركيين في بيروت',
    titleColor: Styles.color.black,
    flag: 'استنكار',
    flagColor: Styles.color.greenishBlue,
    barColor: Styles.color.greenishBlue,
    labelType: LabelTypeProp.h3
  }
]

export const authorHeaderData: WidgetHeaderProps = {
  headerLeft: {
    title: 'آراء وكتّاب ',
    color: Styles.color.greenishBlue,
    labelType: LabelTypeProp.h2
  },
  headerRight: {
    title: 'المزيد',
    icon: ImagesName.arrowLeftFaced,
    color: Styles.color.smokeyGrey,
    labelType: LabelTypeProp.h3,
    clickable: true
  }
}

export const authorWidgetData: AuthorItemProps[] = [
  {
    author: 'عادل درويش',
    description: 'الصحافة بين الخصوصية والصالح العام',
    duration: '3:22',
    image: 'https://picsum.photos/200/300'
  },
  {
    author: 'عادل درويش',
    description: 'الصحافة بين الخصوصية والصالح العام',
    duration: '3:22',
    image: 'https://picsum.photos/200/300'
  },
  {
    author: 'عادل درويش',
    description: 'الصحافة بين الخصوصية والصالح العام',
    duration: '3:22',
    image: 'https://picsum.photos/200/300'
  },
  {
    author: 'عادل درويش',
    description: 'الصحافة بين الخصوصية والصالح العام',
    duration: '3:22',
    image: 'https://picsum.photos/200/300'
  },
]