import { all, takeLatest } from "redux-saga/effects";
import { OpinionArticleDetailItemType } from "src/redux/opinionArticleDetail/types";
import { REQUEST_ARTICLE_DETAIL, REQUEST_ARTICLE_SECTION, REQUEST_RELATED_ARTICLE, REQUEST_RICH_ARTICLE_CONTENT, REQUEST_RICH_ARTICLE_OPINION, REQUEST_RICH_ARTICLE_READ_ALSO } from "../actionType";
import articleDetailSaga, { fetchArticleDetail, fetchRelatedArticle, fetchArticleSection, getRichReadAlsoInfo, fetchRichHTMLContentBundle, fetchRichHTMLOpinionsBundle, updatedReadAlsoContent, updatedContentBundleContent, updatedOpinionBundle, parseRichArticleReadAlso, parseArticleDetailSuccess } from "../sagas";
import { ArticleDetailDataType, RichHTMLOpinionDataType, RichHTMLType } from "../types";

const data: ArticleDetailDataType = {
    title: 'title',
    body: 'body',
    nid: 'nid',
    image: 'image',
    view_node: 'view_node',
    news_categories: {
        title: 'news_categories_title',
        id: 'news_categories_id',
        url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
        bundle: 'news_categories_bundle',
        name: 'news_categories_name'
    },
    author: 'author',
    tag_topics: {
        id: '1',
        title: 'asd',
        url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
        bundle: 'asd',
        name: 'qsd'
    },
    isBookmarked: false,
    caption: 'asd',
    subtitle: 'asdf',
    jwplayerId: '1',
    created: 'asxdc',
    richHTML: [
        {
            type: RichHTMLType.READ_ALSO,
            data: {
                id: 'example',
                type: 'example',
                bundle: 'example',
                related_content: ['example'],
                title: 'example',
                readAlsoData: ['example', 'example', 'example'],
            }
        },
    ],
}

const dataExample3: ArticleDetailDataType = {
    title: 'title',
    body: 'body',
    nid: 'nid',
    image: 'image',
    view_node: 'view_node',
    news_categories: {
        title: 'news_categories_title',
        id: 'news_categories_id',
        url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
        bundle: 'news_categories_bundle',
        name: 'news_categories_name'
    },
    author: 'author',
    tag_topics: {
        id: '1',
        title: 'asd',
        url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
        bundle: 'asd',
        name: 'qsd'
    },
    isBookmarked: false,
    caption: 'asd',
    subtitle: 'asdf',
    jwplayerId: '1',
    created: 'asxdc',
    richHTML: [
        {
            type: RichHTMLType.OPINION,
            data: {
                id: 'example',
                type: 'example',
                bundle: 'example',
                opinion: '12',
                opinionData: {
                    name: 'example',
                    title: 'example',
                    image: 'example',
                    nid: 'example',
                    writerId: 'example',
                }
            }
        },
    ],
}

const dataExample2: ArticleDetailDataType = {
    title: 'title',
    body: 'body',
    nid: 'nid',
    image: 'image',
    view_node: 'view_node',
    news_categories: {
        title: 'news_categories_title',
        id: 'news_categories_id',
        url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
        bundle: 'news_categories_bundle',
        name: 'news_categories_name'
    },
    author: 'author',
    tag_topics: {
        id: '1',
        title: 'asd',
        url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
        bundle: 'asd',
        name: 'qsd'
    },
    isBookmarked: false,
    caption: 'asd',
    subtitle: 'asdf',
    jwplayerId: '1',
    created: 'asxdc',
    richHTML: [
        {
            type: RichHTMLType.CONTENT,
            data: {
                id: 'example',
                type: 'example',
                bundle: 'example',
                title: 'example',
                content: 'example',
                contentData: {
                    title: 'example',
                    body: 'example',
                    nid: 'example',
                    image: 'example',
                }
            }
        },
    ],
}

const data2: ArticleDetailDataType = {
    title: 'title',
    body: 'body',
    nid: 'nid',
    image: 'image',
    view_node: 'view_node',
    news_categories: {
        title: 'news_categories_title',
        id: 'news_categories_id',
        url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
        bundle: 'news_categories_bundle',
        name: 'news_categories_name'
    },
    author: 'author',
    tag_topics: {
        id: '1',
        title: 'asd',
        url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
        bundle: 'asd',
        name: 'qsd'
    },
    isBookmarked: false,
    caption: 'asd',
    subtitle: 'asdf',
    jwplayerId: '1',
    created: 'asxdc',
    richHTML: undefined
}


const dataRichHtml: RichHTMLOpinionDataType = {
    name: "المتشائمة",
    title: "المتشائمةالمتشائمة",
    image: "المتشائمة",
    nid: "12",
    writerId: "12"
}

const dataRichHtml2: RichHTMLOpinionDataType = {
    name: "المتشائمة",
    title: "المتشائمةالمتشائمة",
    image: "المتشائمة",
    nid: "13",
    writerId: "13"
}

const opinionData: OpinionArticleDetailItemType = {
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
            id: '92597',
            title: 'عثمان ميرغني',
            url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92597',
            bundle: 'writer',
            opinion_writer_photo: 'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/304x292/public/2021/01/13/1375877443597951100.jpg?itok=lW-Sn5Xw',
            langcode: 'Arabic',
            name: 'عثمان ميرغني',
            description: 'ميرغني',
        },
    ],
    isBookmarked: false,
    isFollowed: false
};

