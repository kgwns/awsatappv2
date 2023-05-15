import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { RelatedOpinionCard } from '..';
import {useNavigation} from '@react-navigation/native';
import { useAppPlayer } from 'src/hooks';
import React, {useState} from 'react';
import { fetchNarratedOpinionArticleApi } from 'src/services/narratedOpinionArticleService';
import { AxiosError } from 'axios';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));


jest.mock('src/services/narratedOpinionArticleService', () => ({
  fetchNarratedOpinionArticleApi: jest.fn()
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('src/hooks/useAppPlayer', () => ({useAppPlayer: jest.fn()}));

describe('<RelatedOpinionCard>', () => {
  let instance: RenderAPI;
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
    field_jwplayer_id_opinion_export: null,
    type: "opinion"
  }

  const mockFn = jest.fn();
  const navigation = {
    push: mockFn,
    navigate: mockFn,
  }

    const mediaData = jest.fn();
    const setTimeDuration = jest.fn()

    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useState as jest.Mock).mockImplementation(() => [{
      playlist: [
        {
          name: 'abc',
          id: '12'
        },
        {
          name: 'abc',
          id: '13'
        },
      ],
      title: 'abc'
    }, mediaData]);
    (useState as jest.Mock).mockImplementation(() => [null, setTimeDuration]);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
    useAppPlayerMock.mockReturnValue({
      showMiniPlayer: false,
      isPlaying: false,
      selectedTrack: {id: 1},
      showControls: false,
      setControlState: setControlStateMock,
      setShowMiniPlayer: setShowMiniPlayerMock,
      setPlay: setPlayMock,
      setPlayerTrack: setPlayerTrackMock,
    });
    const component = <RelatedOpinionCard item={mockItem} onPress={mockFn} mediaVisibility='yes' togglePlayback='yes' selectedTrack='yes' jwPlayerID='2' />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render the RelatedOpinionCard component', () => {
    expect(instance).toBeDefined();
  });

  it('When RelatedOpinionCardTO1 is pressed', () => {
    const testItemId = instance.getByTestId('RelatedOpinionCardTO1');
    fireEvent(testItemId, 'onPress');
    expect(mockFn).toHaveBeenCalled();
  });

  it('When RelatedOpinionCardTO2 is pressed', () => {
    const testItemId = instance.getByTestId('RelatedOpinionCardTO2');
    fireEvent(testItemId, 'onPress', {tid:'1'});
    expect(navigation.push).toBeTruthy();
  });

  it('When RelatedOpinionCardTO3 is pressed', () => {
      const testItemId = instance.getByTestId('RelatedOpinionCardTO3');
      fireEvent(testItemId, 'onPress', {tid:'1'});
      expect(navigation.push).toBeTruthy();
  });


  it('When RelatedOpinionCardTO3 is pressed', () => {
    const testItemId = instance.getByTestId('RelatedOpinionCardTO3');
    fireEvent(testItemId, 'onPress', '');
    expect(navigation.push).toBeTruthy();
});

  it('When RelatedOpinionCardTO3 is pressed', () => {
    const testItemId = instance.getByTestId('RelatedOpinionCardLabel1');
    fireEvent(testItemId, 'onPress', {tid:'1'});
    expect(navigation.push).toBeTruthy();
  });

  it('When RelatedOpinionCardTO3 is pressed', () => {
    const testItemId = instance.getByTestId('RelatedOpinionCardLabel1');
    fireEvent(testItemId, 'onPress', '');
    expect(navigation.push).toBeTruthy();
  });

  it("test fetchNarratedOpinionArticleApi return response", async () => {
    (fetchNarratedOpinionArticleApi as jest.Mock).mockReturnValue({playList:{duration:'duration'}});
    try{
        const res = await fetchNarratedOpinionArticleApi({jwPlayerID:'2'});
        expect(res).toEqual({playList:{duration:'duration'}});
    }
    catch(error) {
        const errormes = error as AxiosError;
        expect(errormes?.response?.data).toBeDefined();
    }
  })

  it("test fetchNarratedOpinionArticleApi throws error", async () => {
    (fetchNarratedOpinionArticleApi as jest.Mock).mockRejectedValue({response:{data:"error"}});
    try{
        await fetchNarratedOpinionArticleApi({jwPlayerID:'2'});
    }
    catch(error) {
        const errormes = error as AxiosError;
        expect(errormes?.response?.data).toBeDefined();
    }
  })

});

