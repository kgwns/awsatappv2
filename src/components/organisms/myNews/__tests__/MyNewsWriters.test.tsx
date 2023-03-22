import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React, { useState, useMemo } from 'react';
import { MyNewsWriters } from 'src/components/organisms';
import { AuthorsHorizontalSlider } from 'src/components/molecules';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { keyExtractor } from '../MyNewsWriters';
import { OpinionsListItemType } from 'src/redux/opinionArticleDetail/types';
import { useAllWriters } from 'src/hooks';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn().mockImplementation(() => [false,() => null]),
  useMemo: jest.fn(),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: true,
  isIOS: false
}));

jest.mock('src/shared/styles/useThemeAware', () => {
  return {
    ...jest.requireActual('src/shared/styles/useThemeAware'),
    useThemeAwareObject: jest.fn(() => ({
      screenBackgroundColor: {
        backgroundColor: 'red'
      }
    }))
  }
})

const sampleOpinionsListItemTypeData: OpinionsListItemType[] = [
  {
    title: "دبلوماسية العزلة والعداوات",
    created_export: "2021-05-19T20:48:17+0000",
    field_opinion_writer_node_export: [
      {
        id: "94179",
        title: "  سام منسی",
        url: "http://srpcawsatdev.prod.acquia-sites.com/fa/taxonomy/term/94179",
        bundle: "writer",
        opinion_writer_photo: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/304x292/public/2019/02/18/sam-mensi-26112018.jpg?itok=AxvknBRJ",
        langcode: "Persian, Farsi",
        name: "  سام منسی"
      },
      {
        id: "93970",
        title: " Ilan Jonas",
        url: "http://srpcawsatdev.prod.acquia-sites.com/en/taxonomy/term/93970",
        bundle: "writer",
        opinion_writer_photo: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/304x292/public/2018/07/19/ar-180718419.jpg?itok=FGj8JPu0",
        langcode: "إنجليزية",
        name: " Ilan Jonas"
      }
    ],
    nid: "2982216",
    field_opinion_sport_blog_export: [
      {
        id: "83",
        title: "الرأي",
        bundle: "opinion_sport_blog",
        name: "الرأي"
      }
    ],
    field_new_issueno_export: "15514",
    published_at_export: "2021-05-19T20:48:17+0000",
    body: "<p>تنظم العلاقات بين الدول مجموعة اتفاقات ومعاهدات ومواثيق، خشية الوقوع في أزمات ناتجة عن سوء فهم أو سوء تصرف. وفي كل وزارة خارجية في العالم دائرة خاصة اسمها «دائرة التشريفات» أو «البروتوكول». مهمّة هذه الدائرة أن تطبق القواعد والأعراف القائمة؛ ابتداءً بطريقة الجلوس والاستقبال وأصغر التفاصيل... وإلا عمّت الفوضى، وحدثت الإهانات، وساءت العلاقات.<br />\nفي سياسته الخارجية يعطي لبنان الأهمية الأولى، من حيث المبدأ، لدول الاغتراب بصفته دولة هجرة. والهجرة أنواع: إلى أميركا الشمالية والجنوبية؛ ونادراً ما يعودون. وإلى أفريقيا؛ وغالباً ما يعودون. وإلى الخليج؛ ودائماً يعودون، فهو على بعد ساعتين من بيروت، وأهله أهل.<br />\nبين دول الخليج كانت السعودية مركز الهجرة اللبنانية الأكبر والأهم، منذ أيام الملك عبد العزيز، الذي عمل إلى جانبه رجال مثل الحاج حسين العويني (رئيس الوزراء) ونجيب صالحة وفؤاد حمزة. وفي السعودية فاقت ثروات بعض اللبنانيين الخيال، منذ سبعين عاماً إلى اليوم.<br />\nفقط بعد تصريحات شربل وهبة سمعنا في السعودية أصواتاً تطالب بطرد اللبنانيين. فوزير الخارجية هذا تجاوز كل القواعد والأصول والأعراف في حديث متوتر وعصابي عن دول الخليج. ومن المؤسف القول إن التوتر العصبي والصراخ والهبوب، سمة من سمات «التيار الوطني الحر» ورجاله، وخصوصاً نساءه.<br />\nلم يكن تصرف شربل وهبة في استوديو «الحرة» لائقاً، ولا كلامه، ولا الطريقة التي انسحب بها من الاستوديو غاضباً من مداخلة زميل سعودي.<br />\nولو كلف شربل وهبة نفسه أن يسأل دائرة التشريفات في وزارته لكان أُبلغ أن وزير الخارجية لا يذهب عادة إلى الاستوديو، بل تأتي الكاميرا إليه. وإذا ما حدث وذهب فليس من أجل تهديم الباقي من علاقات لبنان مع السعودية ودول الخليج. فهذه مهمة كانت مسندة حصراً إلى وزير الخارجية الأسبق جبران باسيل، الذي هو مؤسس الدبلوماسية اللبنانية الحديثة، وفتوحاتها ونجاحها الرهيب؛ في عزل لبنان عن إطاره الطبيعي، وعلاقاته التاريخية والتقليدية.<br />\nمسكين شربل وهبة، فهو ليس سوى «صوت سيده». في الحزب، وما قاله على «الحرة» ثقافة عُبّئ بها تعبئة مطلقة. هو، كما أشار، همه الدفاع عن رئيس الجمهورية، أما لبنانيو الخليج، وعلاقات لبنان التاريخية، وانعكاس ذلك على الداخل اللبناني، فلم يعد مهماً. الحقيقة لم يعد شيء مهماً في لبنان. ولا بقي منه (لبنان) الكثير. ولا همومه تستحق الذكر. جبران باسيل منهمك الآن في مهمة «تثبيت» الرئيس بشار الأسد... والتعبير الحرفي لمعاليه، مؤسس الدبلوماسية الحديثة.</p>\n",
    field_edit_letter_writer_export: null,
    field_jwplayer_id_opinion_export: null,
    type: "opinion"
  },
  {
    title: "دبلوماسية العزلة والعداوات",
    created_export: "2021-05-19T20:48:17+0000",
    field_opinion_writer_node_export: [
      {
        id: "94179",
        title: "  سام منسی",
        url: "http://srpcawsatdev.prod.acquia-sites.com/fa/taxonomy/term/94179",
        bundle: "writer",
        opinion_writer_photo: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/304x292/public/2019/02/18/sam-mensi-26112018.jpg?itok=AxvknBRJ",
        langcode: "Persian, Farsi",
        name: "  سام منسی"
      },
      {
        id: "93970",
        title: " Ilan Jonas",
        url: "http://srpcawsatdev.prod.acquia-sites.com/en/taxonomy/term/93970",
        bundle: "writer",
        opinion_writer_photo: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/304x292/public/2018/07/19/ar-180718419.jpg?itok=FGj8JPu0",
        langcode: "إنجليزية",
        name: " Ilan Jonas"
      }
    ],
    nid: "2982216",
    field_opinion_sport_blog_export: [
      {
        id: "83",
        title: "الرأي",
        bundle: "opinion_sport_blog",
        name: "الرأي"
      }
    ],
    field_new_issueno_export: "15514",
    published_at_export: "2021-05-19T20:48:17+0000",
    body: "<p>تنظم العلاقات بين الدول مجموعة اتفاقات ومعاهدات ومواثيق، خشية الوقوع في أزمات ناتجة عن سوء فهم أو سوء تصرف. وفي كل وزارة خارجية في العالم دائرة خاصة اسمها «دائرة التشريفات» أو «البروتوكول». مهمّة هذه الدائرة أن تطبق القواعد والأعراف القائمة؛ ابتداءً بطريقة الجلوس والاستقبال وأصغر التفاصيل... وإلا عمّت الفوضى، وحدثت الإهانات، وساءت العلاقات.<br />\nفي سياسته الخارجية يعطي لبنان الأهمية الأولى، من حيث المبدأ، لدول الاغتراب بصفته دولة هجرة. والهجرة أنواع: إلى أميركا الشمالية والجنوبية؛ ونادراً ما يعودون. وإلى أفريقيا؛ وغالباً ما يعودون. وإلى الخليج؛ ودائماً يعودون، فهو على بعد ساعتين من بيروت، وأهله أهل.<br />\nبين دول الخليج كانت السعودية مركز الهجرة اللبنانية الأكبر والأهم، منذ أيام الملك عبد العزيز، الذي عمل إلى جانبه رجال مثل الحاج حسين العويني (رئيس الوزراء) ونجيب صالحة وفؤاد حمزة. وفي السعودية فاقت ثروات بعض اللبنانيين الخيال، منذ سبعين عاماً إلى اليوم.<br />\nفقط بعد تصريحات شربل وهبة سمعنا في السعودية أصواتاً تطالب بطرد اللبنانيين. فوزير الخارجية هذا تجاوز كل القواعد والأصول والأعراف في حديث متوتر وعصابي عن دول الخليج. ومن المؤسف القول إن التوتر العصبي والصراخ والهبوب، سمة من سمات «التيار الوطني الحر» ورجاله، وخصوصاً نساءه.<br />\nلم يكن تصرف شربل وهبة في استوديو «الحرة» لائقاً، ولا كلامه، ولا الطريقة التي انسحب بها من الاستوديو غاضباً من مداخلة زميل سعودي.<br />\nولو كلف شربل وهبة نفسه أن يسأل دائرة التشريفات في وزارته لكان أُبلغ أن وزير الخارجية لا يذهب عادة إلى الاستوديو، بل تأتي الكاميرا إليه. وإذا ما حدث وذهب فليس من أجل تهديم الباقي من علاقات لبنان مع السعودية ودول الخليج. فهذه مهمة كانت مسندة حصراً إلى وزير الخارجية الأسبق جبران باسيل، الذي هو مؤسس الدبلوماسية اللبنانية الحديثة، وفتوحاتها ونجاحها الرهيب؛ في عزل لبنان عن إطاره الطبيعي، وعلاقاته التاريخية والتقليدية.<br />\nمسكين شربل وهبة، فهو ليس سوى «صوت سيده». في الحزب، وما قاله على «الحرة» ثقافة عُبّئ بها تعبئة مطلقة. هو، كما أشار، همه الدفاع عن رئيس الجمهورية، أما لبنانيو الخليج، وعلاقات لبنان التاريخية، وانعكاس ذلك على الداخل اللبناني، فلم يعد مهماً. الحقيقة لم يعد شيء مهماً في لبنان. ولا بقي منه (لبنان) الكثير. ولا همومه تستحق الذكر. جبران باسيل منهمك الآن في مهمة «تثبيت» الرئيس بشار الأسد... والتعبير الحرفي لمعاليه، مؤسس الدبلوماسية الحديثة.</p>\n",
    field_edit_letter_writer_export: null,
    field_jwplayer_id_opinion_export: null,
    type: "opinion"
  }
]