const sampleResponse = {
    "rows": [
        {
            "title": "«ما بعد كوفيد ـ 19»... ضرورة بناء نماذج اجتماعية للعالم أكثر إنصافاً",
            "bundle": "article",
            "author_resource": "القاهرة: حمدي عابدين",
            "body_export": "<span class=\"app-body\"><p>دعا الباحثان الهولنديان إيرناني كونتيبللي وسيمونا بيكياو في كتابهما «ما بعد كوفيد - 19» إلى ضرورة إعادة بناء نماذج العالم الاجتماعية فيما بعد الجائحة، وذلك من أجل تحقيق أهداف التنمية المستدامة، وإدراك المسارات المحتملة الجديدة للتنمية القائمة على العوامل البشرية، كما شددا على أهمية تقديم نموذج فلسفة اقتصاد الاكتفاء الذي يستند إلى نهج محوره الإنسان، ويطمح إلى تمكين الأفراد والمجتمعات، وتحقيق التوازن بين التقدم الاقتصادي، والحماية البيئية، والاحتياجات البشرية.<br />وقال الباحثان، وهما عضوان رئيسيان في مبادرة «الاتصال عن بعد من أجل الاستدامة» بهولندا، ويحاضران في مدرسة لاهاي الدولية لإدارة الأعمال إنه «لا جدال أن جائحة (كوفيد - 19) التي تتحكم في العالم بأسره منذ خريف عام 2019 بكل ما تتسبب فيه من عواقب وخيمة، ستترك آثاراً غائرة في ذاكرة التاريخ الحديث، فقد حصدت حتى اليوم أرواح أكثر من مليوني إنسان، ووصل عدد الإصابات نحو 100 مليون، وهو ما يعرض العالم لحالة من الركود الاقتصادي قد تكون أشد وطأة من أزمة ثلاثينات القرن الماضي، وتُقدر خسائرها بثلاثة تريليونات دولار».<br />ويتضمن الكتاب، الذي صدر باللغة الإنجليزية عن مؤسسة إندراسترا جلوبال الأميركية، وقدمت نسخته العربية الباحثة المصرية ريهام صلاح خفاجي - نشرته مكتبة الإسكندرية - ثمانية فصول حدد خلالها المؤلفان أهداف التنمية المستدامة، سعيا إلى وضع سياق لها، مع ربطها بتأثيرات الجائحة وتحدياتها وفلسفة اقتصاد الاكتفاء، ومبادئها وشروطها.</p>\n<p>التعافي الأخضر<br />يذكر الباحثان أن الجائحة كشفت ضعف نماذج الحوكمة العالمية، فيما ساهم استشراء الفقر وهشاشة أنظمة الصحة والتعليم وغياب التعاون الدولي في الإسراع من وتيرة الأزمات، لذا سوف يكون من الصعب توقع أبعاد تلك التغييرات وتأثيرها في أسلوب معيشة البشر. ومن هنا، فإن الجائحة كشفت عن وجود تحديات مشتركة يتوجب على المجتمع الدولي مواجهتها واتخاذ تدابير عالمية من أجل تلبية الاحتياجات الأساسية للأشخاص، وإعادة بناء نماذج للمجتمع الإنساني أكثر إنصافاً وقدرة على الصمود.<br />وركزا على ما سمياه «التعافي الأخضر» كوسيلة لبحث كيفية إعادة بناء النماذج الاجتماعية، والتي يمكنها تعزيز عملية تنفيذ أهداف التنمية للقضاء على الفقر وحماية الكوكب وضمان الرخاء، بدلا من العودة إلى أنماط اجتماعية سابقة قد تجعل العالم أكثر عرضة للأزمات في المستقبل.<br />وقال الباحثان إن دمج البرامج الخضراء ضمن خطط التعافي يمكنه إعادة بناء طرق تشغيل الصناعات بشكل أفضل بعد مرور الجائحة. وذلك باعتماد أساليب مبتكرة كما هو الحال فيما يسمى بنموذج الكعكة المحلاة أو الدونات؛ والذي يضع تصورا لعالم يمكن الناس والكوكب من الازدهار بتوازن قائم على أهداف التنمية المستدامة، والتي تستند على شمول الرؤية في طريقة إعادة تخيل ورسم مستقبل الأماكن التي يعيش فيها البشر. كما أكدا على أن تحسين جهود التعافي يجب أن يستند على مستوى المبادرات الصغيرة ومتوسطة النطاق، وذلك بالتركيز على التغييرات المحتملة في نماذج الإنتاج وسلوك المستهلك عبر مستويات أدنى من الحوكمة والتي تمارس دوراً حاسماً كساحة ديناميكية للابتكار والتجريب. ويمكن اعتبارها مختبرات لإنتاج مخرجات مستدامة ومبتكرة عن طريق نسخها وتكرارها في دوائر اختصاصات تلبي الحاجة إلى الثقة وإلى دعم العلاقة التبادلية لدى المتضررين من الإخفاق الواضح في أداء المؤسسات الدولية والوطنية.</p>\n<p>اقتصاد الاكتفاء<br />وحسب رأي «كونتيبللي» و«بيكياو» سوف تكون فلسفة اقتصاد الاكتفاء نهجاً إنمائياً قادراً على تعزيز جهود التعافي في مرحلة ما بعد الجائحة، ويعد مفهوما التعلُّم والمعرفة، طبقا لرأيهما، ركنين أساسيين من فلسفة اقتصاد الاكتفاء ونهجها الإنمائي، ويهدف إلى تمكين الشعوب والمجتمعات، وتحقيق التوازن بين التقدم الاقتصادي والحماية البيئية، واحتياجات البشر أيضاً، وهو ما يوجب أن تكون الكيانات المحلية؛ مثل القرى، والأحياء ذاتية الاكتفاء نسبيّاً، مع تطبيق شروط المعرفة والفضائل والمبادئ الأخلاقية، والتي تعد بمثابة الأسس النوعية لتنفيذ نموذج إنمائي، يساير الأهداف ويجمع بين التقدم والتوازن.<br />وحول أهداف التنمية المستدامة، يرى الباحثان أن صياغتها يجب أن تكون وفق خطة لتحقيق مستقبل أفضل للجميع، تركز على القضاء على الفقر بجميع أشكاله وأبعاده، وينبغي تطبيقها في الدول الغنية والفقيرة على حد سواء، من أجل تأسيس بُنى تحتية قادرة على الصمود، وجعل المدن والمستوطنات البشرية آمنة وشاملة للجميع وحماية النظم الإيكولوجية البرّية وترميمها وتعزيز استخدامها، وإدارة الغابات على نحو مستدام، ومكافحة التصحر، ووقف تدهور الأراضي وتوفير الوصول إلى العدالة للجميع، وبناء مؤسسات فعالة وخاضعة للمساءلة وشاملة على جميع المستويات، وتعزيز وسائل التنفيذ، وتنشيط الشراكة العالمية.</p>\n<p>التنمية المستدامة<br />وحول الإرهاب وأثره على الخطط الإنمائية، ذكر الباحثان أن نقطة الانطلاق لتحسين مفهوم التنمية البشرية على مستوى الكوكب تأثرت بفعل مجموعة أحداث غيرت الفهم المعتاد للنظام العالمي في سنوات قليلة، ومن بينها الهجمات الإرهابية على أغلب الدول الغربية المتقدمة، وصعود الدول النامية على الساحة السياسة الدولية، والأزمة الاقتصادية التي ضربت العالم قبل 13 عاما، هذا بالإضافة إلى عوامل عالمية هيكلية مثل الأزمة البيئية، التي عزز من ظهورها المشاكل المتعلقة بتغير المناخ والحالات المتزايدة لانعدام المساواة، وأنماط الاستهلاك غير المقيد، على مستوى العالم.<br />وأشار «كونتيبللي» و«بيكياو» إلى أنه رغم الانتقادات الموجهة للأهداف الإنمائية للألفية في ظل هذه الظروف، حول انخفاض قابليتها للتنفيذ ومستوى تأثيرها، فإنها أسست إطار عمل مهمّاً للحوكمة العالمية يتسم بالتعددية الثقافية وتعدد الأجناس، بهدف مواجهة منطق الإقصاء الذي قدمه المشروع الليبرالي الجديد المهيمن على النظام الدولي.<br />وتحدث الباحثان عن حتمية تنمية مفهوم التضامن العالمي بتعزيز الإجراءات التعاونية ضمن عالم مترابط يتجه إلى العولمة، بدلا من الإصرار على العمل في منظومة سياسية قائمة على نظام مبعثر من دول ذات سيادة عاجزة عن التنسيق بين الجهود الرامية إلى مواجهة المخاطر النظامية العالمية. وأشارا إلى أنه من المؤكد أن تنفيذ أهداف التنمية المستدامة سوف يقود العالم في مسار قادر على الصمود وأكثر إنصافاً من أجل مواجهة مخاطر الأمراض المعدية الناشئة، وتغيُّر المناخ، والتدهور البيئي، والفقر الُمدْقع، وغيرها من التحديات التي تقف أمام التعافي في عالم أفضل وأكثر أمناً، من هنا يجب أن يكون تركيز استجابة العالم للجائحة على معالجة العوامل المتسببة في ذلك من خلال استعادة الازدهار، وإعادة هيكلة المجتمع الإنساني في مسار أسلم وأكثر أماناً وإنصافاً.</p>\n</span>",
            "nid_export": "2982461",
            "field_new_issueno_export": "15514",
            "view_node": "http://srpcawsatdev.prod.acquia-sites.com/node/2982461",
            "field_publication_date_export": "2021-05-20T22:05:57+0000",
            "field_image_export": [
                "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/1300xauto/public/2021/05/19/1621360599843676600.jpg?itok=R3hR8_wt"
            ],
            "field_new_photo_export": [
                "/sites/default/files/styles/1300xauto/public/2021/05/19/1621360599843676600.jpg?itok=R3hR8_wt"
            ],
            "field_image": [
                "/sites/default/files/styles/1300xauto/public/2021/05/19/1621360599843676600.jpg?itok=R3hR8_wt"
            ],
            "field_new_photo_titles": [
                "/sites/default/files/styles/1300xauto/public/2021/05/19/1621360599843676600.jpg?itok=R3hR8_wt"
            ],
            "field_news_categories_export": [
                {
                    "id": "32",
                    "title": "كتب",
                    "url": "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/32",
                    "bundle": "news_categories",
                    "name": "كتب"
                },
            ],
            "field_tags_locations_export": [
                {
                    "id": "54486",
                    "title": "العالم",
                    "url": "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/54486",
                    "bundle": "tags_locations",
                    "name": "العالم"
                }
            ],
            "field_tags_topics_export": [
                {
                    "id": "51816",
                    "title": "فيروس كورونا الجديد",
                    "url": "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/51816",
                    "bundle": "tags_topics",
                    "name": "فيروس كورونا الجديد"
                }
            ],
            "field_edition_export": null,
            "field_new_sub_title_export": "اقتصاد الاكتفاء والتعافي الأخضر وتشجيع الابتكار من أهم ركائزها",
            "field_shortened_title_export": null,
            "field_new_resource_export": "القاهرة: حمدي عابدين",
            "field_related_export": [],
            "created_export": "2021-05-19T22:35:47+0000",
            "field_jwplayer_id_export": null
        }
    ],
    "pager": {
        "current_page": null,
        "items_per_page": 1
    }
}

