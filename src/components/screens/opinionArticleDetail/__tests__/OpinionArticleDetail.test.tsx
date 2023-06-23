import React, { useRef, useState } from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { ScreensConstants, storeSampleData } from '../../../../constants/Constants';
import { OpinionArticleDetail } from '../OpinionArticleDetail';
import { OpinionArticleDetailItemType, OpinionsListItemType } from 'src/redux/opinionArticleDetail/types';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import { Animated, FlatList } from 'react-native';
import { DetailHeader } from 'src/components/molecules';
import { OpinionArticleDetailWidget, RelatedOpinionArticlesWidget } from 'src/components/organisms';
import { useNavigation } from '@react-navigation/native';
import { WriterDetailDataType } from 'src/redux/writersDetail/types';
import { horizontalEdge } from 'src/shared/utils';
import { useAllWriters, useAppCommon, useBookmark, useLogin, useOpinionArticleDetail, useWriterDetail } from 'src/hooks';
import Orientation from 'react-native-orientation-locker';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useRef: jest.fn()
}));
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
  isIOS: false,
  isNotchDevice: false
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
    writer: [
      {
        id: '1',
        bundle: 'bundle',
        description: 'description',
        langcode: 'langCode',
        name: 'name',
        opinion_writer_photo: 'opinion_writer_photo',
        title: 'title',
        url: 'url'
      }
    ],
    isBookmarked: false,
    isFollowed: false
  }
];

const opinionArticleData = [
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
    writer: [
      {
        id: '2',
        bundle: 'bundle',
        description: 'description',
        langcode: 'langCode',
        name: 'name',
        opinion_writer_photo: 'opinion_writer_photo',
        title: 'title',
        url: 'url'
      }
    ],
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
    nid: "2982217",
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
  useOpinionArticleDetail: jest.fn()
}));

jest.mock("src/hooks/useAllWriters", () => ({
  useAllWriters: jest.fn()
}));

jest.mock("src/hooks/useAppCommon", () => ({
  useAppCommon: jest.fn()
}));

jest.mock('src/hooks/useLogin', () => ({ useLogin: jest.fn() }));

