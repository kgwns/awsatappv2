import { WidgetHeaderProps } from 'src/components/atoms/widgetHeader/WidgetHeader';
import { LabelTypeProp, TextWithFlagProps } from 'src/components/atoms';
import { ImagesName, Styles } from 'src/shared/styles';
import {
  AuthorItemProps,
  articleFooterProps,
  TabBarDataProps,
  VideoItemProps,
  PodcastVerticalListProps,
} from 'src/components/molecules';
import { Theme } from 'src/redux/appCommon/types';
import configureStore from 'redux-mock-store';
import {
  articleProps,
  ShortArticleProps,
  SearchResultsProps,
  StoryListItemProps,
  StoryListProps,
  PodcastProgramInfoProps,
} from 'src/components/organisms';
import { normalize } from 'src/shared/utils';
import { podcastCardProps } from 'src/components/organisms/PodcastCardSection';
import { NewsWithImageItemProps } from 'src/components/molecules/podcast/NewsWithImageItem';
import { ArticleRectangleCardProps } from 'src/components/molecules/podcast/ArticleRectangleCard';
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
      opinionList: [],
      sectionComboOne: [],
      sectionComboTwo: [],
      sectionComboThree: [],
      sectionComboFour: [],
    },
    articleDetail: {
      isLoading: true,
      error: '',
      articleDetailData: [],
      relatedArticleData: [],
      pager: {},
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
    },
    opinionWriter: {
      opinionWriterData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
      error: '',
      isLoading: false
    },
    opinionsReducer: {
      opinionData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
      error: '',
      isLoading: false,
    },
    sideMenu: {
      sideMenuData: [],
      error: '',
      isLoading: false,
    },
    sectionArticles: {
      sectionArticlesData: {
        rows: [],
        pager: { current_page: 0, items_per_page: '' }
      },
      error: '',
      isLoading: false
    },
    newsViewReducer: {
      heroListData: {
        rows: [],
        pager: { current_page: 0, items_per_page: '' }
      },
      topListData: {
        rows: [],
        pager: { current_page: 0, items_per_page: '' }
      },
      bottomListData: {
        rows: [],
        pager: { current_page: 0, items_per_page: '' }
      },
      error: '',
      isLoading: false,

    },
    allWriters: {
      allWritersData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
      error: '',
      isLoading: false,

    },
    allSiteCategories: {
      allSiteCategoriesData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
      error: '',
      isLoading: false,

    },
    termsAndAboutUs: {
      isLoading: true,
      data: [],
      error: ''
    }
  },
];

