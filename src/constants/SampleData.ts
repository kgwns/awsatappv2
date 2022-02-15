import {WidgetHeaderProps} from 'src/components/atoms/widgetHeader/WidgetHeader';
import {LabelTypeProp, TextWithFlagProps} from 'src/components/atoms';
import {ImagesName, Styles} from 'src/shared/styles';
import {
  AuthorItemProps,
  articleFooterProps,
  TabBarDataProps,
  VideoItemProps,
  PodcastVerticalListProps,
} from 'src/components/molecules';
import {Theme} from 'src/redux/appCommon/types';
import configureStore from 'redux-mock-store';
import {
  articleProps,
  ShortArticleProps,
  SearchResultsProps,
  StoryListItemProps,
  StoryListProps,
  PodcastProgramInfoProps,
} from 'src/components/organisms';
import {normalize} from 'src/shared/utils';
import {opinionWriterProps} from 'src/components/organisms/OpinionWritersSection';
import {opinionWriterArticleProps} from 'src/components/organisms/OpinionWritersArticlesSection';
import {podcastCardProps} from 'src/components/organisms/PodcastCardSection';
import {NewsWithImageItemProps} from 'src/components/molecules/podcast/NewsWithImageItem';
import {ArticleRectangleCardProps} from 'src/components/molecules/podcast/ArticleRectangleCard';
import { NewsFeedProps } from 'src/components/organisms/NewsFeed';

export const storeInfo = [
  {
  appCommon: {
    theme: Theme.LIGHT,
  },
  home: {
    isLoading: false,
    homeData: null,
    error: '',
  },
  latestNewsTab: {
    isLoading: true,
    error: '',
    ticker: [],
    hero: [],
    heroList: [],
    topList: [],
    sectionComboOne: [],
    sectionComboTwo: [],
    sectionComboThree: [],
    sectionComboFour: []
  },
  articleDetail: {
    isLoading: true,
    error: '',
    articleDetailData: [],
    pager: {}
  },
  search: {
    searchData: [],
    error: '',
    isLoading: false,
  },
  mostRead: {
    mostReadData: [],
    error: '',
    isLoading: false,
  }
}]

const mockStore = configureStore();
export const storeSampleData = mockStore({
  storeInfo
});

export const sampleTextWithFlag: TextWithFlagProps = {
  title: ' يدمّر مسيّرتين بالأجواء اليمنية أُطلقت نحو المملكة',
  titleColor: Styles.color.davyGrey,
  barColor: Styles.color.greenishBlue,
  flag: 'آخر الأخبار',
  flagColor: Styles.color.darkSlateGray,
  labelType: LabelTypeProp.p5,
};

export const shortArticleData: ShortArticleProps[] = [
  {
    image: 'https://picsum.photos/200/300',
    title: `لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار `,
    labelType: LabelTypeProp.h3,
    nid: '2982411',
    author: 'يتحمل'
  },
  {
    image: 'https://picsum.photos/200/300',
    title: `لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار `,
    labelType: LabelTypeProp.h3,
    nid: '2982411',
    author: 'يتحمل'
  },
  {
    image: 'https://picsum.photos/200/300',
    title: `لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار `,
    labelType: LabelTypeProp.h3,
    nid: '2982411',
    author: 'يتحمل'
  },
];

export const shortArticleWithTagProperties = {
  flagColor: Styles.color.greenishBlue,
  barColor: Styles.color.greenishBlue,
  labelType: LabelTypeProp.h3,
}

