import React, { useState } from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/Constants';
import {OpinionArticleDetail} from '../OpinionArticleDetail';
import { OpinionArticleDetailItemType, OpinionsListItemType } from 'src/redux/opinionArticleDetail/types';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import { Animated, FlatList } from 'react-native';
import { OpinionArticleDetailFooter } from 'src/components/molecules';
import { OpinionArticleDetailWidget, RelatedOpinionArticlesWidget } from 'src/components/organisms';
import {useNavigation} from '@react-navigation/native';
import { WriterDetailDataType } from 'src/redux/writersDetail/types';
import { horizontalEdge } from 'src/shared/utils';
import { useLogin } from 'src/hooks';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));


jest.mock("src/hooks/useAppPlayer", () => ({
  useAppPlayer: () => {
    return {
      showMiniPlayer: true,
      selectedTrack: {
        id: 1,
        artwork: 'abc.com'
      },
    }
  },
}));

const opinionArticleDetailData: OpinionArticleDetailItemType[] = [
  {
    title: 'باريس المتفائلة... الخرطوم المتشائمة!',
    bundle: 'opinion',
    body_export: '<span class="app-body"><p>على مدى يومين هذا الأسبوع احتفت باريس بالسودان وثورته، من خلال المؤتمر الاقتصادي لدعم الانتقال الديمقراطي الذي خصص على مدى يوم كامل لبحث فرص الاستثمار ومسألة تسوية الديون، ثم من خلال فعالية عن الثورة السودانية لحشد الدعم السياسي على هامش القمة الفرنسية - الأفريقية لبحث تمويل اقتصادات دول القارة المتضررة من تداعيات جائحة «كورونا».<br />مقابل أجواء التفاؤل في باريس، والترحيب من عدة جهات سودانية بالنتائج، كان هناك البعض في الخرطوم يثير أجواء تشاؤمية مقللاً من أهمية ما تحقق، بل واعتباره فشلاً ذريعاً. فالسودان اليوم متنازع بين قوى عدة تشد في اتجاهات متباينة، من أنصار النظام السابق، إلى المراهنين على عودة العسكر، مروراً بأولئك الذين يضعون قدماً في السلطة ويلعبون في الوقت ذاته ورقة المعارضة. هذا لا يعني بالطبع أن هناك من ينتقد النتائج لأنه كان يأمل في نتائج أكثر مما رآه يتحقق، أو أنه يتخوف من تبخر الوعود مثلما حدث في مؤتمرات سابقة.<br />في تقديري أن السودان خرج بمواقف مهمة على صعيد الدعم السياسي، وفيما يتعلق بجهود تسوية ديونه المتراكمة، وهي النقطة الأهم. فالحقيقة التي لا جدال عليها أن الديون التي تراكمت في عهد النظام السابق وارتفعت من نحو 12 مليار دولار إلى 60 ملياراً نتيجة سياسة التوقف عن سداد المستحقات المترتبة عنها، كانت تشكل عقبة كبرى أمام استفادة السودان من الاستثمارات، وتمويل مشروعات مهمة للتنمية، وعودة اندماجه في الاقتصاد العالمي. هذه العقبة ذاتها لم يكن سهلاً البدء في معالجتها إلا بعد أن نجحت الحكومة الانتقالية في إزالة اسم السودان من القائمة الأميركية للدول الداعمة للإرهاب. فمن دون تلك الخطوة كانت عودة إدماج السودان في الاقتصاد العالمي ستكون مستحيلة تقريباً.<br />نجحت الحكومة الانتقالية منذ ذلك الحين في معالجة مشكلة متأخرات ديون البنك الدولي وبنك التنمية الأفريقي من خلال قروض تجسيرية من الولايات المتحدة وبريطانيا والسويد وآيرلندا، لكن الآمال الكبرى كانت معلقة بما يمكن أن يتحقق في مؤتمر باريس، وهو ما عبر عنه رئيس الوزراء عبد الله حمدوك بقوله إن اختيار العاصمة الفرنسية لم يكن مصادفة باعتبارها «تستضيف نادي باريس وهو أكبر دائنينا»، مشيراً إلى الوصول إلى توافق بشأن ديون صندوق النقد الدولي وإلى إمكانية إغلاق ملف الديون قبل نهاية العام الحالي.<br />تسوية متأخرات ديون السودان لصندوق النقد الدولي ستزيل عقبة أخيرة من الطريق للحصول على تخفيف أكبر لديونه والاستفادة من برنامج إعفاء البلدان الفقيرة المثقلة بالديون (هيبك). وقد أكد الرئيس الفرنسي إيمانويل ماكرون موافقة عدد من الدول الأعضاء في صندوق النقد الدولي على تسوية متأخرات السودان للصندوق، وأن فرنسا ستساعد في هذا الجهد بقرض تجسيري بمبلغ 1.5 مليار دولار تتم تغطيته من تعهدات قدمتها عدة دول خلال مؤتمر باريس.<br />تبقى بعد ذلك مسألة الديون الثنائية التي تشكل النسبة الأعلى من ديون السودان، إضافة إلى نحو ستة مليارات دولار من الديون التجارية. وقد أعلنت عدة دول خلال مؤتمر باريس التزامها بتسوية ديونها بالإعفاء الكامل أو الجزئي، وهو ما سيتضح خلال الأسابيع القليلة المقبلة بعد أن تتوفر الأرقام بصورة رسمية وتتضح الالتزامات.<br />مؤتمر باريس بمقياس النتائج كان أنجح من مؤتمر برلين الذي انعقد في يونيو (حزيران) العام الماضي برعاية ألمانيا والاتحاد الأوروبي والأمم المتحدة. فذلك المؤتمر ربما ظلمته أيضاً التوقعات الكبيرة التي سبقته في أن يحقق للسودان تغطية كل أو جزء كبير من الثمانية مليارات دولار التي قال رئيس الوزراء عبد الله حمدوك إن البلد يحتاج إليها من المساعدات الخارجية لكي يتمكن من مواجهة احتياجاته وسد الهوة الكبيرة في ميزان مدفوعاته وللمساعدة في إعادة بناء اقتصاده المنهار. من ذلك المبلغ لم يحقق مؤتمر برلين سوى تعهدات بمبلغ مليار و800 مليون دولار لم يتسلم منها في الواقع إلا نحو 370 مليوناً.<br />خلال مؤتمر باريس أعلن عن مؤتمرين آخرين لدعم الاقتصاد والتحول الديمقراطي في السودان؛ الأول في مارس (آذار) من العام المقبل في الولايات المتحدة، والثاني في اليابان في أكتوبر (تشرين الأول) 2022. هذان المؤتمران فرصة للسودان لكي يثبت أنه يسير على الطريق الصحيح ونحو التعافي الاقتصادي والسياسي، ولكي يقنع المجتمع الدولي بأهليته للحصول على المزيد من الدعم. فالدول في علاقاتها ومصالحها لا تدير جمعية خيرية، والسودان ليس البلد الوحيد الذي ينتظر مساعدات، لذا فإن الضغط عليه باعتباره الطرف المحتاج للدعم لكي يثبت أنه يسير في طريق الإصلاح والبناء، ولكي يقنع المستثمرين بجدوى وضع أموالهم فيه. صحيح هناك رغبة من المجتمع الدولي لمساعدة السودان لكنها رغبة مشروطة بأن تكون هناك خطوات حقيقية نحو الإصلاح الاقتصادي، ونحو السلام، ونحو الانتخابات والديمقراطية.<br />من السذاجة أن يعتقد البعض أن الدول ستساعد السودان بلا مقابل، أو أن البلد سوف يستطيع الخروج من الحفرة التي تردى إليها من دون دعم اقتصادي ومن دون اجتذاب رؤوس الأموال والاستثمارات الخارجية. هذا لا يعني بأي حال من الأحوال إهمال تنمية الموارد الذاتية، فهي طريق الخلاص الحقيقي لبلد غني بموارده أقعدته أمراض السياسة وصراعات السلطة، والحروب الداخلية.<br />ما هو المطلوب من السودان؟<br />لكي يستفيد البلد من أي فرص استثمارية ولكي يحقق تنمية داخلية يحتاج إليها بشدة لا بد من خطوات وإصلاحات عاجلة. بداية فإنه من دون إصلاح القطاع المصرفي وتحسين الخدمات والبنية التحتية لن يتحقق حلم اجتذاب الاستثمارات الأجنبية. ولأن القطاع المصرفي في السودان متهالك وإصلاحه سيستغرق وقتاً، فقد يكون مفيداً فتح الباب أمام دخول بنوك أجنبية، وهو أمر معمول به في معظم دول العالم وكان موجوداً في السودان قبل أن تحل به كوارث السياسة والتجارب الفاشلة.<br />في مجال البنية التحتية يحتاج السودان إلى اجتذاب تمويل واستثمارات عاجلة في مجالات الطاقة (الطاقة الشمسية والرياح إلى جانب الطاقة الكهربائية من السدود)، وقطاع الاتصالات والتحول الرقمي، وقطاع النقل والسكك الحديد والطيران، وفي مجال تطوير الزراعة والتعدين.<br />يحتاج السودان أيضاً إلى مفوضية قوية لمحاربة الفساد الذي استشرى ونخر في عظم البلد الهش، ومن دون اجتثاثه سوف يستمر تبديد الموارد ونهب الثروات وتعطيل المشاريع وهي بيئة طاردة للاستثمارات الأجنبية، ومعطلة للتنمية.<br />الحكومة الانتقالية تواجه أيضاً مطالبات من الداخل والخارج لاستكمال هياكل السلطة في الفترة الانتقالية بتشكيل المجلس التشريعي الذي تأخر كثيراً لأسباب غير مفهومة، ووجوده ضروري لكي تكون هناك جهة للمساءلة والمحاسبة، ولتوسيع المشاركة السياسية لا سيما أمام الشباب والمرأة والأقاليم المختلفة. يبقى بعد ذلك استكمال ملف السلام وإعادة هيكلة القوات المسلحة وإصلاح القضاء وعقد المؤتمر الدستوري، بما يهيئ الوصول إلى محطة الانتخابات الديمقراطية.<br />مؤتمر باريس هذا الأسبوع كان اختراقاً جديداً في طريق فك عزلة السودان، وخطوة أخرى مهمة لتحرير السودان من عبء الديون التي كبلته، وفي إطار الجهود لاجتذاب الاستثمارات الخارجية التي يحتاج إليها بشدة، على الرغم مما يثيره المتشائمون.</p>\n</span>',
    nid_export: '2982206',
    field_new_issueno_export: '15514',
    view_node: 'http://srpcawsatdev.prod.acquia-sites.com/home/article/2982206/%D8%B9%D8%AB%D9%85%D8%A7%D9%86-%D9%85%D9%8A%D8%B1%D8%BA%D9%86%D9%8A/%D8%A8%D8%A7%D8%B1%D9%8A%D8%B3-%D8%A7%D9%84%D9%85%D8%AA%D9%81%D8%A7%D8%A6%D9%84%D8%A9-%D8%A7%D9%84%D8%AE%D8%B1%D8%B7%D9%88%D9%85-%D8%A7%D9%84%D9%85%D8%AA%D8%B4%D8%A7%D8%A6%D9%85%D8%A9',
    field_publication_date_export: '2021-05-20T20:05:45+0000',
    created_export: '2021-05-19T20:48:09+0000',
    jwplayer: null,
    field_edit_letter_writer_export: null,
    writer: [],
    isBookmarked: false,
    isFollowed: false
  }
];