const sampleResponse1 = {
    "rows": [
        {
            "title": "",
            "bundle": "article",
            "author_resource": "القاهرة: حمدي عابدين",
            "body_export": "<span class=\"app-body\"><p>دعا الباحثان الهولنديان إيرناني كونتيبللي وسيمونا بيكياو في كتابهما «ما بعد كوفيد - 19» إلى ضرورة إعادة بناء نماذج العالم الاجتماعية فيما بعد الجائحة، وذلك من أجل تحقيق أهداف التنمية المستدامة، وإدراك المسارات المحتملة الجديدة للتنمية القائمة على العوامل البشرية، كما شددا على أهمية تقديم نموذج فلسفة اقتصاد الاكتفاء الذي يستند إلى نهج محوره الإنسان، ويطمح إلى تمكين الأفراد والمجتمعات، وتحقيق التوازن بين التقدم الاقتصادي، والحماية البيئية، والاحتياجات البشرية.<br />وقال الباحثان، وهما عضوان رئيسيان في مبادرة «الاتصال عن بعد من أجل الاستدامة» بهولندا، ويحاضران في مدرسة لاهاي الدولية لإدارة الأعمال إنه «لا جدال أن جائحة (كوفيد - 19) التي تتحكم في العالم بأسره منذ خريف عام 2019 بكل ما تتسبب فيه من عواقب وخيمة، ستترك آثاراً غائرة في ذاكرة التاريخ الحديث، فقد حصدت حتى اليوم أرواح أكثر من مليوني إنسان، ووصل عدد الإصابات نحو 100 مليون، وهو ما يعرض العالم لحالة من الركود الاقتصادي قد تكون أشد وطأة من أزمة ثلاثينات القرن الماضي، وتُقدر خسائرها بثلاثة تريليونات دولار».<br />ويتضمن الكتاب، الذي صدر باللغة الإنجليزية عن مؤسسة إندراسترا جلوبال الأميركية، وقدمت نسخته العربية الباحثة المصرية ريهام صلاح خفاجي - نشرته مكتبة الإسكندرية - ثمانية فصول حدد خلالها المؤلفان أهداف التنمية المستدامة، سعيا إلى وضع سياق لها، مع ربطها بتأثيرات الجائحة وتحدياتها وفلسفة اقتصاد الاكتفاء، ومبادئها وشروطها.</p>\n<p>التعافي الأخضر<br />يذكر الباحثان أن الجائحة كشفت ضعف نماذج الحوكمة العالمية، فيما ساهم استشراء الفقر وهشاشة أنظمة الصحة والتعليم وغياب التعاون الدولي في الإسراع من وتيرة الأزمات، لذا سوف يكون من الصعب توقع أبعاد تلك التغييرات وتأثيرها في أسلوب معيشة البشر. ومن هنا، فإن الجائحة كشفت عن وجود تحديات مشتركة يتوجب على المجتمع الدولي مواجهتها واتخاذ تدابير عالمية من أجل تلبية الاحتياجات الأساسية للأشخاص، وإعادة بناء نماذج للمجتمع الإنساني أكثر إنصافاً وقدرة على الصمود.<br />وركزا على ما سمياه «التعافي الأخضر» كوسيلة لبحث كيفية إعادة بناء النماذج الاجتماعية، والتي يمكنها تعزيز عملية تنفيذ أهداف التنمية للقضاء على الفقر وحماية الكوكب وضمان الرخاء، بدلا من العودة إلى أنماط اجتماعية سابقة قد تجعل العالم أكثر عرضة للأزمات في المستقبل.<br />وقال الباحثان إن دمج البرامج الخضراء ضمن خطط التعافي يمكنه إعادة بناء طرق تشغيل الصناعات بشكل أفضل بعد مرور الجائحة. وذلك باعتماد أساليب مبتكرة كما هو الحال فيما يسمى بنموذج الكعكة المحلاة أو الدونات؛ والذي يضع تصورا لعالم يمكن الناس والكوكب من الازدهار بتوازن قائم على أهداف التنمية المستدامة، والتي تستند على شمول الرؤية في طريقة إعادة تخيل ورسم مستقبل الأماكن التي يعيش فيها البشر. كما أكدا على أن تحسين جهود التعافي يجب أن يستند على مستوى المبادرات الصغيرة ومتوسطة النطاق، وذلك بالتركيز على التغييرات المحتملة في نماذج الإنتاج وسلوك المستهلك عبر مستويات أدنى من الحوكمة والتي تمارس دوراً حاسماً كساحة ديناميكية للابتكار والتجريب. ويمكن اعتبارها مختبرات لإنتاج مخرجات مستدامة ومبتكرة عن طريق نسخها وتكرارها في دوائر اختصاصات تلبي الحاجة إلى الثقة وإلى دعم العلاقة التبادلية لدى المتضررين من الإخفاق الواضح في أداء المؤسسات الدولية والوطنية.</p>\n<p>اقتصاد الاكتفاء<br />وحسب رأي «كونتيبللي» و«بيكياو» سوف تكون فلسفة اقتصاد الاكتفاء نهجاً إنمائياً قادراً على تعزيز جهود التعافي في مرحلة ما بعد الجائحة، ويعد مفهوما التعلُّم والمعرفة، طبقا لرأيهما، ركنين أساسيين من فلسفة اقتصاد الاكتفاء ونهجها الإنمائي، ويهدف إلى تمكين الشعوب والمجتمعات، وتحقيق التوازن بين التقدم الاقتصادي والحماية البيئية، واحتياجات البشر أيضاً، وهو ما يوجب أن تكون الكيانات المحلية؛ مثل القرى، والأحياء ذاتية الاكتفاء نسبيّاً، مع تطبيق شروط المعرفة والفضائل والمبادئ الأخلاقية، والتي تعد بمثابة الأسس النوعية لتنفيذ نموذج إنمائي، يساير الأهداف ويجمع بين التقدم والتوازن.<br />وحول أهداف التنمية المستدامة، يرى الباحثان أن صياغتها يجب أن تكون وفق خطة لتحقيق مستقبل أفضل للجميع، تركز على القضاء على الفقر بجميع أشكاله وأبعاده، وينبغي تطبيقها في الدول الغنية والفقيرة على حد سواء، من أجل تأسيس بُنى تحتية قادرة على الصمود، وجعل المدن والمستوطنات البشرية آمنة وشاملة للجميع وحماية النظم الإيكولوجية البرّية وترميمها وتعزيز استخدامها، وإدارة الغابات على نحو مستدام، ومكافحة التصحر، ووقف تدهور الأراضي وتوفير الوصول إلى العدالة للجميع، وبناء مؤسسات فعالة وخاضعة للمساءلة وشاملة على جميع المستويات، وتعزيز وسائل التنفيذ، وتنشيط الشراكة العالمية.</p>\n<p>التنمية المستدامة<br />وحول الإرهاب وأثره على الخطط الإنمائية، ذكر الباحثان أن نقطة الانطلاق لتحسين مفهوم التنمية البشرية على مستوى الكوكب تأثرت بفعل مجموعة أحداث غيرت الفهم المعتاد للنظام العالمي في سنوات قليلة، ومن بينها الهجمات الإرهابية على أغلب الدول الغربية المتقدمة، وصعود الدول النامية على الساحة السياسة الدولية، والأزمة الاقتصادية التي ضربت العالم قبل 13 عاما، هذا بالإضافة إلى عوامل عالمية هيكلية مثل الأزمة البيئية، التي عزز من ظهورها المشاكل المتعلقة بتغير المناخ والحالات المتزايدة لانعدام المساواة، وأنماط الاستهلاك غير المقيد، على مستوى العالم.<br />وأشار «كونتيبللي» و«بيكياو» إلى أنه رغم الانتقادات الموجهة للأهداف الإنمائية للألفية في ظل هذه الظروف، حول انخفاض قابليتها للتنفيذ ومستوى تأثيرها، فإنها أسست إطار عمل مهمّاً للحوكمة العالمية يتسم بالتعددية الثقافية وتعدد الأجناس، بهدف مواجهة منطق الإقصاء الذي قدمه المشروع الليبرالي الجديد المهيمن على النظام الدولي.<br />وتحدث الباحثان عن حتمية تنمية مفهوم التضامن العالمي بتعزيز الإجراءات التعاونية ضمن عالم مترابط يتجه إلى العولمة، بدلا من الإصرار على العمل في منظومة سياسية قائمة على نظام مبعثر من دول ذات سيادة عاجزة عن التنسيق بين الجهود الرامية إلى مواجهة المخاطر النظامية العالمية. وأشارا إلى أنه من المؤكد أن تنفيذ أهداف التنمية المستدامة سوف يقود العالم في مسار قادر على الصمود وأكثر إنصافاً من أجل مواجهة مخاطر الأمراض المعدية الناشئة، وتغيُّر المناخ، والتدهور البيئي، والفقر الُمدْقع، وغيرها من التحديات التي تقف أمام التعافي في عالم أفضل وأكثر أمناً، من هنا يجب أن يكون تركيز استجابة العالم للجائحة على معالجة العوامل المتسببة في ذلك من خلال استعادة الازدهار، وإعادة هيكلة المجتمع الإنساني في مسار أسلم وأكثر أماناً وإنصافاً.</p>\n</span>",
            "nid_export": "2982461",
            "field_new_issueno_export": "15514",
            "view_node": "http://srpcawsatdev.prod.acquia-sites.com/node/2982461",
            "field_publication_date_export": "2021-05-20T22:05:57+0000",
            "field_image_export": [
                "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/1300xauto/public/2021/05/19/1621360599843676600.jpg?itok=R3hR8_wt"
            ],
            "field_new_photo_export": [
                "/sites/default/files/styles/1300xauto/public/2021/05/19/1621360599843676600.jpg?itok=R3hR8_wt"
            ],
            "field_news_categories_export": [],
            "field_tags_locations_export": [
                {
                    "id": "54486",
                    "title": "العالم",
                    "url": "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/54486",
                    "bundle": "tags_locations",
                    "name": "العالم"
                }
            ],
            "field_tags_topics_export": [],
            "field_edition_export": null,
            "field_new_sub_title_export": "اقتصاد الاكتفاء والتعافي الأخضر وتشجيع الابتكار من أهم ركائزها",
            "field_shortened_title_export": null,
            "field_new_resource_export": "القاهرة: حمدي عابدين",
            "field_related_export": [],
            "created_export": "2021-05-19T22:35:47+0000",
            "field_jwplayer_id_export": null
        }
    ],
    "pager": {
        "current_page": null,
        "items_per_page": 1
    }
}