const mockStore = configureStore();
export const storeSampleData = mockStore({
  storeInfo,
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
};

const sortArticleWithTag = {
  image: 'https://picsum.photos/200/300',
  title: 'ميقاتي: استقالة قرداحي كانت ضرورية',
  titleColor: Styles.color.black,
  flag: 'استنكار',
  flagColor: Styles.color.greenishBlue,
  barColor: Styles.color.greenishBlue,
  labelType: LabelTypeProp.h3,
  nid: '2982216',
  author: 'من ساعاتان',
  created: '2021-05-20T23:04:52+0000'
}

export const shortArticleWithTagData: ShortArticleProps[] = Array(5).fill(sortArticleWithTag)

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
  tagStyle: { marginLeft: normalize(16) },
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

export const opinionWritersData: any = [
  {
    name: 'غسان الإمام',
    description__value_export: null,
    field_opinion_writer_path_export: null,
    view_taxonomy_term:
      'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92570',
    tid: '92570',
    vid_export: null,
    field_description_export: null,
    field_opinion_writer_path_export_1: null,
    field_opinion_writer_photo_export:
      'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2017/11/14/GhassanAlimam.jpg?itok=PjIkzard',
    parent_target_id_export: [],
  },
  {
    name: 'إياد أبو شقرا',
    description__value_export: null,
    field_opinion_writer_path_export: null,
    view_taxonomy_term:
      'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92571',
    tid: '92571',
    vid_export: null,
    field_description_export: null,
    field_opinion_writer_path_export_1: null,
    field_opinion_writer_photo_export:
      'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2019/03/03/EyadAbuShaqra.jpg?itok=knN3APSy',
    parent_target_id_export: [],
  },
  {
    name: 'عبد الرحمن الراشد',
    description__value_export: null,
    field_opinion_writer_path_export: null,
    view_taxonomy_term:
      'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92572',
    tid: '92572',
    vid_export: null,
    field_description_export: null,
    field_opinion_writer_path_export_1: null,
    field_opinion_writer_photo_export:
      'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2020/12/01/Abdulrahman-alrashid-01122020.png?itok=jHIC2vMz',
    parent_target_id_export: [],
  },
  {
    name: 'أونا هاثاواي وسكوت شابيرو',
    description__value_export: null,
    field_opinion_writer_path_export: null,
    view_taxonomy_term:
      'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92573',
    tid: '92573',
    vid_export: null,
    field_description_export: null,
    field_opinion_writer_path_export_1: null,
    field_opinion_writer_photo_export:
      'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/place-holder-sigalat_18_5.png?itok=Uym7-nDQ',
    parent_target_id_export: [],
  },
  {
    name: 'صالح القلاب',
    description__value_export: null,
    field_opinion_writer_path_export: null,
    view_taxonomy_term:
      'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92574',
    tid: '92574',
    vid_export: null,
    field_description_export: null,
    field_opinion_writer_path_export_1: null,
    field_opinion_writer_photo_export:
      'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/08/30/saleh_1.jpg?itok=PBtrVUNK',
    parent_target_id_export: [],
  },
  {
    name: 'زين العابدين الركابي',
    description__value_export: null,
    field_opinion_writer_path_export: null,
    view_taxonomy_term:
      'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92575',
    tid: '92575',
    vid_export: null,
    field_description_export: null,
    field_opinion_writer_path_export_1: null,
    field_opinion_writer_photo_export:
      'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/353-alrikabi_4.gif?itok=Fgo4PGoT',
    parent_target_id_export: [],
  },
  {
    name: 'ألبرتو تشيروتي',
    description__value_export: null,
    field_opinion_writer_path_export: null,
    view_taxonomy_term:
      'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92576',
    tid: '92576',
    vid_export: null,
    field_description_export: null,
    field_opinion_writer_path_export_1: null,
    field_opinion_writer_photo_export:
      'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/610-hiaghamedi_4.gif?itok=Lksu3ykZ',
    parent_target_id_export: [],
  },
  {
    name: 'صالح بن علي الحمادي',
    description__value_export: null,
    field_opinion_writer_path_export: null,
    view_taxonomy_term:
      'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92577',
    tid: '92577',
    vid_export: null,
    field_description_export: null,
    field_opinion_writer_path_export_1: null,
    field_opinion_writer_photo_export:
      'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/620-hamadi_3.gif?itok=vGLnP-m2',
    parent_target_id_export: [],
  },
  {
    name: 'موفق النويصر',
    description__value_export: null,
    field_opinion_writer_path_export: null,
    view_taxonomy_term:
      'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92578',
    tid: '92578',
    vid_export: null,
    field_description_export: null,
    field_opinion_writer_path_export_1: null,
    field_opinion_writer_photo_export:
      'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/604-Alnowaisir_3.gif?itok=sjyvDSa1',
    parent_target_id_export: [],
  },
  {
    name: 'محمد السلمي',
    description__value_export: null,
    field_opinion_writer_path_export: null,
    view_taxonomy_term:
      'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92579',
    tid: '92579',
    vid_export: null,
    field_description_export: null,
    field_opinion_writer_path_export_1: null,
    field_opinion_writer_photo_export:
      'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/mosilmi_2.jpg?itok=-oLBDYHu',
    parent_target_id_export: [],
  },
];

export const opinionWritersArticlesData: any = {
  rows: [
    {
      name: 'غسان الإمام',
      description__value_export: null,
      field_opinion_writer_path_export: null,
      view_taxonomy_term:
        'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92570',
      tid: '92570',
      vid_export: null,
      field_description_export: null,
      field_opinion_writer_path_export_1: null,
      field_opinion_writer_photo_export:
        'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2017/11/14/GhassanAlimam.jpg?itok=PjIkzard',
      parent_target_id_export: [],
    },
    {
      name: 'إياد أبو شقرا',
      description__value_export: null,
      field_opinion_writer_path_export: null,
      view_taxonomy_term:
        'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92571',
      tid: '92571',
      vid_export: null,
      field_description_export: null,
      field_opinion_writer_path_export_1: null,
      field_opinion_writer_photo_export:
        'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2019/03/03/EyadAbuShaqra.jpg?itok=knN3APSy',
      parent_target_id_export: [],
    },
    {
      name: 'عبد الرحمن الراشد',
      description__value_export: null,
      field_opinion_writer_path_export: null,
      view_taxonomy_term:
        'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92572',
      tid: '92572',
      vid_export: null,
      field_description_export: null,
      field_opinion_writer_path_export_1: null,
      field_opinion_writer_photo_export:
        'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2020/12/01/Abdulrahman-alrashid-01122020.png?itok=jHIC2vMz',
      parent_target_id_export: [],
    },
    {
      name: 'أونا هاثاواي وسكوت شابيرو',
      description__value_export: null,
      field_opinion_writer_path_export: null,
      view_taxonomy_term:
        'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92573',
      tid: '92573',
      vid_export: null,
      field_description_export: null,
      field_opinion_writer_path_export_1: null,
      field_opinion_writer_photo_export:
        'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/place-holder-sigalat_18_5.png?itok=Uym7-nDQ',
      parent_target_id_export: [],
    },
    {
      name: 'صالح القلاب',
      description__value_export: null,
      field_opinion_writer_path_export: null,
      view_taxonomy_term:
        'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92574',
      tid: '92574',
      vid_export: null,
      field_description_export: null,
      field_opinion_writer_path_export_1: null,
      field_opinion_writer_photo_export:
        'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/08/30/saleh_1.jpg?itok=PBtrVUNK',
      parent_target_id_export: [],
    },
    {
      name: 'زين العابدين الركابي',
      description__value_export: null,
      field_opinion_writer_path_export: null,
      view_taxonomy_term:
        'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92575',
      tid: '92575',
      vid_export: null,
      field_description_export: null,
      field_opinion_writer_path_export_1: null,
      field_opinion_writer_photo_export:
        'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/353-alrikabi_4.gif?itok=Fgo4PGoT',
      parent_target_id_export: [],
    },
    {
      name: 'ألبرتو تشيروتي',
      description__value_export: null,
      field_opinion_writer_path_export: null,
      view_taxonomy_term:
        'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92576',
      tid: '92576',
      vid_export: null,
      field_description_export: null,
      field_opinion_writer_path_export_1: null,
      field_opinion_writer_photo_export:
        'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/610-hiaghamedi_4.gif?itok=Lksu3ykZ',
      parent_target_id_export: [],
    },
    {
      name: 'صالح بن علي الحمادي',
      description__value_export: null,
      field_opinion_writer_path_export: null,
      view_taxonomy_term:
        'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92577',
      tid: '92577',
      vid_export: null,
      field_description_export: null,
      field_opinion_writer_path_export_1: null,
      field_opinion_writer_photo_export:
        'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/620-hamadi_3.gif?itok=vGLnP-m2',
      parent_target_id_export: [],
    },
    {
      name: 'موفق النويصر',
      description__value_export: null,
      field_opinion_writer_path_export: null,
      view_taxonomy_term:
        'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92578',
      tid: '92578',
      vid_export: null,
      field_description_export: null,
      field_opinion_writer_path_export_1: null,
      field_opinion_writer_photo_export:
        'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/604-Alnowaisir_3.gif?itok=sjyvDSa1',
      parent_target_id_export: [],
    },
    {
      name: 'محمد السلمي',
      description__value_export: null,
      field_opinion_writer_path_export: null,
      view_taxonomy_term:
        'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92579',
      tid: '92579',
      vid_export: null,
      field_description_export: null,
      field_opinion_writer_path_export_1: null,
      field_opinion_writer_photo_export:
        'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/mosilmi_2.jpg?itok=-oLBDYHu',
      parent_target_id_export: [],
    },
  ],
  pager: {
    current_page: 0,
    items_per_page: '10',
  },
};

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
    imageUrl: 'https://picsum.photos/500',
    title: 'كوفيد-19',
    description:
      'دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى',
    buttonTitle: 'امرأ المقالة',
    thumbNail: 'https://picsum.photos/100',
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/400',
    title: 'رحلة إلى المريخ',
    description:
      'دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى',
    buttonTitle: 'امرأ المقالة',
    thumbNail: 'https://picsum.photos/100',
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/600',
    title: 'كوفيد-19',
    description:
      'دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى',
    buttonTitle: 'امرأ المقالة',
    thumbNail: 'https://picsum.photos/100',
  },
];

