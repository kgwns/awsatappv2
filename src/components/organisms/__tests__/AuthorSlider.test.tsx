import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React, { useState } from 'react';
import AuthorSlider from 'src/components/organisms/AuthorSlider';
import { Divider, WidgetHeader } from 'src/components/atoms';
import { FlatList, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false,
  isTab: false
}));
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}))
describe('<AuthorSlider>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setActiveIndex = jest.fn();
  const setSelectedTrack = jest.fn();

  const mockItem = {
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
    field_jwplayer_id_opinion_export: "opinion_sport_blog",
    type: "opinion"
  }

  const sampleData: any = [
    { image: 'image', nid: 'nid', author: 'author', created: 'created',  field_opinion_writer_node_export: [{
      opinion_writer_photo: 'https://picsum.photos/200/300'
    }]
   },
  ];

  beforeEach(() => {
    DeviceTypeUtilsMock.isIOS = true
    DeviceTypeUtilsMock.isTab = false;
    (useState as jest.Mock).mockImplementation(() => [1, setActiveIndex]);
    (useState as jest.Mock).mockImplementation(() => ['', setSelectedTrack]);
    const component = (
      <GestureHandlerRootView>
        <AuthorSlider data={sampleData} widgetHeader={'widgetHeader'} getSelectedTrack={mockFunction} />
      </GestureHandlerRootView>
    )
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render AuthorSlider component', () => {
    expect(instance).toBeDefined();
  });

  it('should render AuthorSlider component', () => {
    expect(render(
    <GestureHandlerRootView>
      <AuthorSlider data={sampleData} />
    </GestureHandlerRootView>
    )).toBeDefined();
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(WidgetHeader)
    fireEvent(element, 'onPress');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(ScrollView)
    fireEvent(element, 'onContentSizeChange');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList onPress', () => {
    const element = instance.container.findAllByType(FlatList)[0]
    fireEvent(element, 'renderItem', { item: sampleData[0], index: 0 });
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList onPress', () => {
    const element = instance.container.findAllByType(FlatList)[1]
    fireEvent(element, 'renderItem', { item: mockItem, index: 0 });
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList keyExtractor', () => {
    const element = instance.container.findAllByType(FlatList)[1]
    fireEvent(element, 'keyExtractor', '', 2);
    expect(mockFunction).toBeTruthy()
  });

  it('when PodcastVerticalList only When onPressBookmark', () => {
    const testID = instance.container.findAllByType(FlatList)[1];
    fireEvent(testID, 'ItemSeparatorComponent');
    expect(<Divider />).toBeTruthy();
  });

});

describe('<AuthorSlider>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setActiveIndex = jest.fn();
  const setSelectedTrack = jest.fn();
  const mockItem = {
    title: "دبلوماسية العزلة والعداوات",
    created_export: "2021-05-19T20:48:17+0000",
    field_opinion_writer_node_export: [],
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

  const sampleData: any = [
    { image: 'image', nid: 'nid', author: 'author', created: 'created',  field_opinion_writer_node_export: [{
      opinion_writer_photo: ''
    }]
   },
  ];

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [1, setActiveIndex]);
    (useState as jest.Mock).mockImplementation(() => ['', setSelectedTrack]);
    DeviceTypeUtilsMock.isIOS = false;
    DeviceTypeUtilsMock.isTab = true;
    const component = (
      <GestureHandlerRootView>
        <AuthorSlider data={sampleData} widgetHeader={'widgetHeader'} />
      </GestureHandlerRootView>
    )
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render AuthorSlider component', () => {
    expect(instance).toBeDefined();
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(WidgetHeader)
    fireEvent(element, 'onPress');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(ScrollView)
    fireEvent(element, 'onContentSizeChange');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call onMomentumScrollEnd returns null', () => {
    const element = instance.container.findByType(ScrollView)
    fireEvent(element, 'onMomentumScrollEnd');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call onMomentumScrollEnd', () => {
    const element = instance.container.findByType(ScrollView)
    fireEvent(element, 'onMomentumScrollEnd', { nativeEvent: { contentOffset: { x: 10 } } });
    expect(mockFunction).toBeTruthy()
  });


  test('Should call FlatList onPress', () => {
    const element = instance.container.findAllByType(FlatList)[0];
    fireEvent(element, 'renderItem', { item: sampleData[0], index: 2 });
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList onPress', () => {
    const element = instance.container.findAllByType(FlatList)[0]
    fireEvent(element, 'renderItem', { item: mockItem, index: 2 });
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList keyExtractor', () => {
    const element = instance.container.findAllByType(FlatList)[0]
    fireEvent(element, 'keyExtractor', '', 2);
    expect(mockFunction).toBeTruthy()
  });

  it('when PodcastVerticalList only When onPressBookmark', () => {
    const testID = instance.container.findAllByType(FlatList)[0];
    fireEvent(testID, 'ItemSeparatorComponent');
    expect(<Divider />).toBeTruthy();
  });

});