const quoteResponse = { "articleDetailData": [{ "author": "", "body": undefined, "caption": "", "created": undefined, "displayType": "", "image": "", "journalistCity": undefined, "journalistId": undefined, "journalistName": undefined, "jwplayerId": undefined, "link_node": undefined,"news_categories": undefined, "nid": undefined, "richHTML": [{ "data": { "bundle": "quote" }, "type": "quote" }], "scribbleLiveId": undefined, "shortUrl": undefined, "subtitle": "", "tag_topics": undefined, "title": "", "view_node": undefined, "publishedDate": undefined, "tagTopicsList": ""  }], "pager": {} }
const contentResponse = { "articleDetailData": [{ "author": "", "body": undefined, "caption": "", "created": undefined, "displayType": "", "image": "", "journalistCity": undefined, "journalistId": undefined, "journalistName": undefined, "jwplayerId": undefined,  "link_node": undefined,"news_categories": undefined, "nid": undefined, "richHTML": [{ "data": { "bundle": "content" }, "type": "content" }], "scribbleLiveId": undefined, "shortUrl": undefined, "subtitle": "", "tag_topics": undefined, "title": "", "view_node": undefined, "publishedDate": undefined, "tagTopicsList": ""  }], "pager": {} }
const descriptionResponse = { "articleDetailData": [{ "author": "", "body": undefined, "caption": "", "created": undefined, "displayType": "", "image": "", "journalistCity": undefined, "journalistId": undefined, "journalistName": undefined, "jwplayerId": undefined, "link_node": undefined, "news_categories": undefined, "nid": undefined, "richHTML": [{ "data": { "bundle": "description" }, "type": "description" }], "scribbleLiveId": undefined, "shortUrl": undefined, "subtitle": "", "tag_topics": undefined, "title": "", "view_node": undefined, "publishedDate": undefined, "tagTopicsList": "" }], "pager": {} }
const opinionResponse = { "articleDetailData": [{ "author": "", "body": undefined, "caption": "", "created": undefined,  "displayType": "", "image": "", "journalistCity": undefined, "journalistId": undefined, "journalistName": undefined, "jwplayerId": undefined, "link_node": undefined,"news_categories": undefined, "nid": undefined, "richHTML": [{ "data": { "bundle": "opinion" }, "type": "opinion" }], "scribbleLiveId": undefined, "shortUrl": undefined, "subtitle": "", "tag_topics": undefined, "title": "", "view_node": undefined, "publishedDate": undefined, "tagTopicsList": ""  }], "pager": {} }
const readAlsoResponse = { "articleDetailData": [{ "author": "", "body": undefined, "caption": "", "created": undefined, "displayType": "","image": "", "journalistCity": undefined, "journalistId": undefined, "journalistName": undefined, "jwplayerId": undefined, "link_node": undefined, "news_categories": undefined, "nid": undefined, "richHTML": [{ "data": { "bundle": "read_also" }, "type": "read_also" }], "scribbleLiveId": undefined, "shortUrl": undefined, "subtitle": "", "tag_topics": undefined, "title": "", "view_node": undefined, "publishedDate": undefined, "tagTopicsList": ""  }], "pager": {} }
const numbersResponse = { "articleDetailData": [{ "author": "", "body": undefined, "caption": "", "created": undefined, "displayType": "", "image": "", "journalistCity": undefined, "journalistId": undefined, "journalistName": undefined, "jwplayerId": undefined, "link_node": undefined, "news_categories": undefined, "nid": undefined, "richHTML": [{ "data": { "bundle": "numbers" }, "type": "numbers" }], "scribbleLiveId": undefined, "shortUrl": undefined, "subtitle": "", "tag_topics": undefined, "title": "", "view_node": undefined, "publishedDate": undefined, "tagTopicsList": ""  }], "pager": {} }
const defaultResponse = { "articleDetailData": [{ "author": "", "body": undefined, "caption": "", "created": undefined, "displayType": "", "image": "", "journalistCity": undefined, "journalistId": undefined, "journalistName": undefined, "jwplayerId": undefined, "link_node": undefined, "news_categories": undefined, "nid": undefined, "richHTML": [null], "scribbleLiveId": undefined, "shortUrl": undefined, "subtitle": "", "tag_topics": undefined, "title": "", "view_node": undefined, "publishedDate": undefined, "tagTopicsList": ""  }], "pager": {} }