export const storyWidgetData: StoryListProps[] = [
  {
    id: '1',
    data: storyWidgetItemData,
  },
  {
    id: '2',
    data: [
      {
        id: '1',
        imageUrl: 'https://picsum.photos/500',
        title: 'رحلة إلى المريخ',
        description:
          'دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى',
        buttonTitle: 'امرأ المقالة',
        thumbNail: 'https://picsum.photos/100',
      },
    ],
  },
  {
    id: '3',
    data: [
      {
        id: '1',
        imageUrl: 'https://picsum.photos/500',
        title: 'فضاء رأس مالي',
        description:
          'دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى',
        buttonTitle: 'امرأ المقالة',
        thumbNail: 'https://picsum.photos/100',
      },
    ],
  },
  {
    id: '4',
    data: [
      {
        id: '1',
        imageUrl: 'https://picsum.photos/500',
        title: 'أمريكا 2020',
        description:
          'دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى',
        buttonTitle: 'امرأ المقالة',
        thumbNail: 'https://picsum.photos/100',
      },
    ],
  },
  {
    id: '5',
    data: [
      {
        id: '1',
        imageUrl: 'https://picsum.photos/500',
        title: 'كوفيد-19',
        description:
          'دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى',
        buttonTitle: 'امرأ المقالة',
        thumbNail: 'https://picsum.photos/100',
      },
    ],
  },
  {
    id: '6',
    data: [
      {
        id: '1',
        imageUrl: 'https://picsum.photos/500',
        title: 'رحلة إلى المريخ',
        description:
          'دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى',
        buttonTitle: 'امرأ المقالة',
        thumbNail: 'https://picsum.photos/100',
      },
    ],
  },
  {
    id: '7',
    data: [
      {
        id: '1',
        imageUrl: 'https://picsum.photos/500',
        title: 'فضاء رأس مالي',
        description:
          'دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى',
        buttonTitle: 'امرأ المقالة',
        thumbNail: 'https://picsum.photos/100',
      },
    ],
  },
  {
    id: '8',
    data: [
      {
        id: '1',
        imageUrl: 'https://picsum.photos/500',
        title: 'أمريكا 2020',
        description:
          'دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى',
        buttonTitle: 'امرأ المقالة',
        thumbNail: 'https://picsum.photos/100',
      },
    ],
  },
];
export const videoTabData: VideoItemProps[] = [
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    imageUrl: 'https://picsum.photos/400',
    videoLabel: 'أمريكا',
    time: '05:22',
    des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    date: '7 ديسمبر ',
    views: '1374',
    shortDescription: 'عامة العصى وجلاها الله عماد الساند مان اوزن النوم ليس لها عنوانا بال ان له دور من الألم الناس الكل سايكي سند عام من المبادلات حول العلمي الدير',
  },
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    imageUrl: 'https://picsum.photos/400',
    videoLabel: 'أمريكا',
    time: '05:22',
    des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    date: '7 ديسمبر ',
    views: '1374',
    shortDescription: 'عامة العصى وجلاها الله عماد الساند مان اوزن النوم ليس لها عنوانا بال ان له دور من الألم الناس الكل سايكي سند عام من المبادلات حول العلمي الدير',
  },
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    imageUrl: 'https://picsum.photos/400',
    videoLabel: 'أمريكا',
    time: '05:22',
    des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    date: '7 ديسمبر ',
    views: '1374',
    shortDescription: 'عامة العصى وجلاها الله عماد الساند مان اوزن النوم ليس لها عنوانا بال ان له دور من الألم الناس الكل سايكي سند عام من المبادلات حول العلمي الدير',
  },
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    imageUrl: 'https://picsum.photos/400',
    videoLabel: 'أمريكا',
    time: '05:22',
    des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    date: '7 ديسمبر ',
    views: '1374',
    shortDescription: 'عامة العصى وجلاها الله عماد الساند مان اوزن النوم ليس لها عنوانا بال ان له دور من الألم الناس الكل سايكي سند عام من المبادلات حول العلمي الدير',
  },
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    imageUrl: 'https://picsum.photos/400',
    videoLabel: 'أمريكا',
    time: '05:22',
    des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    date: '7 ديسمبر ',
    views: '1374',
    shortDescription: 'عامة العصى وجلاها الله عماد الساند مان اوزن النوم ليس لها عنوانا بال ان له دور من الألم الناس الكل سايكي سند عام من المبادلات حول العلمي الدير',
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