export const shortArticleWithTagData: ShortArticleProps[] = [
  {
    image: 'https://picsum.photos/200/300',
    title: 'ميقاتي: استقالة قرداحي كانت ضرورية',
    titleColor: Styles.color.black,
    flag: 'استنكار',
    flagColor: Styles.color.greenishBlue,
    barColor: Styles.color.greenishBlue,
    labelType: LabelTypeProp.h3,
  },
  {
    image: 'https://picsum.photos/200/300',
    title: 'مواشنطن تعيد فتح ملف خاطفي الرهائن الأميركيين في بيروت',
    titleColor: Styles.color.black,
    flag: 'استنكار',
    flagColor: Styles.color.greenishBlue,
    barColor: Styles.color.greenishBlue,
    labelType: LabelTypeProp.h3,
  },
  {
    image: 'https://picsum.photos/200/300',
    title: 'واشنطن تعيد فتح ملف خاطفي الرهائن الأميركيين في بيروت',
    titleColor: Styles.color.black,
    flag: 'استنكار',
    flagColor: Styles.color.greenishBlue,
    barColor: Styles.color.greenishBlue,
    labelType: LabelTypeProp.h3,
  },
  {
    image: 'https://picsum.photos/200/300',
    title: 'مواشنطن تعيد فتح ملف خاطفي الرهائن الأميركيين في بيروت',
    titleColor: Styles.color.black,
    flag: 'استنكار',
    flagColor: Styles.color.greenishBlue,
    barColor: Styles.color.greenishBlue,
    labelType: LabelTypeProp.h3,
  },
  {
    image: 'https://picsum.photos/200/300',
    title: 'واشنطن تعيد فتح ملف خاطفي الرهائن الأميركيين في بيروت',
    titleColor: Styles.color.black,
    flag: 'استنكار',
    flagColor: Styles.color.greenishBlue,
    barColor: Styles.color.greenishBlue,
    labelType: LabelTypeProp.h3,
  },
];

export const authorHeaderData: WidgetHeaderProps = {
  headerLeft: {
    title: 'آراء وكتّاب ',
    color: Styles.color.greenishBlue,
    labelType: LabelTypeProp.h2,
  },
  headerRight: {
    title: 'المزيد',
    icon: ImagesName.arrowLeftFaced,
    color: Styles.color.smokeyGrey,
    labelType: LabelTypeProp.h3,
    clickable: true,
  },
};

export const authorWidgetData: AuthorItemProps[] = [
  {
    author: 'عادل درويش',
    body: 'الصحافة بين الخصوصية والصالح العام',
    duration: '3:22',
    image: 'https://picsum.photos/200/300',
  },
  {
    author: 'عادل درويش',
    body: 'الصحافة بين الخصوصية والصالح العام',
    duration: '3:22',
    image: 'https://picsum.photos/200/300',
  },
  {
    author: 'عادل درويش',
    body: 'الصحافة بين الخصوصية والصالح العام',
    duration: '3:22',
    image: 'https://picsum.photos/200/300',
  },
  {
    author: 'عادل درويش',
    body: 'الصحافة بين الخصوصية والصالح العام',
    duration: '3:22',
    image: 'https://picsum.photos/200/300',
  },
];

export const articleFooterSample: articleFooterProps = {
  leftTitle: 'وتمجيد',
  leftTitleColor: Styles.color.greenishBlue,
  rightTitle: 'يتحمل',
  rightIcon: ImagesName.clock,
  rightTitleColor: Styles.color.silverChalice,
};

const mostReadItem = {
  image: 'https://picsum.photos/200/300',
  title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
  body: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
  flag: 'استنكار',
  flagColor: Styles.color.greenishBlue,
  barColor: Styles.color.greenishBlue,
  labelType: LabelTypeProp.h3,
  tagStyle: {marginLeft: normalize(16)},
  tagLabelType: LabelTypeProp.p3,
  showDivider: false,
};

export const mostReadData: articleProps[] = [
  {
    tagName: '1',
    ...mostReadItem,
  },
  {
    tagName: '2',
    ...mostReadItem,
  },
  {
    tagName: '3',
    ...mostReadItem,
  },
  {
    tagName: '4',
    ...mostReadItem,
  },
  {
    tagName: '5',
    ...mostReadItem,
  },
  {
    tagName: '6',
    ...mostReadItem,
  },
  {
    tagName: '7',
    ...mostReadItem,
  },
  {
    tagName: '8',
    ...mostReadItem,
  },
  {
    tagName: '9',
    ...mostReadItem,
  },
  {
    tagName: '10',
    ...mostReadItem,
  },
];

