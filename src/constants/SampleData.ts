import {WidgetHeaderProps} from 'src/components/atoms/widgetHeader/WidgetHeader';
import {LabelTypeProp, TextWithFlagProps} from 'src/components/atoms';
import {ImagesName, Styles} from 'src/shared/styles';
import {
  AuthorItemProps,
  articleFooterProps,
  TabBarDataProps,
} from 'src/components/molecules';
import {Theme} from 'src/redux/appCommon/types';
import configureStore from 'redux-mock-store';
import {
  articleProps,
  ShortArticleProps,
  SearchResultsProps,
} from 'src/components/organisms';
import {normalize} from 'src/shared/utils';
import {opinionWriterProps} from 'src/components/organisms/OpinionWritersSection';
import {opinionWriterArticleProps} from 'src/components/organisms/OpinionWritersArticlesSection';
import {podcastCardProps} from 'src/components/organisms/PodcastCardSection';
import {NewsWithImageItemProps} from 'src/components/molecules/podcast/NewsWithImageItem';
import {ArticleRectangleCardProps} from 'src/components/molecules/podcast/ArticleRectangleCard';

const mockStore = configureStore();
export const storeSampleData = mockStore({
  appCommon: {
    theme: Theme.LIGHT,
  },
  home: {
    isLoading: false,
    homeData: null,
    error: '',
  },
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
  },
  {
    image: 'https://picsum.photos/200/300',
    title: `لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار `,
    labelType: LabelTypeProp.h3,
  },
  {
    image: 'https://picsum.photos/200/300',
    title: `لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار `,
    labelType: LabelTypeProp.h3,
  },
];

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
    description: 'الصحافة بين الخصوصية والصالح العام',
    duration: '3:22',
    image: 'https://picsum.photos/200/300',
  },
  {
    author: 'عادل درويش',
    description: 'الصحافة بين الخصوصية والصالح العام',
    duration: '3:22',
    image: 'https://picsum.photos/200/300',
  },
  {
    author: 'عادل درويش',
    description: 'الصحافة بين الخصوصية والصالح العام',
    duration: '3:22',
    image: 'https://picsum.photos/200/300',
  },
  {
    author: 'عادل درويش',
    description: 'الصحافة بين الخصوصية والصالح العام',
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

export const articleSectionData: articleProps[] = [
  {
    image: 'https://picsum.photos/200/300',
    title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
    description: `أعلنت الشركة المسؤولة عن تأسيس شبكة تواصل اجتماعي مستقبلية للرئيس الأميركي السابق دونالد ترمب والشركة التي ستندمج معها للإدراج في البورصة، السبت، أن مجموعة مؤسسات استثمارية تعهدت بالمساهمة في المشروع بمليار دولار`,
    tagName: 'مجما',
  },
  {
    image: 'https://picsum.photos/200/300',
    title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
    description: `أعلنت الشركة المسؤولة عن تأسيس شبكة تواصل اجتماعي مستقبلية للرئيس الأميركي السابق دونالد ترمب والشركة التي ستندمج معها للإدراج في البورصة، السبت، أن مجموعة مؤسسات استثمارية تعهدت بالمساهمة في المشروع بمليار دولار`,
    tagName: 'مجما',
  },
];

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