jest.mock('src/hooks/useContentForYou', () => ({
  useContentForYou: () => {
    return {
      isLoading: false,
      favouriteOpinionsData: sampleOpinionsListItemTypeData,
      error: 'error',
      fetchFavouriteOpinionsRequest: () => {
        return [];
      },
      isArticleLoading: false,
      articleError: 'error',
      fetchFavouriteArticlesRequest: () => {
        return [];
      },
      emptyAllData: () => {
        return;
      },
    };
  },
}));

jest.mock('src/hooks/useAllWriters', () => ({
  useAllWriters: jest.fn()
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useIsFocused: jest.fn()
}));


const sampleData = [
  {
    nid: '1',
    title: 'example',
    body: 'abc',
    field_image: 'abc',
    jwplayer: 'abc',
    field_jwplayer_id_opinion_export: [
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      },
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      }
    ],
    field_opinion_writer_node_export: [
      {
        id: 'example',
        opinion_writer_photo: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      },
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      }
    ],
    field_publication_date_export: '2021-05-20T20:05:45+0000',
    created_export: '2021-05-20T20:05:45+0000',
    author_resource: 'author',
    type: 'type',
    field_new_photo: 'abc'
  },
];

describe('<MyNewsWriters>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setSelectedAuthors = mockFunction;
  const setPageCount = mockFunction;
  const setOpinionData = mockFunction;
  const setSelectedIndex = mockFunction;
  const setShowEmpty = mockFunction;
  const useAllWritersMock = mockFunction;
  const mockData = [
    {
      field_opinion_writer_photo_export: 'https://picsum.photos/200/300',
      name: 'الحكومة',
    },
  ];

  const navigation = {
    goBack: mockFunction,
    navigate: mockFunction,
  };

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true;
    (useIsFocused as jest.Mock).mockReturnValue(true);
    (useState as jest.Mock).mockImplementation(() => [
      null,
      setSelectedAuthors,
    ]);
    (useState as jest.Mock).mockImplementation(() => [0, setPageCount]);
    (useState as jest.Mock).mockImplementation(() => [[], setOpinionData]);
    (useState as jest.Mock).mockImplementation(() => [-1, setSelectedIndex]);
    (useState as jest.Mock).mockImplementation(() => [true, setShowEmpty]);
    (useMemo as jest.Mock).mockReturnValue(mockData);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useAllWriters as jest.Mock).mockImplementation(useAllWritersMock);
    useAllWritersMock.mockReturnValue({
      isLoading: true,
      selectedAuthorsData: {
        code: 2,
        message: 'string',
        data: [{
          tid: '12'
        }],
      },
      allWritersData: [
        {
          name: 'example',
          description__value_export: {},
          field_opinion_writer_path_export: {},
          view_taxonomy_term: 'example',
          tid: '1',
          vid_export: {},
          field_description_export: {},
          field_opinion_writer_path_export_1: {},
          field_opinion_writer_photo_export: 'example',
          isSelected: true,
        },
        {
          name: 'example',
          description__value_export: {},
          field_opinion_writer_path_export: {},
          view_taxonomy_term: 'example',
          tid: '2',
          vid_export: {},
          field_description_export: {},
          field_opinion_writer_path_export_1: {},
          field_opinion_writer_photo_export: 'example',
          isSelected: true,
        },
      ],
      error: 'error',
      getSelectedAuthorsData: () => {
        return [];
      },
      fetchAllWritersRequest: () => {
        return [];
      },
      emptySelectedAuthorsData: () => {
        return []
      },
      requestAllSelectedWritersDetailsData: () => {
        return []
      }
  })
    const component = <MyNewsWriters />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render component', () => {
    expect(instance).toBeDefined();
  });

  it('should render component', () => {
    expect(keyExtractor('', 2)).toBeTruthy()
  });

  test('Should call AuthorsHorizontalSlider onPress', () => {
    const element = instance.container.findByType(
      AuthorsHorizontalSlider as any,
    );
    fireEvent(element, 'onPress', {item:mockData,index:0});
    expect(setPageCount).toBeCalled();
  });
  test('Should call AuthorsHorizontalSlider onPress', () => {
    const element = instance.container.findByType(
      AuthorsHorizontalSlider as any,
    );
    fireEvent(element, 'onPress', mockData,-1);
    expect(setPageCount).toBeCalled();
  });
});