export const sectionTabItem: TabBarDataProps[] = [
  {
    tabName: 'العالم العربي',
    isSelected: true,
  },
  {
    tabName: 'الرأي',
    isSelected: false,
  },
  {
    tabName: 'بودكاست',
    isSelected: false,
  },
  {
    tabName: 'أولى',
    isSelected: false,
  },
  {
    tabName: 'فيديو',
    isSelected: false,
  },
  {
    tabName: 'يوميات الشرق',
    isSelected: false,
  },
  {
    tabName: 'العالم العربي',
    isSelected: false,
  },
  {
    tabName: 'العالم العربي',
    isSelected: false,
  },
  {
    tabName: 'العالم العربي',
    isSelected: false,
  },
];

export const searchResults: SearchResultsProps[] = [
  {
    id: '1',
    label: ' تضارب ایرانی بعد انفجار قرب موقع تطير النووي',
  },
  {
    id: '2',
    label: 'ه فيروس الاوميكرون',
  },
  {
    id: '3',
    label: 'اثر انبار مدينة نيوم',
  },
  {
    id: '4',
    label: 'السراع بين فلسطین و اسرائیل',
  },
  {
    id: '5',
    label: 'عنوان لأخر المواضيع بوضع هنا',
  },
  {
    id: '6',
    label: 'عنوان الآخر المواضيع يوضع هنا',
  },
  {
    id: '7',
    label: 'عنوان الاخر المواضيع بوضع هنا',
  },
  {
    id: '8',
    label: 'أخر اخبار مدينه بيوم',
  },
  {
    id: '9',
    label: 'السراع بين فلسطین و اسرائیل',
  },
  {
    id: '10',
    label: 'عنوان لآخر المواضيع بوضع هنا',
  },
  {
    id: '11',
    label: 'عنوان لاخر المواضيع بوضع هنا',
  },
];

export const opinionWritersData: opinionWriterProps[] = [
  {
    imageUrl: 'https://picsum.photos/200',
    label: 'إياد أبو شقرا',
  },
  {
    imageUrl: 'https://picsum.photos/200',
    label: 'فايز سارة',
  },
  {
    imageUrl: 'https://picsum.photos/200',
    label: 'إنعام كجه جي',
  },
  {
    imageUrl: 'https://picsum.photos/200',
    label: 'طارق الحميد',
  },
  {
    imageUrl: 'https://picsum.photos/200',
    label: 'عبدالله بن بجاد العتيبي',
  },
  {
    imageUrl: 'https://picsum.photos/200',
    label: 'إياد أبو شقرا',
  },
  {
    imageUrl: 'https://picsum.photos/200',
    label: 'فايز سارة',
  },
  {
    imageUrl: 'https://picsum.photos/200',
    label: 'إنعام كجه جي',
  },
  {
    imageUrl: 'https://picsum.photos/200',
    label: 'طارق الحميد',
  },
  {
    imageUrl: 'https://picsum.photos/200',
    label: 'عبدالله بن بجاد العتيبي',
  },
];