const relatedOpinionListData: OpinionsListItemType[] = [
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

jest.mock("src/hooks/useOpinionArticleDetail", () => ({
  useOpinionArticleDetail: () => {
      return {
        isLoading: false,
        opinionArticleDetailData: opinionArticleDetailData,
        opinionArticleError: '',
        fetchOpinionArticleDetail: () => {
          return []
        },
        isLoadingRelatedOpinion:false,
        relatedOpinionError: '',
        relatedOpinionListData: relatedOpinionListData,
        fetchRelatedOpinionData: () => {
          return []
        },
        emptyRelatedOpinionData: () => {
          return []
        },
        emptyOpinionArticleData: () => {
          return []
        }
      }
  },
}));

jest.mock("src/hooks/useAllWriters", () => ({
  useAllWriters: () => {
    return {
      selectedAuthorsData: {
        code: 200,
        message: "string",
        data: [
          {
            tid:'1'
          },
          {
            tid:'2'
          },
        ]
      },
      error: 'error',
      getSelectedAuthorsData: () => {
        return []
      },
      removeAuthorRequest: () => {
        return []
      },
      sendSelectedWriterInfo: () => {
        return []
      },
    }
  },
}));

jest.mock("src/hooks/useAppCommon", () => ({
  useAppCommon: () => {
      return {
          theme: 'light',
          isFirstSession: true,
          articleFontSize: 16,
          storeArticleFontSizeInfo: () => {}
      }
  },
}));

jest.mock('src/hooks/useLogin', () => ({useLogin: jest.fn()}));

jest.mock("src/hooks/useBookmark", () => ({
  useBookmark: () => {
    return {
      bookmarkIdInfo: [
          {
              nid: '1',
              bundle: 'string'
          },
          {
              nid: '2',
              bundle: 'string'
          }
      ],
      sendBookmarkInfo: () => [],
      removeBookmarkedInfo: () => [],
    }
  },
}));

const sampleData: WriterDetailDataType[] = [
  {
      name: 'example',
      field_description: 'example',
      field_opinion_writer_photo_export: 'example',
      tid: '1',
      isFollowed: true,
      field_instagram_url_export: 'url',
      field_opinion_twitter_export: 'twitter',
      field_opinion_facebook_export:'facebook',
  },
  {
      name: 'example',
      field_description: 'example',
      field_opinion_writer_photo_export: 'example',
      tid: '2',
      isFollowed: true,
      field_instagram_url_export: 'url',
      field_opinion_twitter_export: 'twitter',
      field_opinion_facebook_export:'facebook',
  },
];

jest.mock("src/hooks/useWriterDetail", () => ({
  useWriterDetail: () => {
      return {
          getWriterDetailData:()=>jest.fn(),
          emptyWriterDetailData:()=> jest.fn(),
          writerDetailData: sampleData,
      }
  },
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useNavigationState: () => ([]),
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
}));

const opinionData: OpinionArticleDetailItemType[] = [
  {
    title: 'example',
    bundle: 'example',
    body_export: 'example',
    nid_export: '12',
    field_new_issueno_export: 'example',
    view_node: 'example',
    field_publication_date_export: 'example',
    created_export: 'example',
    writer: [
      {
        id: '12',
        title: 'example',
        url: 'example',
        bundle: 'example',
        description: 'example',
        opinion_writer_photo: 'example',
        langcode: 'example',
        name: 'example',
      },
    ],
    isBookmarked: false,
    isFollowed: false
  }
]

const mediaData = {
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
} 

describe('<OpinionArticleDetail>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  const opinionArticle = mockFunction;
  const relatedOpinionInfo = mockFunction;
  const useLoginMock = mockFunction;

  const navigation = {
    popToTop: mockFunction,
    push: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    (useState as jest.Mock).mockImplementation(() => [opinionData, opinionArticle]);
    (useState as jest.Mock).mockImplementation(() => [opinionData, relatedOpinionInfo]);
    useLoginMock.mockReturnValue({
      isLoggedIn: true,
    });
    const component = (
      <Provider store={storeSampleData}>
        <OpinionArticleDetail route={{ params: { nid: '2', isRelatedArticle: false } } }/>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render OpinionArticleDetail component', () => {
    expect(instance).toBeDefined();
  });

  test('Should render OpinionArticleDetail component', () => {
    expect(render(
      <Provider store={storeSampleData}>
        <OpinionArticleDetail route={{ params: { nid: 123, isRelatedArticle: true } } }/>
      </Provider>
    )).toBeDefined();
  });

  test('Should call ScreenContainer onCloseSignUpAlert', () => {
    const element = instance.container.findByType(ScreenContainer)
    fireEvent(element, 'onCloseSignUpAlert');
    expect(mockFunction).toBeTruthy()
  }); 

  test('Should call FlatList keyExtractor', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'keyExtractor', '', 2);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList renderItem', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'renderItem', {item: [{}], index: 0});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailFooter onPressSave', () => {
    const element = instance.container.findByType(OpinionArticleDetailFooter)
    fireEvent(element, 'onPressSave', opinionData[0].nid_export);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailFooter onPressFontSizeChange', () => {
    const element = instance.container.findByType(OpinionArticleDetailFooter)
    fireEvent(element, 'onPressFontSizeChange');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList onScroll', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'onScroll', {nativeEvent: {contentOffset: {y: 120}}});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget onPressFollow', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'onPressFollow', opinionData[0].writer[0].id);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget onPressFollow', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'onPressFollow');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget onPressHome', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'onPressHome');
    expect(navigation.popToTop).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget togglePlayback', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'togglePlayback', '2', mediaData);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call RelatedOpinionArticlesWidget onScroll', () => {
    const element = instance.container.findByType(RelatedOpinionArticlesWidget)
    fireEvent(element, 'onScroll');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call RelatedOpinionArticlesWidget onPress', () => {
    const element = instance.container.findByType(RelatedOpinionArticlesWidget)
    fireEvent(element, 'onPress', '2');
    expect(navigation.push).toBeTruthy()
  });

  test('Should call RelatedOpinionArticlesWidget onPress', () => {
    const element = instance.container.findByType(RelatedOpinionArticlesWidget)
    fireEvent(element, 'onPress', '4');
    expect(navigation.push).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget togglePlayback', () => {
    const element = instance.container.findByType(RelatedOpinionArticlesWidget)
    fireEvent(element, 'togglePlayback', '2', mediaData);
    expect(mockFunction).toBeTruthy()
  });
  
});