describe('<MyNewsWriters>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setSelectedAuthors = mockFunction;
  const setPageCount = mockFunction;
  const setOpinionData = mockFunction;
  const setSelectedIndex = mockFunction;
  const setShowEmpty = mockFunction;
  const useAllWritersMock = mockFunction;
  const mockData = [
    {
      field_opinion_writer_photo_export: 'https://picsum.photos/200/300',
      name: 'الحكومة',
    },
  ];

  const navigation = {
    goBack: mockFunction,
    navigate: mockFunction,
  };

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false;
    (useState as jest.Mock).mockImplementation(() => [
      null,
      setSelectedAuthors,
    ]);
    (useState as jest.Mock).mockImplementation(() => [0, setPageCount]);
    (useState as jest.Mock).mockImplementation(() => [sampleData, setOpinionData]);
    (useState as jest.Mock).mockImplementation(() => [-1, setSelectedIndex]);
    (useState as jest.Mock).mockImplementation(() => [false, setShowEmpty]);
    (useMemo as jest.Mock).mockReturnValue(mockData);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useAllWriters as jest.Mock).mockImplementation(useAllWritersMock);
    useAllWritersMock.mockReturnValue({
      isLoading: false,
      selectedAuthorsData: {
        code: 2,
        message: 'string',
        data: {
          tid: '12'
        },
      },
      allWritersData: [
        {
          name: 'example',
          description__value_export: {},
          field_opinion_writer_path_export: {},
          view_taxonomy_term: 'example',
          tid: '1',
          vid_export: {},
          field_description_export: {},
          field_opinion_writer_path_export_1: {},
          field_opinion_writer_photo_export: 'example',
          isSelected: true,
        },
        {
          name: 'example',
          description__value_export: {},
          field_opinion_writer_path_export: {},
          view_taxonomy_term: 'example',
          tid: '2',
          vid_export: {},
          field_description_export: {},
          field_opinion_writer_path_export_1: {},
          field_opinion_writer_photo_export: 'example',
          isSelected: true,
        },
      ],
      error: 'error',
      getSelectedAuthorsData: () => {
        return [];
      },
      fetchAllWritersRequest: () => {
        return [];
      },
      emptySelectedAuthorsData: () => {
        return []
      }
  })
    const component = <MyNewsWriters />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render component', () => {
    expect(instance).toBeDefined();
  });

  it('should render flatlist with opinion export data', () => {
    const renderData = {
      title: 'title1',
      field_opinion_writer_node_export: [{
        opinion_writer_photo: 'https://picsum.photos/200/300'
      }],
      field_jwplayer_id_opinion_export: '2348',
      jwplayer: 'jwplayer',
    }
    const element = instance.container.findByType(FlatList);
    fireEvent(element, 'renderItem', { item: renderData, index: 0 })
    expect(mockFunction).toHaveBeenCalled()
  })

  it('should render flatlist without opinion export data', () => {
    const renderData = {
      title: 'title1',
      field_opinion_writer_node_export: {
        opinion_writer_photo: 'https://picsum.photos/200/300'
      },
      field_jwplayer_id_opinion_export: null,
      jwplayer: 'jwplayer',
    }
    const element = instance.container.findByType(FlatList);
    fireEvent(element, 'renderItem', { item: renderData, index: 0 })
    expect(mockFunction).toHaveBeenCalled()
  })

  it('should render ListFooterComponent in flatlist', () => {
    const element = instance.container.findByType(FlatList);
    fireEvent(element, 'ListFooterComponent');
    expect(mockFunction).toHaveBeenCalled()
  })

  it('should render onEndReached in Flatlist', () => {
    const element = instance.container.findByType(FlatList);
    fireEvent(element, 'onEndReached');
    expect(mockFunction).toHaveBeenCalled()
  });

});

