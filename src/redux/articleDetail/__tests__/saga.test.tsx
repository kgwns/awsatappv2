import { all, takeLatest } from "redux-saga/effects";
import { EMPTY_DATA, REQUEST_ARTICLE_DETAIL, REQUEST_ARTICLE_SECTION, REQUEST_RELATED_ARTICLE, REQUEST_RICH_ARTICLE_CONTENT, REQUEST_RICH_ARTICLE_OPINION, REQUEST_RICH_ARTICLE_READ_ALSO } from "../actionType";
import articleDetailSaga, { fetchArticleDetail, fetchRelatedArticle, emptyData, fetchArticleSection, getRichReadAlsoInfo, fetchRichHTMLContentBundle, fetchRichHTMLOpinionsBundle } from "../sagas";

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
            "field_news_categories_export": {
                "id": "32",
                "title": "كتب",
                "url": "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/32",
                "bundle": "news_categories",
                "name": "كتب"
            },
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

const HTMLOpinionsData = {
    opinionData: {}
}

const errorResponse = {
    response: { data: 'Error', status: 500, statusText: 'Error' }
}

describe('<Article Detail Saga >', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })
    describe('Check ArticleDetail sage method', () => {
        const genObject = articleDetailSaga();

        it('should wait for latest REQUEST_ARTICLE_DETAIL action and call fetchArticleDetail', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_ARTICLE_DETAIL, fetchArticleDetail),
                    takeLatest(REQUEST_RELATED_ARTICLE, fetchRelatedArticle),
                    takeLatest(REQUEST_ARTICLE_SECTION,fetchArticleSection),
                    takeLatest(EMPTY_DATA, emptyData),
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
    })

    describe('Related fetchArticleSection', () => {
        it('check fetchArticleSection success', () => {
            const genObject = fetchArticleSection({
                type: REQUEST_ARTICLE_SECTION,
                payload: {
                    id: 12,
                    page: 1,
                    items_per_page:10,
                    current_nid: 1,
                }
            })
            genObject.next(sampleResponse)
            genObject.next(sampleResponse)
        })


        it('check fetchArticleSection failed', () => {
            const genObject = fetchArticleSection({
                type: REQUEST_ARTICLE_SECTION,
                payload: {
                    id: 12,
                    page: 1,
                    items_per_page:10,
                    current_nid: 1,
                }
            })
            genObject.next()
            genObject.throw(errorResponse)
        })
    })

    describe('Related getRichReadAlsoInfo', () => {
        it('check getRichReadAlsoInfo success', () => {
            const genObject = getRichReadAlsoInfo({
                type: REQUEST_ARTICLE_SECTION,
                payload: {
                    id: 12,
                    page: 1,
                    items_per_page:10,
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
                    items_per_page:10,
                    current_nid: 1,
                }
            })
            genObject.next()
            genObject.throw(errorResponse)
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
    })

    describe('Related fetchRichHTMLOpinionsBundle', () => {
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
    })

    describe('Test emptyData', () => {
        it('check emptyData success', () => {
          const genObject = emptyData();
          genObject.next();
          genObject.next();
        });
      });
})