describe('<OpinionArticleDetail>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  const opinionArticle = mockFunction;
  const relatedOpinionInfo = mockFunction;
  const useLoginMock = mockFunction;

  const navigation = {
    popToTop: mockFunction,
    push: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    (useState as jest.Mock).mockImplementation(() => [opinionData, opinionArticle]);
    (useState as jest.Mock).mockImplementation(() => [opinionData, relatedOpinionInfo]);
    useLoginMock.mockReturnValue({
      isLoggedIn: false,
    });
    const component = (
      <Provider store={storeSampleData}>
        <OpinionArticleDetail route={{ params: { nid: 123, isRelatedArticle: false } } }/>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render OpinionArticleDetail component', () => {
    expect(instance).toBeDefined();
  });

  test('Should render OpinionArticleDetail component', () => {
    expect(render(
      <Provider store={storeSampleData}>
        <OpinionArticleDetail route={{ params: { nid: 123, isRelatedArticle: true } } }/>
      </Provider>
    )).toBeDefined();
  });

  test('Should call ScreenContainer onCloseSignUpAlert', () => {
    const element = instance.container.findByType(ScreenContainer)
    fireEvent(element, 'onCloseSignUpAlert');
    expect(mockFunction).toBeTruthy()
  }); 

  test('Should call FlatList keyExtractor', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'keyExtractor', '', 2);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList renderItem', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'renderItem', {item: [{}], index: 0});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailFooter onPressSave', () => {
    const element = instance.container.findByType(OpinionArticleDetailFooter)
    fireEvent(element, 'onPressSave', opinionData[0].nid_export);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailFooter onPressFontSizeChange', () => {
    const element = instance.container.findByType(OpinionArticleDetailFooter)
    fireEvent(element, 'onPressFontSizeChange');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList onScroll', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'onScroll', {nativeEvent: {contentOffset: {y: 120}}});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget onPressFollow', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'onPressFollow', opinionData[0].writer[0].id);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget onPressFollow', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'onPressFollow');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget onPressHome', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'onPressHome');
    expect(navigation.popToTop).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget togglePlayback', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'togglePlayback', '2', mediaData);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call RelatedOpinionArticlesWidget onScroll', () => {
    const element = instance.container.findByType(RelatedOpinionArticlesWidget)
    fireEvent(element, 'onScroll');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call RelatedOpinionArticlesWidget onPress', () => {
    const element = instance.container.findByType(RelatedOpinionArticlesWidget)
    fireEvent(element, 'onPress', '2');
    expect(navigation.push).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget togglePlayback', () => {
    const element = instance.container.findByType(RelatedOpinionArticlesWidget)
    fireEvent(element, 'togglePlayback', '2', mediaData);
    expect(mockFunction).toBeTruthy()
  });
  
});