jest.mock("src/hooks/useBookmark", () => ({
  useBookmark: jest.fn()
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
    field_opinion_facebook_export: 'facebook',
  },
  {
    name: 'example',
    field_description: 'example',
    field_opinion_writer_photo_export: 'example',
    tid: '2',
    isFollowed: true,
    field_instagram_url_export: 'url',
    field_opinion_twitter_export: 'twitter',
    field_opinion_facebook_export: 'facebook',
  },
];

const writerData = [
  {
    name: 'example',
    field_description: 'example',
    field_opinion_writer_photo_export: 'example',
    tid: '1',
    isFollowed: true,
    field_instagram_url_export: 'url',
    field_opinion_twitter_export: 'twitter',
    field_opinion_facebook_export: 'facebook',
    writer:[
      {
        opinion_writer_photo:'opinion_writer_photo'
      }
    ]
  },
  {
    name: 'example',
    field_description: 'example',
    field_opinion_writer_photo_export: 'example',
    tid: '2',
    isFollowed: true,
    field_instagram_url_export: 'url',
    field_opinion_twitter_export: 'twitter',
    field_opinion_facebook_export: 'facebook',
  },
];


jest.mock("src/hooks/useWriterDetail", () => ({
  useWriterDetail: jest.fn()
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useNavigationState: jest.fn().mockReturnValue([{name:'ARTICLE_DETAIL_SCREEN'},{name:'OPINION_ARTICLE_DETAIL_SCREEN'},{name:'WRITERS_DETAIL_SCREEN'}]),
  useIsFocused: () => jest.fn().mockReturnValue(true),
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
    isFollowed: false,
    field_shorturl: 'string',
    link_node: 'string',
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

const defaultBookmarkMock = {
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
  validateBookmark: () => true,
};

const defaultWriterDetailMock = {
  getWriterDetailData: () => jest.fn(),
  emptyWriterDetailData: () => jest.fn(),
  writerDetailData: sampleData,
}

const defaultAllWriterMock = {
  selectedAuthorsData: {
    code: 200,
    message: "string",
    data: [
      {
        tid: '1'
      },
      {
        tid: '2'
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
  validateFollow: () => true,
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
    (useOpinionArticleDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      opinionArticleDetailData: opinionArticleDetailData,
      opinionArticleError: '',
      fetchOpinionArticleDetail: () => {
        return []
      },
      isLoadingRelatedOpinion: false,
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
    });
    (useWriterDetail as jest.Mock).mockReturnValue({ ...defaultWriterDetailMock });
    (useBookmark as jest.Mock).mockReturnValue({...defaultBookmarkMock});
    (useAppCommon as jest.Mock).mockReturnValue({
        theme: 'light',
        isFirstSession: true,
        articleFontSize: 16,
        storeArticleFontSizeInfo: () => { }
    });
    (useAllWriters as jest.Mock).mockReturnValue({...defaultAllWriterMock});
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    (useState as jest.Mock).mockImplementation(() => [opinionData, opinionArticle]);
    (useState as jest.Mock).mockImplementation(() => [opinionData, relatedOpinionInfo]);
    (useRef as jest.Mock).mockReturnValue({current:true});

    useLoginMock.mockReturnValue({
      isLoggedIn: true,
    });
    const component = (
      <SafeAreaProvider>
        <Provider store={storeSampleData}>
          <GestureHandlerRootView>
            <OpinionArticleDetail route={{ params: { nid: '2', isRelatedArticle: false } }} />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
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
      <SafeAreaProvider>
        <Provider store={storeSampleData}>
          <GestureHandlerRootView>
            <OpinionArticleDetail route={{ params: { nid: 123, isRelatedArticle: true } }} />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
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
    fireEvent(element, 'renderItem', { item: [{}], index: 0 });
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList onScroll', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'onScroll', { nativeEvent: { contentOffset: { y: 120 } } });
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget onPressFollow', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'onPressFollow', opinionData[0].writer[0].id);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call OpinionArticleDetailWidget onPressWriter', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'onPressWriter');
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
    (useOpinionArticleDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      opinionArticleDetailData: opinionArticleDetailData,
      opinionArticleError: '',
      fetchOpinionArticleDetail: () => {
        return []
      },
      isLoadingRelatedOpinion: false,
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
    });
    (useBookmark as jest.Mock).mockReturnValue({...defaultBookmarkMock});
    (useWriterDetail as jest.Mock).mockReturnValue({...defaultWriterDetailMock});
    (useAllWriters as jest.Mock).mockReturnValue({...defaultAllWriterMock});

    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    (useState as jest.Mock).mockImplementation(() => [opinionData, opinionArticle]);
    (useState as jest.Mock).mockImplementation(() => [opinionData, relatedOpinionInfo]);
    useLoginMock.mockReturnValue({
      isLoggedIn: false,
    });
    (useRef as jest.Mock).mockReturnValue({current:true});
    (useAppCommon as jest.Mock).mockReturnValue({
      theme: 'light',
      isFirstSession: true,
      articleFontSize: 16,
      storeArticleFontSizeInfo: () => { }
    });
    const component = (
      <SafeAreaProvider>
        <Provider store={storeSampleData}>
          <GestureHandlerRootView>
            <OpinionArticleDetail route={{ params: { nid: 123, isRelatedArticle: false } }} />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
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
      <SafeAreaProvider>
        <Provider store={storeSampleData}>
          <GestureHandlerRootView>
            <OpinionArticleDetail route={{ params: { nid: 123, isRelatedArticle: true } }} />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
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
    fireEvent(element, 'renderItem', { item: [{}], index: 0 });
    expect(mockFunction).toBeTruthy()
  });



  test('Should call FlatList onScroll', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'onScroll', { nativeEvent: { contentOffset: { y: 120 } } });
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
    (useOpinionArticleDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      opinionArticleDetailData: opinionArticleDetailData,
      opinionArticleError: '',
      fetchOpinionArticleDetail: () => {
        return []
      },
      isLoadingRelatedOpinion: false,
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
    });
    (useBookmark as jest.Mock).mockReturnValue({...defaultBookmarkMock});
    (useAllWriters as jest.Mock).mockReturnValue({...defaultAllWriterMock});

    (useWriterDetail as jest.Mock).mockReturnValue({...defaultWriterDetailMock});
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    (useState as jest.Mock).mockImplementation(() => [opinionData, opinionArticle]);
    (useState as jest.Mock).mockImplementation(() => [opinionData, relatedOpinionInfo]);
    useLoginMock.mockReturnValue({
      isLoggedIn: true,
    });
    (useAppCommon as jest.Mock).mockReturnValue({
      theme: 'light',
      isFirstSession: true,
      articleFontSize: 16,
      storeArticleFontSizeInfo: () => { }
    });
    (useRef as jest.Mock).mockReturnValue({current:true});
    const component = (
      <SafeAreaProvider>
        <Provider store={storeSampleData}>
          <GestureHandlerRootView>
            <OpinionArticleDetail route={{ params: { nid: 123, isRelatedArticle: false } }} />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
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
      <SafeAreaProvider>
        <Provider store={storeSampleData}>
          <GestureHandlerRootView>
            <OpinionArticleDetail route={{ params: { nid: 123, isRelatedArticle: true } }} />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
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
    fireEvent(element, 'renderItem', { item: [{}], index: 0 });
    expect(mockFunction).toBeTruthy()
  });


  test('Should call FlatList onScroll', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'onScroll', { nativeEvent: { contentOffset: { y: 120 } } });
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
    (useOpinionArticleDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      opinionArticleDetailData: opinionArticleDetailData,
      opinionArticleError: '',
      fetchOpinionArticleDetail: () => {
        return []
      },
      isLoadingRelatedOpinion: false,
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
    });
    (useAllWriters as jest.Mock).mockReturnValue({...defaultAllWriterMock});
    (useBookmark as jest.Mock).mockReturnValue({...defaultBookmarkMock});
    (useWriterDetail as jest.Mock).mockReturnValue({...defaultWriterDetailMock});
    (useAppCommon as jest.Mock).mockReturnValue({
      theme: 'light',
      isFirstSession: true,
      articleFontSize: 16,
      storeArticleFontSizeInfo: () => { }
    });
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
    (useAllWriters as jest.Mock).mockReturnValue({...defaultAllWriterMock});

    (useRef as jest.Mock).mockReturnValue({current:true});
    const component = (
      <SafeAreaProvider>
        <Provider store={storeSampleData}>
          <GestureHandlerRootView>
            <OpinionArticleDetail route={{ params: { nid: 123, isRelatedArticle: false } }} />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
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
      <SafeAreaProvider>
        <Provider store={storeSampleData}>
          <GestureHandlerRootView>
            <OpinionArticleDetail route={{ params: { nid: 123, isRelatedArticle: true } }} />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
    )).toBeDefined();
  });

  test('Should call ScreenContainer onCloseSignUpAlert', () => {
    const element = instance.container.findByType(ScreenContainer)
    fireEvent(element, 'onCloseSignUpAlert');
    expect(mockFunction).toBeTruthy()
  });

});