export const opinionWritersArticlesData: opinionWriterArticleProps[] = [
  {
    imageUrl: 'https://picsum.photos/200',
    writerTitle: 'إياد أبو شقرا',
    headLine: 'هل بدأ العد العكسي لنهاية حكم جونسون في بريطانيا؟',
    subHeadLine:
      'حتى الآن كانت معركة الرئاسة الفرنسية من دون مفاجآت تذكر: الرئيس الجالس هو الأقوى. مرشحة اليمين ماري لوبن، تشكل خطراً لكنه غير قاتل، وعلى يمينها إريك زمور',
    audioLabel: 'استمع الي المقالة ',
    duration: '3:22',
  },
  {
    imageUrl: 'https://picsum.photos/200',
    writerTitle: 'فايز سارة',
    headLine: 'ما ورثناه من تركة «الصديق الصدوق» للشعب السوري',
    subHeadLine:
      'تعود بداية العلاقات السورية - الروسية إلى عام 1944، الذي شهد إقامة علاقات دبلوماسية بين الاتحاد السوفياتي والجمهورية السورية - حسب مسميات تلك الأيام،',
    audioLabel: 'استمع الي المقالة ',
    duration: '3:22',
  },
  {
    imageUrl: 'https://picsum.photos/200',
    writerTitle: 'راجح الخوري',
    headLine: 'فيينا قطبة قطبة كسجادة عجمية؟!',
    subHeadLine:
      'حتى الآن كانت معركة الرئاسة الفرنسية من دون مفاجآت تذكر: الرئيس الجالس هو الأقوى. مرشحة اليمين ماري لوبن، تشكل خطراً لكنه غير قاتل، وعلى يمينها إريك زمور',
    audioLabel: 'استمع الي المقالة ',
    duration: '3:22',
  },
  {
    imageUrl: 'https://picsum.photos/200',
    writerTitle: 'إياد أبو شقرا',
    headLine: 'هل بدأ العد العكسي لنهاية حكم جونسون في بريطانيا؟',
    subHeadLine:
      'حتى الآن كانت معركة الرئاسة الفرنسية من دون مفاجآت تذكر: الرئيس الجالس هو الأقوى. مرشحة اليمين ماري لوبن، تشكل خطراً لكنه غير قاتل، وعلى يمينها إريك زمور',
    audioLabel: 'استمع الي المقالة ',
    duration: '3:22',
  },
  {
    imageUrl: 'https://picsum.photos/200',
    writerTitle: 'فايز سارة',
    headLine: 'ما ورثناه من تركة «الصديق الصدوق» للشعب السوري',
    subHeadLine:
      'تعود بداية العلاقات السورية - الروسية إلى عام 1944، الذي شهد إقامة علاقات دبلوماسية بين الاتحاد السوفياتي والجمهورية السورية - حسب مسميات تلك الأيام،',
    audioLabel: 'استمع الي المقالة ',
    duration: '3:22',
  },
  {
    imageUrl: 'https://picsum.photos/200',
    writerTitle: 'راجح الخوري',
    headLine: 'فيينا قطبة قطبة كسجادة عجمية؟!',
    subHeadLine:
      'حتى الآن كانت معركة الرئاسة الفرنسية من دون مفاجآت تذكر: الرئيس الجالس هو الأقوى. مرشحة اليمين ماري لوبن، تشكل خطراً لكنه غير قاتل، وعلى يمينها إريك زمور',
    audioLabel: 'استمع الي المقالة ',
    duration: '3:22',
  },
];

export const podcastCardSectionData: podcastCardProps[] = [
  {
    imageUrl: 'https://picsum.photos/300/200',
    podcastTitle: 'عنوان لبرنامج البودكاست',
    announcerName: 'مع اسم المذيع',
  },
  {
    imageUrl: 'https://picsum.photos/300/200',
    podcastTitle: 'عنوان لبرنامج البودكاست',
    announcerName: 'مع اسم المذيع',
  },
  {
    imageUrl: 'https://picsum.photos/300/200',
    podcastTitle: 'عنوان لبرنامج البودكاست',
    announcerName: 'مع اسم المذيع',
  },
  {
    imageUrl: 'https://picsum.photos/300/200',
    podcastTitle: 'عنوان لبرنامج البودكاست',
    announcerName: 'مع اسم المذيع',
  },
];

export const mostPlayedSectionData: ArticleRectangleCardProps[] = [
  {
    trendingNumber: 1,
    imageUrl: 'https://picsum.photos/200',
    title: 'عنوان لملخص آخر أخبار اليوم',
    footerRight: 'الخميس',
    footerLeft: '45 دقيقه',
  },
  {
    trendingNumber: 2,
    imageUrl: 'https://picsum.photos/200',
    title: 'عنوان لملخص آخر أخبار اليوم',
    footerRight: 'الخميس',
    footerLeft: '45 دقيقه',
  },
  {
    trendingNumber: 3,
    imageUrl: 'https://picsum.photos/200',
    title: 'عنوان لملخص آخر أخبار اليوم',
    footerRight: 'الخميس',
    footerLeft: '45 دقيقه',
  },
];