describe('<OpinionArticleDetail>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  const opinionArticle = mockFunction;
  const relatedOpinionInfo = mockFunction;
  const useLoginMock = mockFunction;

  const navigation = {
    popToTop: mockFunction,
    push: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    (useState as jest.Mock).mockImplementation(() => [opinionData, opinionArticle]);
    (useState as jest.Mock).mockImplementation(() => [opinionData, relatedOpinionInfo]);
    useLoginMock.mockReturnValue({
      isLoggedIn: true,
    });
    const component = (
      <Provider store={storeSampleData}>
        <OpinionArticleDetail route={{ params: { nid: 123, isRelatedArticle: false } } }/>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render OpinionArticleDetail component', () => {
    expect(instance).toBeDefined();
  });

  test('Should render OpinionArticleDetail component', () => {
    expect(render(
      <Provider store={storeSampleData}>
        <OpinionArticleDetail route={{ params: { nid: 123, isRelatedArticle: true } } }/>
      </Provider>
    )).toBeDefined();
  });

  test('Should call ScreenContainer onCloseSignUpAlert', () => {
    const element = instance.container.findByType(ScreenContainer)
    fireEvent(element, 'onCloseSignUpAlert');
    expect(mockFunction).toBeTruthy()
  }); 

  test('Should call FlatList keyExtractor', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'keyExtractor', '', 2);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList renderItem', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'renderItem', {item: [{}], index: 0});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailFooter onPressSave', () => {
    const element = instance.container.findByType(OpinionArticleDetailFooter)
    fireEvent(element, 'onPressSave', opinionData[0].nid_export);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailFooter onPressFontSizeChange', () => {
    const element = instance.container.findByType(OpinionArticleDetailFooter)
    fireEvent(element, 'onPressFontSizeChange');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList onScroll', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'onScroll', {nativeEvent: {contentOffset: {y: 120}}});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget onPressFollow', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'onPressFollow', opinionData[0].writer[0].id);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget onPressFollow', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'onPressFollow');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget onPressHome', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'onPressHome');
    expect(navigation.popToTop).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget togglePlayback', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'togglePlayback', '2', mediaData);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call RelatedOpinionArticlesWidget onScroll', () => {
    const element = instance.container.findByType(RelatedOpinionArticlesWidget)
    fireEvent(element, 'onScroll');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call RelatedOpinionArticlesWidget onPress', () => {
    const element = instance.container.findByType(RelatedOpinionArticlesWidget)
    fireEvent(element, 'onPress', '2');
    expect(navigation.push).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget togglePlayback', () => {
    const element = instance.container.findByType(RelatedOpinionArticlesWidget)
    fireEvent(element, 'togglePlayback', '2', mediaData);
    expect(mockFunction).toBeTruthy()
  });
  
});