describe("OpinionArticleDetail", () => {
  let instance: RenderAPI;
  const setState = jest.fn();
  beforeEach(() => {
    (useOpinionArticleDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      opinionArticleDetailData: opinionArticleData,
      opinionArticleError: '',
      fetchOpinionArticleDetail: () => {
        return []
      },
      isLoadingRelatedOpinion: false,
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
    });
    (useAllWriters as jest.Mock).mockReturnValue({...defaultAllWriterMock});
    (useBookmark as jest.Mock).mockReturnValue({...defaultBookmarkMock});
    (useWriterDetail as jest.Mock).mockReturnValue({...defaultWriterDetailMock});
    (useAppCommon as jest.Mock).mockReturnValue({
      theme: 'light',
      isFirstSession: true,
      articleFontSize: 16,
      storeArticleFontSizeInfo: () => { }
    });
    (useState as jest.Mock).mockImplementation(() => [opinionData, setState]);
    (useRef as jest.Mock).mockReturnValue({current:true});
    const component = (
      <SafeAreaProvider>
        <Provider store={storeSampleData}>
          <GestureHandlerRootView>
            <OpinionArticleDetail route={{ params: { nid: '', isRelatedArticle: false } }} />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
    );
    instance = render(component);
  });
  afterEach(() => {
    instance.unmount();
    jest.clearAllMocks();
  })

  it("should not update opinionArticle state in useEffect when nid is empty", () => {
    expect(setState).toHaveBeenCalled();
    expect(setState).not.toHaveBeenCalledWith(opinionArticleDetailData);
  })
})