const HTMLOpinionsData = {
    opinionData: {}
}

const errorResponse = {
    response: { data: 'Error', status: 500, statusText: 'Error' }
}

describe('<Article Detail Saga >', () => {
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        })
    })
    describe('Check ArticleDetail sage method', () => {
        const genObject = articleDetailSaga();

        it('should wait for latest REQUEST_ARTICLE_DETAIL action and call fetchArticleDetail', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_ARTICLE_DETAIL, fetchArticleDetail),
                    takeLatest(REQUEST_RELATED_ARTICLE, fetchRelatedArticle),
                    takeLatest(REQUEST_ARTICLE_SECTION, fetchArticleSection),
                    takeLatest(REQUEST_RICH_ARTICLE_READ_ALSO, getRichReadAlsoInfo),
                ])
            );
        });

        it('should be done on next iteration', () => {
            expect(genObject.next().done).toBeTruthy();
        });
    })


    describe('ArticleDetail', () => {
        it('check fetchHeroListTopListWidgetData success', () => {
            const genObject = fetchArticleDetail({
                type: REQUEST_ARTICLE_DETAIL,
                payload: {
                    nid: 12345
                }
            })
            genObject.next(sampleResponse)
            genObject.next(sampleResponse)
        })

        it('check fetchHeroListTopListWidgetData success', () => {
            const genObject = fetchArticleDetail({
                type: REQUEST_ARTICLE_DETAIL,
                payload: {
                    nid: 12345
                }
            })
            genObject.next()
            genObject.next()
        })

        it('check fetchHeroListTopListWidgetData success', () => {
            const genObject = fetchArticleDetail({
                type: REQUEST_ARTICLE_DETAIL,
                payload: {
                    nid: 12345
                }
            })
            genObject.next({ rows: [] })
            genObject.next({ rows: [] })
        })

        it('check fetchHeroListTopListWidgetData failed', () => {
            const genObject = fetchArticleDetail({
                type: REQUEST_ARTICLE_DETAIL,
                payload: {
                    nid: 12345
                }
            })
            genObject.next()
            genObject.throw(errorResponse)
        })

        it('check fetchHeroListTopListWidgetData failed', () => {
            const genObject = fetchArticleDetail({
                type: REQUEST_ARTICLE_DETAIL,
                payload: {
                    nid: 12345
                }
            })
            genObject.next()
            genObject.throw({})
        })
    })

    describe('Related ArticleDetail', () => {
        it('check fetchHeroListTopListWidgetData success', () => {
            const genObject = fetchRelatedArticle({
                type: REQUEST_RELATED_ARTICLE,
                payload: {
                    tid: 12345
                }
            })
            genObject.next(sampleResponse)
            genObject.next(sampleResponse)
        })

        it('check fetchHeroListTopListWidgetData success', () => {
            const genObject = fetchRelatedArticle({
                type: REQUEST_RELATED_ARTICLE,
                payload: {
                    tid: 12345
                }
            })
            genObject.next()
            genObject.next()
        })

        it('check fetchHeroListTopListWidgetData success', () => {
            const genObject = fetchRelatedArticle({
                type: REQUEST_RELATED_ARTICLE,
                payload: {
                    tid: 12345
                }
            })
            genObject.next({ rows: [] })
            genObject.next({ rows: [] })
        })

        it('check fetchHeroListTopListWidgetData failed', () => {
            const genObject = fetchRelatedArticle({
                type: REQUEST_RELATED_ARTICLE,
                payload: {
                    tid: 12345
                }
            })
            genObject.next()
            genObject.throw(errorResponse)
        })

        it('check fetchHeroListTopListWidgetData failed', () => {
            const genObject = fetchRelatedArticle({
                type: REQUEST_RELATED_ARTICLE,
                payload: {
                    tid: 12345
                }
            })
            genObject.next()
            genObject.throw({})
        })
    })

    describe('Related fetchArticleSection', () => {
        it('check fetchArticleSection success', () => {
            const genObject = fetchArticleSection({
                type: REQUEST_ARTICLE_SECTION,
                payload: {
                    id: 12,
                    page: 1,
                    items_per_page: 10,
                    current_nid: 1,
                }
            })
            genObject.next(sampleResponse)
            genObject.next(sampleResponse)
        })

        it('check fetchArticleSection success', () => {
            const genObject = fetchArticleSection({
                type: REQUEST_ARTICLE_SECTION,
                payload: {
                    id: 12,
                    page: 1,
                    items_per_page: 10,
                    current_nid: 1,
                }
            })
            genObject.next(sampleResponse1)
            genObject.next(sampleResponse1)
        })

        it('check fetchArticleSection success', () => {
            const genObject = fetchArticleSection({
                type: REQUEST_ARTICLE_SECTION,
                payload: {
                    id: 12,
                    page: 1,
                    items_per_page: 10,
                    current_nid: 1,
                }
            })
            genObject.next()
            genObject.next()
        })

        it('check fetchArticleSection success', () => {
            const genObject = fetchArticleSection({
                type: REQUEST_ARTICLE_SECTION,
                payload: {
                    id: 12,
                    page: 1,
                    items_per_page: 10,
                    current_nid: 1,
                }
            })
            genObject.next({ rows: [] })
            genObject.next({ rows: [] })
        })

        it('check fetchArticleSection failed', () => {
            const genObject = fetchArticleSection({
                type: REQUEST_ARTICLE_SECTION,
                payload: {
                    id: 12,
                    page: 1,
                    items_per_page: 10,
                    current_nid: 1,
                }
            })
            genObject.next()
            genObject.throw(errorResponse)
        })

        it('check fetchArticleSection failed', () => {
            const genObject = fetchArticleSection({
                type: REQUEST_ARTICLE_SECTION,
                payload: {
                    id: 12,
                    page: 1,
                    items_per_page: 10,
                    current_nid: 1,
                }
            })
            genObject.next()
            genObject.throw({})
        })
    })

    describe('Related getRichReadAlsoInfo', () => {
        it('check getRichReadAlsoInfo success', () => {
            const genObject = getRichReadAlsoInfo({
                type: REQUEST_ARTICLE_SECTION,
                payload: {
                    id: 12,
                    page: 1,
                    items_per_page: 10,
                    current_nid: 1,
                }
            })
            genObject.next(sampleResponse)
            genObject.next(sampleResponse)
        })


        it('check getRichReadAlsoInfo failed', () => {
            const genObject = getRichReadAlsoInfo({
                type: REQUEST_ARTICLE_SECTION,
                payload: {
                    id: 12,
                    page: 1,
                    items_per_page: 10,
                    current_nid: 1,
                }
            })
            genObject.next()
            genObject.throw(errorResponse)
        })

        it('check getRichReadAlsoInfo failed', () => {
            const genObject = getRichReadAlsoInfo({
                type: REQUEST_ARTICLE_SECTION,
                payload: {
                    id: 12,
                    page: 1,
                    items_per_page: 10,
                    current_nid: 1,
                }
            })
            genObject.next()
            genObject.throw({})
        })
    })

    describe('Related fetchRichHTMLContentBundle', () => {
        it('check fetchRichHTMLContentBundle success', () => {
            const genObject = fetchRichHTMLContentBundle({
                type: REQUEST_RICH_ARTICLE_CONTENT,
                payload: {
                    nid: 12
                }
            })
            genObject.next(sampleResponse)
            genObject.next(sampleResponse)
        })

        it('check fetchRichHTMLContentBundle success', () => {
            const genObject = fetchRichHTMLContentBundle({
                type: REQUEST_RICH_ARTICLE_CONTENT,
                payload: {
                    nid: 12
                }
            })
            genObject.next(sampleResponse1)
            genObject.next(sampleResponse1)
        })

        it('check fetchRichHTMLContentBundle success', () => {
            const genObject = fetchRichHTMLContentBundle({
                type: REQUEST_RICH_ARTICLE_CONTENT,
                payload: {
                    nid: 12
                }
            })
            genObject.next()
            genObject.next()
        })

        it('check fetchRichHTMLContentBundle success', () => {
            const genObject = fetchRichHTMLContentBundle({
                type: REQUEST_RICH_ARTICLE_CONTENT,
                payload: {
                    nid: 12
                }
            })
            genObject.next({ rows: [] })
            genObject.next({ rows: [] })
        })


        it('check fetchRichHTMLContentBundle failed', () => {
            const genObject = fetchRichHTMLContentBundle({
                type: REQUEST_RICH_ARTICLE_CONTENT,
                payload: {
                    nid: 12
                }
            })
            genObject.next()
            genObject.throw(errorResponse)
        })

        it('check fetchRichHTMLContentBundle failed', () => {
            const genObject = fetchRichHTMLContentBundle({
                type: REQUEST_RICH_ARTICLE_CONTENT,
                payload: {
                    nid: 12
                }
            })
            genObject.next()
            genObject.throw({})
        })
    })

    describe('Related fetchRichHTMLOpinionsBundle', () => {
        it('check fetchRichHTMLOpinionsBundle success', () => {
            const genObject = fetchRichHTMLOpinionsBundle({
                type: REQUEST_RICH_ARTICLE_OPINION,
                payload: {
                    nid: 12
                }
            })
            genObject.next(opinionData)
            genObject.next(opinionData)
        })

        it('check fetchRichHTMLOpinionsBundle success', () => {
            const genObject = fetchRichHTMLOpinionsBundle({
                type: REQUEST_RICH_ARTICLE_OPINION,
                payload: {
                    nid: 12
                }
            })
            genObject.next(HTMLOpinionsData)
            genObject.next(HTMLOpinionsData)
        })

        it('check fetchRichHTMLOpinionsBundle success', () => {
            const genObject = fetchRichHTMLOpinionsBundle({
                type: REQUEST_RICH_ARTICLE_OPINION,
                payload: {
                    nid: 12
                }
            })
            genObject.next(sampleResponse)
            genObject.next(sampleResponse)
        })


        it('check fetchRichHTMLOpinionsBundle failed', () => {
            const genObject = fetchRichHTMLOpinionsBundle({
                type: REQUEST_RICH_ARTICLE_OPINION,
                payload: {
                    nid: 12
                }
            })
            genObject.next()
            genObject.throw(errorResponse)
        })

        it('check fetchRichHTMLOpinionsBundle failed', () => {
            const genObject = fetchRichHTMLOpinionsBundle({
                type: REQUEST_RICH_ARTICLE_OPINION,
                payload: {
                    nid: 12
                }
            })
            genObject.next()
            genObject.throw({})
        })
    })

    describe('Test exported functions', () => {
        it('Test updatedReadAlsoContent', () => {
            expect(updatedReadAlsoContent(data, [data])).toBeTruthy();
        });

        it('Test updatedReadAlsoContent', () => {
            expect(updatedReadAlsoContent(dataExample2, [dataExample2])).toBeTruthy();
        });

        it('Test updatedReadAlsoContent', () => {
            expect(updatedReadAlsoContent(data2, [dataExample2])).toBeTruthy();
        });

        it('Test updatedReadAlsoContent', () => {
            expect(updatedReadAlsoContent(data2, [])).toBeTruthy();
        });

        it('Test updatedContentBundleContent', () => {
            expect(updatedContentBundleContent(dataExample2, [dataExample2])).toBeTruthy();
        });

        it('Test updatedContentBundleContent', () => {
            expect(updatedContentBundleContent(data, [data])).toBeTruthy();
        });

        it('Test updatedContentBundleContent', () => {
            expect(updatedContentBundleContent(data2, [data])).toBeTruthy();
        });

        it('Test updatedContentBundleContent', () => {
            expect(updatedContentBundleContent(dataExample2, [])).toBeTruthy();
        });

        it('Test updatedOpinionBundle', () => {
            expect(updatedOpinionBundle(dataExample3, [dataRichHtml])).toBeTruthy();
        });

        it('Test updatedOpinionBundle', () => {
            expect(updatedOpinionBundle(dataExample3, [dataRichHtml])).toBeTruthy();
        });

        it('Test updatedOpinionBundle', () => {
            expect(updatedOpinionBundle(data2, [dataRichHtml])).toBeTruthy();
        });

        it('Test updatedOpinionBundle', () => {
            expect(updatedOpinionBundle(dataExample3, [dataRichHtml2])).toBeTruthy();
        });

        it('Test updatedOpinionBundle', () => {
            expect(updatedOpinionBundle(dataExample2, [])).toBeTruthy();
        });

        it('Test parseRichArticleReadAlso', () => {
            expect(parseRichArticleReadAlso([data])).toBeTruthy();
        });

        it("Test parseArticleDetailSuccess passing quote type", () => {
            const res = parseArticleDetailSuccess({
                rows: [{
                    field_paragraph_export: [{
                        bundle: RichHTMLType.QUOTE
                    }]
                }]
            })
            expect(res).toEqual(quoteResponse);
        })

        it("Test parseArticleDetailSuccess passing content type", () => {
            const res = parseArticleDetailSuccess({
                rows: [{
                    field_paragraph_export: [{
                        bundle: RichHTMLType.CONTENT
                    }]
                }]
            })
            expect(res).toEqual(contentResponse);
        })

        it("Test parseArticleDetailSuccess passing description type", () => {
            const res = parseArticleDetailSuccess({
                rows: [{
                    field_paragraph_export: [{
                        bundle: RichHTMLType.DESCRIPTION
                    }]
                }]
            })
            expect(res).toEqual(descriptionResponse);
        })

        it("Test parseArticleDetailSuccess passing content type", () => {
            const res = parseArticleDetailSuccess({
                rows: [{
                    field_paragraph_export: [{
                        bundle: RichHTMLType.OPINION
                    }]
                }]
            })
            expect(res).toEqual(opinionResponse);
        })

        it("Test parseArticleDetailSuccess passing content type", () => {
            const res = parseArticleDetailSuccess({
                rows: [{
                    field_paragraph_export: [{
                        bundle: RichHTMLType.READ_ALSO
                    }]
                }]
            })
            expect(res).toEqual(readAlsoResponse);
        })

        it("Test parseArticleDetailSuccess passing content type", () => {
            const res = parseArticleDetailSuccess({
                rows: [{
                    field_paragraph_export: [{
                        bundle: RichHTMLType.NUMBERS
                    }]
                }]
            })
            expect(res).toEqual(numbersResponse);
        })

        it("Test parseArticleDetailSuccess passing content type", () => {
            const res = parseArticleDetailSuccess({
                rows: [{
                    field_paragraph_export: [{
                        bundle: 'default'
                    }]
                }]
            })
            expect(res).toEqual(defaultResponse);
        })

    });
})