export const LatestNewsSummarySectionData: NewsWithImageItemProps[] = [
  {
    imageUrl: 'https://picsum.photos/300/200',
    title: 'ملخص آخر أخبار اليوم',
    description:
      'استعاد فريق الاتفاق نغمة انتصاراته وحقق فوزاً ثميناً خارج أرضه أمام نظيره فريق الحزم بثلاثة أهداف دون رد ضمن منافسات الجولة الثانية عشرة من الدوري السعودي للمحترفين. ',
    footerRightLabel: 'الخميس',
    footerLeftLabel: '45 دقيقه',
  },
  {
    imageUrl: 'https://picsum.photos/300/200',
    title: 'ملخص آخر أخبار الجمعة',
    description:
      'استعاد فريق الاتفاق نغمة انتصاراته وحقق فوزاً ثميناً خارج أرضه أمام نظيره فريق الحزم بثلاثة أهداف دون رد ضمن منافسات الجولة الثانية عشرة من الدوري السعودي للمحترفين. ',
    footerRightLabel: 'الخميس',
    footerLeftLabel: '45 دقيقه',
  },
  {
    imageUrl: 'https://picsum.photos/300/200',
    title: 'ملخص آخر أخبار اليوم',
    description:
      'استعاد فريق الاتفاق نغمة انتصاراته وحقق فوزاً ثميناً خارج أرضه أمام نظيره فريق الحزم بثلاثة أهداف دون رد ضمن منافسات الجولة الثانية عشرة من الدوري السعودي للمحترفين. ',
    footerRightLabel: 'الخميس',
    footerLeftLabel: '45 دقيقه',
  },
  {
    imageUrl: 'https://picsum.photos/300/200',
    title: 'ملخص آخر أخبار الجمعة',
    description:
      'استعاد فريق الاتفاق نغمة انتصاراته وحقق فوزاً ثميناً خارج أرضه أمام نظيره فريق الحزم بثلاثة أهداف دون رد ضمن منافسات الجولة الثانية عشرة من الدوري السعودي للمحترفين. ',
    footerRightLabel: 'الخميس',
    footerLeftLabel: '45 دقيقه',
  },
  {
    imageUrl: 'https://picsum.photos/300/200',
    title: 'ملخص آخر أخبار اليوم',
    description:
      'استعاد فريق الاتفاق نغمة انتصاراته وحقق فوزاً ثميناً خارج أرضه أمام نظيره فريق الحزم بثلاثة أهداف دون رد ضمن منافسات الجولة الثانية عشرة من الدوري السعودي للمحترفين. ',
    footerRightLabel: 'الخميس',
    footerLeftLabel: '45 دقيقه',
  },
  {
    imageUrl: 'https://picsum.photos/300/200',
    title: 'ملخص آخر أخبار الجمعة',
    description:
      'استعاد فريق الاتفاق نغمة انتصاراته وحقق فوزاً ثميناً خارج أرضه أمام نظيره فريق الحزم بثلاثة أهداف دون رد ضمن منافسات الجولة الثانية عشرة من الدوري السعودي للمحترفين. ',
    footerRightLabel: 'الخميس',
    footerLeftLabel: '45 دقيقه',
  },
];

export const EditorsPickSectionData: NewsWithImageItemProps[] = [
  {
    imageUrl: 'https://picsum.photos/300/200',
    highlightedTitle: 'إسم البودكاست',
    title: 'عنوان حلثه البودكاست',
    footerRightLabel: 'الخميس',
    footerLeftLabel: '45 دقيقه',
  },
  {
    imageUrl: 'https://picsum.photos/300/200',
    highlightedTitle: 'إسم البودكاست',
    title: 'عنوان حلثه البودكاست',
    footerRightLabel: 'الخميس',
    footerLeftLabel: '45 دقيقه',
  },
  {
    imageUrl: 'https://picsum.photos/300/200',
    highlightedTitle: 'إسم البودكاست',
    title: 'عنوان حلثه البودكاست',
    footerRightLabel: 'الخميس',
    footerLeftLabel: '45 دقيقه',
  },
  {
    imageUrl: 'https://picsum.photos/300/200',
    highlightedTitle: 'إسم البودكاست',
    title: 'عنوان حلثه البودكاست',
    footerRightLabel: 'الخميس',
    footerLeftLabel: '45 دقيقه',
  },
  {
    imageUrl: 'https://picsum.photos/300/200',
    highlightedTitle: 'إسم البودكاست',
    title: 'عنوان حلثه البودكاست',
    footerRightLabel: 'الخميس',
    footerLeftLabel: '45 دقيقه',
  },
  {
    imageUrl: 'https://picsum.photos/300/200',
    highlightedTitle: 'إسم البودكاست',
    title: 'عنوان حلثه البودكاست',
    footerRightLabel: 'الخميس',
    footerLeftLabel: '45 دقيقه',
  },
];