describe('<MyNewsWriters>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setSelectedAuthors = mockFunction;
  const setPageCount = mockFunction;
  const setOpinionData = mockFunction;
  const setSelectedIndex = mockFunction;
  const useAllWritersMock = mockFunction;
  const mockData = [
    {
      field_opinion_writer_photo_export: 'https://picsum.photos/200/300',
      name: 'الحكومة',
    },
  ];

  const navigation = {
    goBack: mockFunction,
    navigate: mockFunction,
  };

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true;
    (useState as jest.Mock).mockImplementation(() => [
      null,
      setSelectedAuthors,
    ]);
    (useState as jest.Mock).mockImplementation(() => [0, setPageCount]);
    (useState as jest.Mock).mockImplementation(() => [[], setOpinionData]);
    (useState as jest.Mock).mockImplementation(() => [3, setSelectedIndex]);
    (useMemo as jest.Mock).mockReturnValue(mockData);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useAllWriters as jest.Mock).mockImplementation(useAllWritersMock);
    useAllWritersMock.mockReturnValue({
      isLoading: true,
      selectedAuthorsData: {
        code: 2,
        message: 'string',
        data: [{
          tid: '12'
        }],
      },
      allWritersData: [
        {
          name: 'example',
          description__value_export: {},
          field_opinion_writer_path_export: {},
          view_taxonomy_term: 'example',
          tid: '1',
          vid_export: {},
          field_description_export: {},
          field_opinion_writer_path_export_1: {},
          field_opinion_writer_photo_export: 'example',
          isSelected: true,
        },
        {
          name: 'example',
          description__value_export: {},
          field_opinion_writer_path_export: {},
          view_taxonomy_term: 'example',
          tid: '2',
          vid_export: {},
          field_description_export: {},
          field_opinion_writer_path_export_1: {},
          field_opinion_writer_photo_export: 'example',
          isSelected: true,
        },
      ],
      error: 'error',
      getSelectedAuthorsData: () => {
        return [];
      },
      fetchAllWritersRequest: () => {
        return [];
      },
      emptySelectedAuthorsData: () => {
        return []
      },
      requestAllSelectedWritersDetailsData: () => {
        return []
      }
  })
    const component = <MyNewsWriters />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should call AuthorsHorizontalSlider onPress with sending index as 3', () => {
    const element = instance.container.findByType(
      AuthorsHorizontalSlider as any,
    );
    fireEvent(element, 'onPress', mockData,3);
    expect(setPageCount).toBeCalled();
  });
});