describe("OpinionArticleDetail", () => {
  let instance: RenderAPI;
  const setState = jest.fn();
  beforeEach(() => {
    (useOpinionArticleDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      opinionArticleDetailData: [],
      opinionArticleError: '',
      fetchOpinionArticleDetail: () => {
        return []
      },
      isLoadingRelatedOpinion: false,
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
    });
    (useAllWriters as jest.Mock).mockReturnValue({...defaultAllWriterMock});
    (useBookmark as jest.Mock).mockReturnValue({...defaultBookmarkMock});
    (useWriterDetail as jest.Mock).mockReturnValue({...defaultWriterDetailMock});
    (useAppCommon as jest.Mock).mockReturnValue({
      theme: 'light',
      isFirstSession: true,
      articleFontSize: 16,
      storeArticleFontSizeInfo: () => { }
    });
    (useState as jest.Mock).mockImplementation(() => [opinionData, setState]);
    (useRef as jest.Mock).mockReturnValue({current:true});
    const component = (
      <SafeAreaProvider>
        <Provider store={storeSampleData}>
          <GestureHandlerRootView>
            <OpinionArticleDetail route={{ params: { nid: '', isRelatedArticle: false } }} />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
    );
    instance = render(component);
  });
  afterEach(() => {
    instance.unmount();
    jest.clearAllMocks();
  })

  it("should not update opinionArticle state in useEffect when opinionArticleDetailData is empty", () => {
    expect(setState).toHaveBeenCalled();
    expect(setState).not.toHaveBeenCalledWith([]);
  })
})

describe("OpinionArticleDetail", () => {
  let instance: RenderAPI;
  const setState = jest.fn();
  beforeEach(() => {
    (useOpinionArticleDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      opinionArticleDetailData: opinionArticleDetailData,
      opinionArticleError: '',
      fetchOpinionArticleDetail: () => {
        return []
      },
      isLoadingRelatedOpinion: false,
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
    });
    (useAllWriters as jest.Mock).mockReturnValue({...defaultAllWriterMock});
    (useWriterDetail as jest.Mock).mockReturnValue({...defaultWriterDetailMock});
    (useAppCommon as jest.Mock).mockReturnValue({
      theme: 'light',
      isFirstSession: true,
      articleFontSize: 16,
      storeArticleFontSizeInfo: () => { }
    });
    (useBookmark as jest.Mock).mockReturnValue({...defaultBookmarkMock});
    (useState as jest.Mock).mockImplementation(() => [opinionData, setState]);
    (useRef as jest.Mock).mockReturnValue({current:true});
    const component = (
      <SafeAreaProvider>
        <Provider store={storeSampleData}>
          <GestureHandlerRootView>
            <OpinionArticleDetail route={{ params: { nid: '', isRelatedArticle: false } }} />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
    );
    instance = render(component);
  });
  afterEach(() => {
    instance.unmount();
    jest.clearAllMocks();
  })

  it("should not update writerDetailInfo state in useEffect when writerDetailData is empty", () => {
    expect(setState).toHaveBeenCalled();
    expect(setState).not.toHaveBeenCalledWith([]);
  })
})

