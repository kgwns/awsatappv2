import { WidgetHeaderProps } from "src/components/atoms/widgetHeader/WidgetHeader";
import { LabelTypeProp,TextWithFlagProps } from "src/components/atoms";
import { ImagesName, Styles } from "src/shared/styles";
import { AuthorItemProps,articleFooterProps, TabBarDataProps } from "src/components/molecules";
import { Theme } from "src/redux/appCommon/types";
import configureStore from 'redux-mock-store';
import { articleProps, ShortArticleProps } from "src/components/organisms"
import { normalize } from "src/shared/utils"

const mockStore = configureStore();
export const storeSampleData = mockStore({
  appCommon: {
    theme: Theme.LIGHT
  },
  home: {
    isLoading: false,
    homeData: null,
    error: ''
  }
})

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

export const articleFooterSample: articleFooterProps = {
  leftTitle: 'وتمجيد',
  leftTitleColor: Styles.color.greenishBlue,
  rightTitle: 'يتحمل',
  rightIcon: ImagesName.clock,
  rightTitleColor: Styles.color.silverChalice,
}

export const articleSectionData: articleProps[] = [
  {
      image: 'https://picsum.photos/200/300',
      title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
      description: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
      tagName: 'مجما'
  },
  {
      image: 'https://picsum.photos/200/300',
      title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
      description: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
      tagName: 'الحكومة'
  }
]

const mostReadItem = {
  image: 'https://picsum.photos/200/300',
  title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
  description: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
  flag: 'استنكار',
  flagColor: Styles.color.greenishBlue,
  barColor: Styles.color.greenishBlue,
  labelType: LabelTypeProp.h3,
  tagStyle: {marginLeft: normalize(16)},
  tagLabelType: LabelTypeProp.p3,
  showDivider: false
}

export const mostReadData: articleProps[] = [
  {
    tagName: '1',
    ...mostReadItem
  },
  {
    tagName: '2',
    ...mostReadItem
  },
  {
    tagName: '3',
    ...mostReadItem
  },
  {
    tagName: '4',
    ...mostReadItem
  },
  {
    tagName: '5',
    ...mostReadItem
  },
  {
    tagName: '6',
    ...mostReadItem
  },
  {
    tagName: '7',
    ...mostReadItem
  },
  {
    tagName: '8',
    ...mostReadItem
  },
  {
    tagName: '9',
    ...mostReadItem
  },
  {
    tagName: '10',
    ...mostReadItem
  }
]

export const sectionTabItem: TabBarDataProps[]  = [
  {
    tabName: 'العالم العربي',
    isSelected: true
  },
  {
    tabName: 'الرأي',
    isSelected: false
  },
  {
    tabName: 'بودكاست',
    isSelected: false
  },
  {
    tabName: 'أولى',
    isSelected: false
  },
  {
    tabName: 'فيديو',
    isSelected: false
  },
  {
    tabName: 'يوميات الشرق',
    isSelected: false
  },
  {
    tabName: 'العالم العربي',
    isSelected: false
  },
  {
    tabName: 'العالم العربي',
    isSelected: false
  },
  {
    tabName: 'العالم العربي',
    isSelected: false
  }
]