export const PodcastOpinionArticleSectionData: ArticleRectangleCardProps[] = [
  {
    imageUrl: 'https://picsum.photos/200',
    title: 'عنوان لملخص آخر أخبار اليوم',
    footerRight: 'الخميس',
    footerLeft: '45 دقيقه',
  },
  {
    imageUrl: 'https://picsum.photos/200',
    title: 'عنوان لملخص آخر أخبار اليوم',
    footerRight: 'الخميس',
    footerLeft: '45 دقيقه',
  },
  {
    imageUrl: 'https://picsum.photos/200',
    title: 'عنوان لملخص آخر أخبار اليوم',
    footerRight: 'الخميس',
    footerLeft: '45 دقيقه',
  },
];

export const storyWidgetItemData: StoryListItemProps[] = [
  {
    id: '1',
    imageUrl: "https://picsum.photos/500",
    title: "كوفيد-19",
    description:"دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى",
    buttonTitle: 'امرأ المقالة',
    thumbNail: "https://picsum.photos/100",
  },
  {
    id: '2',
    imageUrl: "https://picsum.photos/400",
    title: "رحلة إلى المريخ",
    description:"دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى",
    buttonTitle: 'امرأ المقالة',
    thumbNail: "https://picsum.photos/100",
  },
  {
    id: '3',
    imageUrl: "https://picsum.photos/600",
    title: "كوفيد-19",
    description:"دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى",
    buttonTitle: 'امرأ المقالة',
    thumbNail: "https://picsum.photos/100",
  },
]

export const storyWidgetData: StoryListProps[] = [
{
  id: '1',
  data :storyWidgetItemData,
},
{
  id: '2',
  data :[
    {
      id: '1',
      imageUrl: "https://picsum.photos/500",
      title: "رحلة إلى المريخ",
      description:"دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى",
      buttonTitle: 'امرأ المقالة',
      thumbNail: "https://picsum.photos/100",
    }
  ],
},
{
  id: '3',
  data :[
    {
      id: '1',
      imageUrl: "https://picsum.photos/500",
      title: "فضاء رأس مالي",
      description:"دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى",
      buttonTitle: 'امرأ المقالة',
      thumbNail: "https://picsum.photos/100",
    }
  ],
},
{
  id: '4',
  data :[
    {
      id: '1',
      imageUrl: "https://picsum.photos/500",
      title: "أمريكا 2020",
      description:"دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى",
      buttonTitle: 'امرأ المقالة',
      thumbNail: "https://picsum.photos/100",
    }
  ],
},
{
  id: '5',
  data :[
    {
      id: '1',
      imageUrl: "https://picsum.photos/500",
      title: "كوفيد-19",
      description:"دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى",
      buttonTitle: 'امرأ المقالة',
      thumbNail: "https://picsum.photos/100",
    }
  ],
},
{
  id: '6',
  data :[
    {
      id: '1',
      imageUrl: "https://picsum.photos/500",
      title: "رحلة إلى المريخ",
      description:"دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى",
      buttonTitle: 'امرأ المقالة',
      thumbNail: "https://picsum.photos/100",
    }
  ],
},
{
  id: '7',
  data :[
    {
      id: '1',
      imageUrl: "https://picsum.photos/500",
      title: "فضاء رأس مالي",
      description:"دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى",
      buttonTitle: 'امرأ المقالة',
      thumbNail: "https://picsum.photos/100",
    }
  ],
},
{
  id: '8',
  data :[
    {
      id: '1',
      imageUrl: "https://picsum.photos/500",
      title: "أمريكا 2020",
      description:"دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى",
      buttonTitle: 'امرأ المقالة',
      thumbNail: "https://picsum.photos/100",
    }
  ],
},
]
export const videoTabData: VideoItemProps[] = [
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    imageUrl: 'https://picsum.photos/300/200',
    videoLabel: 'أمريكا',
    time: '05:22',
    des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    month: 'ديسمبر',
    date: '7',
    views: '1374',
  },
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    imageUrl: 'https://picsum.photos/300/200',
    videoLabel: 'أمريكا',
    time: '05:22',
    des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    month: 'ديسمبر',
    date: '7',
    views: '1374',
  },
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    imageUrl: 'https://picsum.photos/300/200',
    videoLabel: 'أمريكا',
    time: '05:22',
    des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    month: 'ديسمبر',
    date: '7',
    views: '1374',
  },
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    imageUrl: 'https://picsum.photos/300/200',
    videoLabel: 'أمريكا',
    time: '05:22',
    des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    month: 'ديسمبر',
    date: '7',
    views: '1374',
  },
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    imageUrl: 'https://picsum.photos/300/200',
    videoLabel: 'أمريكا',
    time: '05:22',
    des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    month: 'ديسمبر',
    date: '7',
    views: '1374',
  },
];
export const newsFeedData: NewsFeedProps[] = [
  {
    title: ' بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات',
    imageUrl: 'https://picsum.photos/300/200',
    videoLabel: 'أمريكا',
    des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    month: 'ديسمبر',
    date: '7',
    titleColor: Styles.color.black,
    barColor: Styles.color.greenishBlue,
    labelType: LabelTypeProp.h2,
  },
  {
    title: ' بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات',
    imageUrl: 'https://picsum.photos/300/200',
    videoLabel: 'أمريكا',
    des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    month: 'ديسمبر',
    date: '7',
    titleColor: Styles.color.black,
    barColor: Styles.color.greenishBlue,
    labelType: LabelTypeProp.h2,
  },
  {
    title: ' بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات',
    imageUrl: 'https://picsum.photos/300/200',
    videoLabel: 'أمريكا',
    des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    month: 'ديسمبر',
    date: '7',
    titleColor: Styles.color.black,
    barColor: Styles.color.greenishBlue,
    labelType: LabelTypeProp.h2,
  },
  {
    title: ' بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات',
    imageUrl: 'https://picsum.photos/300/200',
    videoLabel: 'أمريكا',
    des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    month: 'ديسمبر',
    date: '7',
    titleColor: Styles.color.black,
    barColor: Styles.color.greenishBlue,
    labelType: LabelTypeProp.h2,
  },
];
export const articleSampleData =
  {
    image: 'https://picsum.photos/200/300',
    title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
    description: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
    tagName: 'الحكومة'
}