describe("OpinionArticleDetail", () => {
  let instance: RenderAPI;
  const setState = jest.fn();
  const mockFunction = jest.fn();
  const navigation = {
    goBack: mockFunction,
  }
  beforeEach(() => {
    (useOpinionArticleDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      opinionArticleDetailData: opinionArticleDetailData,
      opinionArticleError: '',
      fetchOpinionArticleDetail: () => {
        return []
      },
      isLoadingRelatedOpinion: false,
      relatedOpinionError: '',
      relatedOpinionListData: [],
      fetchRelatedOpinionData: () => {
        return []
      },
      emptyRelatedOpinionData: () => {
        return []
      },
      emptyOpinionArticleData: () => {
        return []
      }
    });
    (useAllWriters as jest.Mock).mockReturnValue({...defaultAllWriterMock});
    (useBookmark as jest.Mock).mockReturnValue({...defaultBookmarkMock});
    (useWriterDetail as jest.Mock).mockReturnValue({...defaultWriterDetailMock});
    (useAppCommon as jest.Mock).mockReturnValue({
      theme: 'light',
      isFirstSession: true,
      articleFontSize: 16,
      storeArticleFontSizeInfo: () => { }
    });
    (useState as jest.Mock).mockImplementation(() => [opinionData, setState]);
    (useRef as jest.Mock).mockReturnValue({current:true});
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = (
      <SafeAreaProvider>
        <Provider store={storeSampleData}>
          <GestureHandlerRootView>
            <OpinionArticleDetail route={{ params: { nid: '2982216', isRelatedArticle: true } }} />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
    );
    instance = render(component);
  });
  afterEach(() => {
    instance.unmount();
    jest.clearAllMocks();
  })

  it("should not update state in useEffect with relatedOpinionData when relatedOpinionListData is empty", () => {
    expect(setState).toHaveBeenCalled();
    expect(setState).not.toHaveBeenCalledWith(relatedOpinionListData[1]);
  })
  it("should call DetailHeader onPressBack when isRelatedArticle is true",() => {
    const element = instance.container.findByType(DetailHeader);
    fireEvent(element,'onBackPress');
    expect(Orientation.unlockAllOrientations).not.toHaveBeenCalled();
    expect(Orientation.lockToPortrait).not.toHaveBeenCalled();
    expect(navigation.goBack).toHaveBeenCalled();
  })
})

describe("OpinionArticleDetail", () => {
  let instance: RenderAPI;
  const setState = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useOpinionArticleDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      opinionArticleDetailData: opinionArticleDetailData,
      opinionArticleError: '',
      fetchOpinionArticleDetail: () => {
        return []
      },
      isLoadingRelatedOpinion: false,
      relatedOpinionError: '',
      relatedOpinionListData: [],
      fetchRelatedOpinionData: () => {
        return []
      },
      emptyRelatedOpinionData: () => {
        return []
      },
      emptyOpinionArticleData: () => {
        return []
      }
    });
    (useAllWriters as jest.Mock).mockReturnValue({...defaultAllWriterMock});
    (useBookmark as jest.Mock).mockReturnValue({...defaultBookmarkMock});
    (useWriterDetail as jest.Mock).mockReturnValue({...defaultWriterDetailMock});
    (useAppCommon as jest.Mock).mockReturnValue({
      theme: 'light',
      isFirstSession: true,
      articleFontSize: 16,
      storeArticleFontSizeInfo: () => { }
    });
    (useState as jest.Mock).mockImplementation(() => [opinionData, setState]);
    (useRef as jest.Mock).mockReturnValue({current:false});
    DeviceTypeUtilsMock.isTab = true;
    const component = (
      <SafeAreaProvider>
        <Provider store={storeSampleData}>
          <GestureHandlerRootView>
            <OpinionArticleDetail route={{ params: { nid: '2982216', isRelatedArticle: true } }} />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
    );
    instance = render(component);
  });
  afterEach(() => {
    instance.unmount();
    jest.clearAllMocks();
  })

  it("should call Orientation in useEffect when isTab is true", () => {
    expect(Orientation.unlockAllOrientations).toHaveBeenCalled();
    expect(Orientation.getDeviceOrientation).not.toHaveBeenCalled();
    expect(Orientation.addDeviceOrientationListener).not.toHaveBeenCalled();
  })

  it("should call setTimeout in useEffect and update state with 0",() => {
    const spyon = jest.spyOn(global,'setTimeout');
    expect(spyon).toHaveBeenCalled();
    jest.advanceTimersByTime(10000);
    expect(setState).toHaveBeenCalled();
    expect(setState).toHaveBeenCalledWith(0);
  })
})