describe('<RelatedOpinionCard>', () => {
  let instance: RenderAPI;
  const mockItem = {
    title: "دبلوماسية العزلة والعداوات",
    created_export: "2021-05-19T20:48:17+0000",
    field_opinion_writer_node_export: {
        id: "94179",
        title: "  سام منسی",
        url: "http://srpcawsatdev.prod.acquia-sites.com/fa/taxonomy/term/94179",
        bundle: "writer",
        opinion_writer_photo: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/304x292/public/2019/02/18/sam-mensi-26112018.jpg?itok=AxvknBRJ",
        langcode: "Persian, Farsi",
        name: "  سام منسی"
    },
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

  const mockFn = jest.fn();
  const navigation = {
    push: mockFn,
    navigate: mockFn,
  }

    const mediaData = jest.fn();
    const setTimeDuration = jest.fn()

    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [{
      playlist: [
        {
          name: 'abc',
          id: '12'
        },
        {
          name: 'abc',
          id: '13'
        },
      ],
      title: 'abc'
    }, mediaData]);
    (useState as jest.Mock).mockImplementation(() => [null, setTimeDuration]);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
    useAppPlayerMock.mockReturnValue({
      showMiniPlayer: false,
      isPlaying: false,
      selectedTrack: {id: 1},
      showControls: false,
      setControlState: setControlStateMock,
      setShowMiniPlayer: setShowMiniPlayerMock,
      setPlay: setPlayMock,
      setPlayerTrack: setPlayerTrackMock,
    });
    const component = <RelatedOpinionCard item={mockItem} onPress={mockFn} mediaVisibility='yes' togglePlayback='yes' selectedTrack='yes' jwPlayerID='2' />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render the RelatedOpinionCard component', () => {
    expect(instance).toBeDefined();
  });

  it('When RelatedOpinionCardTO1 is pressed', () => {
    const testItemId = instance.getByTestId('RelatedOpinionCardTO1');
    fireEvent(testItemId, 'onPress');
    expect(mockFn).toHaveBeenCalled();
  });

  it('When RelatedOpinionCardTO2 is pressed', () => {
    const testItemId = instance.getByTestId('RelatedOpinionCardTO2');
    fireEvent(testItemId, 'onPress', {tid:'1'});
    expect(navigation.push).toBeTruthy();
  });

  it('When RelatedOpinionCardTO3 is pressed', () => {
      const testItemId = instance.getByTestId('RelatedOpinionCardTO3');
      fireEvent(testItemId, 'onPress', {tid:'1'});
      expect(navigation.push).toBeTruthy();
  });


  it('When RelatedOpinionCardTO3 is pressed', () => {
    const testItemId = instance.getByTestId('RelatedOpinionCardTO3');
    fireEvent(testItemId, 'onPress', '');
    expect(navigation.push).toBeTruthy();
});

  it('When RelatedOpinionCardTO3 is pressed', () => {
    const testItemId = instance.getByTestId('RelatedOpinionCardLabel1');
    fireEvent(testItemId, 'onPress', {tid:'1'});
    expect(navigation.push).toBeTruthy();
  });

  it('When RelatedOpinionCardTO3 is pressed', () => {
    const testItemId = instance.getByTestId('RelatedOpinionCardLabel1');
    fireEvent(testItemId, 'onPress', '');
    expect(navigation.push).toBeTruthy();
  });

});