describe('<OpinionArticleDetail>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  const opinionArticle = mockFunction;
  const relatedOpinionInfo = mockFunction;
  const page = mockFunction;
  const writerDetailInfo = mockFunction;
  const isFollowed = mockFunction;
  const edge = mockFunction;
  const scrollY = mockFunction;
  const selectedTrack = mockFunction;
  const showupUp = mockFunction;
  const isBookmarked = mockFunction;
  const useLoginMock = mockFunction;

  const navigation = {
    popToTop: mockFunction,
    push: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    (useState as jest.Mock).mockImplementation(() => [opinionData, opinionArticle]);
    (useState as jest.Mock).mockImplementation(() => [relatedOpinionListData, relatedOpinionInfo]);
    (useState as jest.Mock).mockImplementation(() => [0, page]);
    (useState as jest.Mock).mockImplementation(() => [sampleData, writerDetailInfo]);
    (useState as jest.Mock).mockImplementation(() => [false, isFollowed]);
    (useState as jest.Mock).mockImplementation(() => [horizontalEdge, edge]);
    (useState as jest.Mock).mockImplementation(() => [new Animated.Value(60), scrollY]);
    (useState as jest.Mock).mockImplementation(() => ['123', selectedTrack]);
    (useState as jest.Mock).mockImplementation(() => [true, showupUp]);
    (useState as jest.Mock).mockImplementation(() => [true, isBookmarked]);
    useLoginMock.mockReturnValue({
      isLoggedIn: false,
    });
    const component = (
      <Provider store={storeSampleData}>
        <OpinionArticleDetail route={{ params: { nid: 123,  isRelatedArticle: false } } }/>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render OpinionArticleDetail component', () => {
    expect(instance).toBeDefined();
  });

  test('Should render OpinionArticleDetail component', () => {
    expect(render(
      <Provider store={storeSampleData}>
        <OpinionArticleDetail route={{ params: { nid: 123, isRelatedArticle: true } } }/>
      </Provider>
    )).toBeDefined();
  });

  test('Should call ScreenContainer onCloseSignUpAlert', () => {
    const element = instance.container.findByType(ScreenContainer)
    fireEvent(element, 'onCloseSignUpAlert');
    expect(mockFunction).toBeTruthy()
  }); 
  
});