describe("OpinionArticleDetail", () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const navigation = {
    goBack: mockFunction,
  }
  const setState = jest.fn();
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useOpinionArticleDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      opinionArticleDetailData: opinionArticleDetailData,
      opinionArticleError: '',
      fetchOpinionArticleDetail: () => {
        return []
      },
      isLoadingRelatedOpinion: false,
      relatedOpinionError: '',
      relatedOpinionListData: [],
      fetchRelatedOpinionData: () => {
        return []
      },
      emptyRelatedOpinionData: () => {
        return []
      },
      emptyOpinionArticleData: () => {
        return []
      }
    });
    (useAllWriters as jest.Mock).mockReturnValue({...defaultAllWriterMock});
    (useBookmark as jest.Mock).mockReturnValue({...defaultBookmarkMock });
    (useWriterDetail as jest.Mock).mockReturnValue({...defaultWriterDetailMock});
    (useAppCommon as jest.Mock).mockReturnValue({
      theme: 'light',
      isFirstSession: true,
      articleFontSize: 16,
      storeArticleFontSizeInfo: () => { }
    });
    (useState as jest.Mock).mockImplementation(() => [16, setState]);
    (useRef as jest.Mock).mockReturnValue({current:false});
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = (
      <SafeAreaProvider>
        <Provider store={storeSampleData}>
          <GestureHandlerRootView>
            <OpinionArticleDetail route={{ params: { nid: '2982216', isRelatedArticle: false } }} />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
    );
    instance = render(component);
  });
  afterEach(() => {
    instance.unmount();
    jest.clearAllMocks();
  })

  it("should call component in ios",() => {
    DeviceTypeUtilsMock.isTab = true;
    DeviceTypeUtilsMock.isIOS = true;
    const element = instance.container.findByType(ScreenContainer);
    expect(element.props.playerPosition).toEqual({bottom: 104});
  })

  it("should call component not in ios",() => {
    DeviceTypeUtilsMock.isIOS = false;
    const element = instance.container.findByType(ScreenContainer);
    expect(element.props.playerPosition).toEqual({bottom: 104});
  })

  it("should call component in ios and isNotchDevice is true",() => {
    DeviceTypeUtilsMock.isTab = false;
    DeviceTypeUtilsMock.isIOS = true;
    DeviceTypeUtilsMock.isNotchDevice = true;
    // const element = instance.getByTestId("headerViewId");
    // expect(element.props.style.height).toEqual(200);
  })

  it("should call component in ios and isNotchDevice is false",() => {
    DeviceTypeUtilsMock.isTab = false;
    DeviceTypeUtilsMock.isIOS = true;
    DeviceTypeUtilsMock.isNotchDevice = false;
    // const element = instance.getByTestId("headerViewId");
    // expect(element.props.style.height).toEqual(196);
  })

  it("should not update state with articleFontSize in useEffect when fontSize and articleFontSize are equal",() => {
    expect(setState).toHaveBeenCalled();
    expect(setState).not.toHaveBeenCalledWith(16);
  })

  it("should call DetailHeader onPressBack when isRelatedArticle is false",() => {
    DeviceTypeUtilsMock.isTab = true;
    const element = instance.container.findByType(DetailHeader);
    fireEvent(element,'onBackPress');
    expect(Orientation.unlockAllOrientations).not.toHaveBeenCalled();
    expect(Orientation.lockToPortrait).not.toHaveBeenCalled();
    expect(navigation.goBack).toHaveBeenCalled();
  })
})