describe('<RelatedOpinionCard>', () => {
  let instance: RenderAPI;
  const mockItem = {
    title: "دبلوماسية العزلة والعداوات",
    created_export: "2021-05-19T20:48:17+0000",
    field_opinion_writer_node_export: {},
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

  const mockFn = jest.fn();
  const navigation = {
    push: mockFn,
    navigate: mockFn,
  }

    const mediaData = jest.fn();
    const setTimeDuration = jest.fn()

    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [{
      playlist: [
        {
          name: 'abc',
          id: '12'
        },
        {
          name: 'abc',
          id: '13'
        },
      ],
      title: 'abc'
    }, mediaData]);
    (useState as jest.Mock).mockImplementation(() => [null, setTimeDuration]);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
    useAppPlayerMock.mockReturnValue({
      showMiniPlayer: false,
      isPlaying: false,
      selectedTrack: {id: 1},
      showControls: false,
      setControlState: setControlStateMock,
      setShowMiniPlayer: setShowMiniPlayerMock,
      setPlay: setPlayMock,
      setPlayerTrack: setPlayerTrackMock,
    });
    const component = <RelatedOpinionCard item={mockItem} onPress={mockFn} mediaVisibility='yes' togglePlayback='yes' selectedTrack='yes' jwPlayerID='2' />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render the RelatedOpinionCard component', () => {
    expect(instance).toBeDefined();
  });

  it('When RelatedOpinionCardTO1 is pressed', () => {
    const testItemId = instance.getByTestId('RelatedOpinionCardTO1');
    fireEvent(testItemId, 'onPress');
    expect(mockFn).toHaveBeenCalled();
  });

  it('When RelatedOpinionCardTO2 is pressed', () => {
    const testItemId = instance.getByTestId('RelatedOpinionCardTO2');
    fireEvent(testItemId, 'onPress', {tid:'1'});
    expect(navigation.push).toBeTruthy();
  });

  it('When RelatedOpinionCardTO3 is pressed', () => {
      const testItemId = instance.getByTestId('RelatedOpinionCardTO3');
      fireEvent(testItemId, 'onPress', {tid:'1'});
      expect(navigation.push).toBeTruthy();
  });


  it('When RelatedOpinionCardTO3 is pressed', () => {
    const testItemId = instance.getByTestId('RelatedOpinionCardTO3');
    fireEvent(testItemId, 'onPress', '');
    expect(navigation.push).toBeTruthy();
});

  it('When RelatedOpinionCardTO3 is pressed', () => {
    const testItemId = instance.getByTestId('RelatedOpinionCardLabel1');
    fireEvent(testItemId, 'onPress', {tid:'1'});
    expect(navigation.push).toBeTruthy();
  });

  it('When RelatedOpinionCardTO3 is pressed', () => {
    const testItemId = instance.getByTestId('RelatedOpinionCardLabel1');
    fireEvent(testItemId, 'onPress', '');
    expect(navigation.push).toBeTruthy();
  });

});

describe('<RelatedOpinionCard>', () => {
  let instance: RenderAPI;
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

  const mockFn = jest.fn();
  const navigation = {
    push: mockFn,
    navigate: mockFn,
  }

    const mediaData = jest.fn();
    const setTimeDuration = jest.fn()

    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [{
      playlist: [
        {
          name: 'abc',
          id: '12'
        },
        {
          name: 'abc',
          id: '13'
        },
      ],
      title: 'abc'
    }, mediaData]);
    (useState as jest.Mock).mockImplementation(() => [null, setTimeDuration]);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
    useAppPlayerMock.mockReturnValue({
      showMiniPlayer: false,
      isPlaying: false,
      selectedTrack: {id: 1},
      showControls: false,
      setControlState: setControlStateMock,
      setShowMiniPlayer: setShowMiniPlayerMock,
      setPlay: setPlayMock,
      setPlayerTrack: setPlayerTrackMock,
    });
    const component = <RelatedOpinionCard item={mockItem} onPress={mockFn} mediaVisibility='yes' togglePlayback='yes' selectedTrack='yes' />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render the RelatedOpinionCard component', () => {
    expect(instance).toBeDefined();
  });

  it('When RelatedOpinionCardTO1 is pressed', () => {
    const testItemId = instance.getByTestId('RelatedOpinionCardTO1');
    fireEvent(testItemId, 'onPress');
    expect(mockFn).toHaveBeenCalled();
  });

  it('When RelatedOpinionCardTO2 is pressed', () => {
    const testItemId = instance.getByTestId('RelatedOpinionCardTO2');
    fireEvent(testItemId, 'onPress', {tid:'1'});
    expect(navigation.push).toBeTruthy();
  });

  it('When RelatedOpinionCardTO3 is pressed', () => {
      const testItemId = instance.getByTestId('RelatedOpinionCardTO3');
      fireEvent(testItemId, 'onPress', {tid:'1'});
      expect(navigation.push).toBeTruthy();
  });

  it('When RelatedOpinionCardTO3 is pressed', () => {
    const testItemId = instance.getByTestId('RelatedOpinionCardLabel1');
    fireEvent(testItemId, 'onPress', {tid:'1'});
    expect(navigation.push).toBeTruthy();
  });

});