describe('<MyNewsWriters>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setSelectedAuthors = mockFunction;
  const setPageCount = mockFunction;
  const useAllWritersMock = mockFunction;
  const mockData = [
    {
      field_opinion_writer_photo_export: 'https://picsum.photos/200/300',
      name: 'الحكومة',
    },
  ];

  const navigation = {
    goBack: mockFunction,
    navigate: mockFunction,
  };

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true;
    (useState as jest.Mock).mockImplementation(() => [
      null,
      setSelectedAuthors,
    ]);
    (useIsFocused as jest.Mock).mockReturnValue(false);
    (useState as jest.Mock).mockImplementation(() => [0, setPageCount]);
    (useMemo as jest.Mock).mockReturnValue(mockData);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useAllWriters as jest.Mock).mockImplementation(useAllWritersMock);
    useAllWritersMock.mockReturnValue({
      isLoading: true,
      selectedAuthorsData: {
        code: 2,
        message: 'string',
        data: [{
          tid: '12'
        }],
      },
      allWritersData: [
        {
          name: 'example',
          description__value_export: {},
          field_opinion_writer_path_export: {},
          view_taxonomy_term: 'example',
          tid: '1',
          vid_export: {},
          field_description_export: {},
          field_opinion_writer_path_export_1: {},
          field_opinion_writer_photo_export: 'example',
          isSelected: true,
        },
        {
          name: 'example',
          description__value_export: {},
          field_opinion_writer_path_export: {},
          view_taxonomy_term: 'example',
          tid: '2',
          vid_export: {},
          field_description_export: {},
          field_opinion_writer_path_export_1: {},
          field_opinion_writer_photo_export: 'example',
          isSelected: true,
        },
      ],
      error: 'error',
      getSelectedAuthorsData: () => {
        return [];
      },
      fetchAllWritersRequest: () => {
        return [];
      },
      emptySelectedAuthorsData: () => {
        return []
      },
      requestAllSelectedWritersDetailsData: () => {
        return []
      }
  })
    const component = <MyNewsWriters />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render pageCount value as 0', () => {
    expect(instance).toBeDefined();
  });
});