export const PodcastEpisodeData: PodcastVerticalListProps[] = [
  {
    imageUrl: 'https://picsum.photos/200',
    title: '65 : عنوان الحلقه يوضع هنا',
    description: 'استعاد فريق الاتفاق نقمة انتصاراته وحقق فوزا ثمينا خارج أرضه اسلام نظيره فريق الحرم بثلاثة أهداف دون رد ضمن منافسات',
    footerLeft: '45 دقيقه',
    footerRight: 'الخسيس',
  },
  {
    imageUrl: 'https://picsum.photos/200',
    title: '64 : عنوان الحلقه يوضع هنا',
    description: 'استعاد فريق الاتفاق نقمة انتصاراته وحقق فوزا ثمينا خارج أرضه اسلام نظيره فريق الحرم بثلاثة أهداف دون رد ضمن منافسات',
    footerLeft: '45 دقيقه',
    footerRight: 'الخسيس',
  },
  {
    imageUrl: 'https://picsum.photos/200',
    title: '66 : عنوان الحلقه يوضع هنا',
    description: 'استعاد فريق الاتفاق نقمة انتصاراته وحقق فوزا ثمينا خارج أرضه اسلام نظيره فريق الحرم بثلاثة أهداف دون رد ضمن منافسات',
    footerLeft: '45 دقيقه',
    footerRight: 'الخسيس'
  },
];

export const PodcastProgramInfoData: PodcastProgramInfoProps = {
  imageUrl: 'https://picsum.photos/200',
  title: 'عنوان لبرنامج البودكاست',
  announcer: 'مع اسم المذيع',
  description: 'أعلنت الشركة المسؤولة عن تأسيس شبكة تواصل اجتماعي مستقبلية للرئيس الأميركي السابق دونالد ترمب والشركة التي ستندمج معها للإدراج في البورصة، السبت.',
  data: PodcastEpisodeData as PodcastVerticalListProps[],
}