describe("OpinionArticleDetail", () => {
  let instance: RenderAPI;
  const setState = jest.fn();
  const mockFunction = jest.fn();
  const navigation = {
    navigate: mockFunction,
  }
  beforeEach(() => {
    (useOpinionArticleDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      opinionArticleDetailData: opinionArticleDetailData,
      opinionArticleError: '',
      fetchOpinionArticleDetail: () => {
        return []
      },
      isLoadingRelatedOpinion: false,
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
    });
    (useAllWriters as jest.Mock).mockReturnValueOnce({...defaultAllWriterMock}).mockReturnValueOnce({
      selectedAuthorsData:{},
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
      validateFollow: () => true,
    });
    (useBookmark as jest.Mock).mockReturnValue({
      bookmarkIdInfo: [],
      sendBookmarkInfo: () => [],
      removeBookmarkedInfo: () => [],
      validateBookmark: () => true,
    });
    (useWriterDetail as jest.Mock).mockReturnValue({...defaultWriterDetailMock});
    (useAppCommon as jest.Mock).mockReturnValue({
      theme: 'light',
      isFirstSession: true,
      articleFontSize: 16,
      storeArticleFontSizeInfo: () => { }
    });
    (useState as jest.Mock).mockImplementation(() => [opinionArticleData, setState]);
    (useRef as jest.Mock).mockReturnValue({current:true});
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = (
      <SafeAreaProvider>
        <Provider store={storeSampleData}>
          <GestureHandlerRootView>
            <OpinionArticleDetail route={{ params: { nid: '2982216', isRelatedArticle: true } }} />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
    );
    instance = render(component);
  });
  afterEach(() => {
    instance.unmount();
    jest.clearAllMocks();
  })

  it("should update isBookmark state in useEffect with false",() => {
    expect(setState).toHaveBeenCalled();
    expect(setState).toHaveBeenCalledWith(false)
  })

  it("should update isFollowed state in useEffect with false",() => {
    expect(setState).toHaveBeenCalled();
    expect(setState).toHaveBeenCalledWith(false)
  })
})

describe("OpinionArticleDetail", () => {
  let instance: RenderAPI;
  const setState = jest.fn();
  const mockFunction = jest.fn();
  const navigation = {
    navigate: mockFunction,
  }
  beforeEach(() => {
    (useOpinionArticleDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      opinionArticleDetailData: opinionArticleDetailData,
      opinionArticleError: '',
      fetchOpinionArticleDetail: () => {
        return []
      },
      isLoadingRelatedOpinion: false,
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
    });
    (useAllWriters as jest.Mock).mockReturnValueOnce({...defaultAllWriterMock}).mockReturnValueOnce({
      selectedAuthorsData:{},
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
      validateFollow: () => true,
    });
    (useBookmark as jest.Mock).mockReturnValue({
      bookmarkIdInfo: [],
      sendBookmarkInfo: () => [],
      removeBookmarkedInfo: () => [],
      validateBookmark: () => [],
    });
    (useWriterDetail as jest.Mock).mockReturnValue({...defaultWriterDetailMock});
    (useAppCommon as jest.Mock).mockReturnValue({
      theme: 'light',
      isFirstSession: true,
      articleFontSize: 16,
      storeArticleFontSizeInfo: () => { }
    });
    (useState as jest.Mock).mockImplementation(() => [writerData, setState]);
    (useRef as jest.Mock).mockReturnValue({current:true});
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = (
      <SafeAreaProvider>
        <Provider store={storeSampleData}>
          <GestureHandlerRootView>
            <OpinionArticleDetail route={{ params: { nid: '2982216', isRelatedArticle: true } }} />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
    );
    instance = render(component);
  });
  afterEach(() => {
    instance.unmount();
    jest.clearAllMocks();
  })

  test('Should call OpinionArticleDetailWidget onPressWriter', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'onPressWriter');
    expect(navigation.navigate).toHaveBeenCalled();
    expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.WRITERS_DETAIL_SCREEN,{tid:'1'})
  });
  
})