export const PodcastEpisodeData: PodcastVerticalListProps[] = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/200',
    title: '65 : عنوان الحلقه يوضع هنا',
    description: 'استعاد فريق الاتفاق نقمة انتصاراته وحقق فوزا ثمينا خارج أرضه اسلام نظيره فريق الحرم بثلاثة أهداف دون رد ضمن منافسات',
    footerLeft: '45 دقيقه',
    footerRight: 'الخسيس',
    secondaryTitle: 'عنوان لبرنامج البودكاست',
    author: 'مع اسم المذبع',
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/200',
    title: '64 : عنوان الحلقه يوضع هنا',
    description: 'استعاد فريق الاتفاق نقمة انتصاراته وحقق فوزا ثمينا خارج أرضه اسلام نظيره فريق الحرم بثلاثة أهداف دون رد ضمن منافسات',
    footerLeft: '45 دقيقه',
    footerRight: 'الخسيس',
    secondaryTitle: 'عنوان لبرنامج البودكاست',
    author: 'مع اسم المذبع',
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/200',
    title: '66 : عنوان الحلقه يوضع هنا',
    description: 'استعاد فريق الاتفاق نقمة انتصاراته وحقق فوزا ثمينا خارج أرضه اسلام نظيره فريق الحرم بثلاثة أهداف دون رد ضمن منافسات',
    footerLeft: '45 دقيقه',
    footerRight: 'الخسيس',
    secondaryTitle: 'عنوان لبرنامج البودكاست',
    author: 'مع اسم المذبع',
  },
];

export const PodcastProgramInfoData: PodcastProgramInfoProps = {
  imageUrl: 'https://picsum.photos/200',
  title: 'عنوان لبرنامج البودكاست',
  announcer: 'مع اسم المذيع',
  description: 'أعلنت الشركة المسؤولة عن تأسيس شبكة تواصل اجتماعي مستقبلية للرئيس الأميركي السابق دونالد ترمب والشركة التي ستندمج معها للإدراج في البورصة، السبت.',
  data: PodcastEpisodeData as PodcastVerticalListProps[],
}
export const articleSampleData = {
  image: 'https://picsum.photos/200/300',
  title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
  body: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
  tagName: 'الحكومة',
};
export const videoArchiveData: VideoItemProps[] = [
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    imageUrl: 'https://picsum.photos/300/200',
    videoLabel: 'أمريكا',
    des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
  },
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    imageUrl: 'https://picsum.photos/300/200',
    videoLabel: 'أمريكا',
    time: '05:22',
    des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    date: '7 ديسمبر ',
    views: '1374',
    toWatchTitle: 'ديسمبر'
  },
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    imageUrl: 'https://picsum.photos/300/200',
    videoLabel: 'أمريكا',
    des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
  },
];