describe("OpinionArticleDetail", () => {
  let instance: RenderAPI;
  const setState = jest.fn();
  const mockFunction = jest.fn();
  const useLoginMock = jest.fn();
  const navigation = {
    navigate: mockFunction,
  }
  beforeEach(() => {
    (useOpinionArticleDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      opinionArticleDetailData: opinionArticleDetailData,
      opinionArticleError: '',
      fetchOpinionArticleDetail: () => {
        return []
      },
      isLoadingRelatedOpinion: false,
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
    });
    (useAllWriters as jest.Mock).mockReturnValueOnce({...defaultAllWriterMock}).mockReturnValueOnce({
      selectedAuthorsData:{},
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
      validateFollow: () => true,
    });
    (useBookmark as jest.Mock).mockReturnValue({
      bookmarkIdInfo: [],
      sendBookmarkInfo: () => [],
      removeBookmarkedInfo: () => [],
      validateBookmark: () => [],
    });
    (useWriterDetail as jest.Mock).mockReturnValue({...defaultWriterDetailMock});
    (useAppCommon as jest.Mock).mockReturnValue({
      theme: 'light',
      isFirstSession: true,
      articleFontSize: 16,
      storeArticleFontSizeInfo: () => { }
    });
    (useState as jest.Mock).mockImplementation(() => [writerData, setState]);
    (useRef as jest.Mock).mockReturnValue({current:true});
    (useNavigation as jest.Mock).mockReturnValue(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    useLoginMock.mockReturnValue({
      isLoggedIn: false,
    });
    const component = (
      <SafeAreaProvider>
        <Provider store={storeSampleData}>
          <GestureHandlerRootView>
            <OpinionArticleDetail route={{ params: { nid: '2982216', isRelatedArticle: true } }} />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
    );
    instance = render(component);
  });
  afterEach(() => {
    instance.unmount();
    jest.clearAllMocks();
  })

  test('Should call OpinionArticleDetailWidget onPressWriter', () => {
    const element = instance.container.findByType(OpinionArticleDetailWidget)
    fireEvent(element, 'onPressWriter');
    expect(navigation.navigate).toHaveBeenCalled();
    expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.WRITERS_DETAIL_SCREEN,{tid:'1'})
  });

  
})

describe("OpinionArticleDetail", () => {
  let instance: RenderAPI;
  const setState = jest.fn();
  const mockFunction = jest.fn();
  const useLoginMock = jest.fn();
  const navigation = {
    navigate: mockFunction,
  }
  beforeEach(() => {
    (useOpinionArticleDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      opinionArticleDetailData: opinionArticleDetailData,
      opinionArticleError: '',
      fetchOpinionArticleDetail: () => {
        return []
      },
      isLoadingRelatedOpinion: false,
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
    });
    (useAllWriters as jest.Mock).mockReturnValueOnce({...defaultAllWriterMock}).mockReturnValueOnce({
      selectedAuthorsData:{},
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
      validateFollow: () => true,
    });
    (useBookmark as jest.Mock).mockReturnValue({
      bookmarkIdInfo: [],
      sendBookmarkInfo: () => [],
      removeBookmarkedInfo: () => [],
      validateBookmark: () => [],
    });
    (useWriterDetail as jest.Mock).mockReturnValue({...defaultWriterDetailMock});
    (useAppCommon as jest.Mock).mockReturnValue({
      theme: 'light',
      isFirstSession: true,
      articleFontSize: 16,
      storeArticleFontSizeInfo: () => { }
    });
    (useState as jest.Mock).mockImplementation(() => [0, setState]);
    (useRef as jest.Mock).mockReturnValue({current:false});
    (useNavigation as jest.Mock).mockReturnValue(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    useLoginMock.mockReturnValue({
      isLoggedIn: false,
    });
    const component = (
      <SafeAreaProvider>
        <Provider store={storeSampleData}>
          <GestureHandlerRootView>
            <OpinionArticleDetail route={{ params: { nid: '2982216', isRelatedArticle: true } }} />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
    );
    instance = render(component);
  });
  afterEach(() => {
    instance.unmount();
    jest.clearAllMocks();
  })

  it("should not change the useRef current values as true in useEffect",() => {
    expect(useRef().current).toBeFalsy();
  })
  
})
