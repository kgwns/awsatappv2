import { all, takeLatest } from "redux-saga/effects";
import {
    REQUEST_TICKER_HERO_DATA,
    REQUEST_HERO_AND_TOP_LIST_DATA,
    REQUEST_OPINION_LIST_DATA,
    REQUEST_SECTION_COMBO_ONE,
    REQUEST_SECTION_COMBO_TWO,
    REQUEST_SECTION_COMBO_THREE,
    REQUEST_SECTION_COMBO_FOUR
} from "../actionType";
import articleDetailSaga, {
    fetchTickerAndHeroWidgetData,
    fetchHeroListTopListWidgetData,
    fetchOpinionWidgetData,
    fetchSectionCombo
} from "../sagas";

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

const errorResponse = {
    response: { data: 'Error', status: 500, statusText: 'Error' }
}

describe('<LatestNewsSaga >', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })
    describe('Check Latest news saga method', () => {
        const genObject = articleDetailSaga();

        it('should wait for latest REQUEST_TICKER_HERO_DATA action and call fetchTickerAndHeroWidgetData', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_TICKER_HERO_DATA, fetchTickerAndHeroWidgetData),
                ])
            );
        });
        it('should wait for latest REQUEST_HERO_AND_TOP_LIST_DATA action and call fetchHeroListTopListWidgetData', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_HERO_AND_TOP_LIST_DATA, fetchHeroListTopListWidgetData),
                ])
            );
        });
        it('should wait for latest REQUEST_OPINION_LIST_DATA action and call fetchOpinionWidgetData', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_OPINION_LIST_DATA, fetchOpinionWidgetData),
                ])
            );
        });
        it('should wait for latest REQUEST_SECTION_COMBO_ONE action and call fetchSectionCombo', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_SECTION_COMBO_ONE, fetchSectionCombo),
                ])
            );
        });
        it('should wait for latest REQUEST_SECTION_COMBO_TWO action and call fetchSectionCombo', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_SECTION_COMBO_TWO, fetchSectionCombo),
                ])
            );
        });
        it('should wait for latest REQUEST_SECTION_COMBO_THREE action and call fetchSectionCombo', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_SECTION_COMBO_THREE, fetchSectionCombo),
                ])
            );
        });
        it('should wait for latest REQUEST_SECTION_COMBO_FOUR action and call fetchSectionCombo', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(REQUEST_SECTION_COMBO_FOUR, fetchSectionCombo),
                ])
            );
        });
        it('should be done on next iteration', () => {
            expect(genObject.next().done).toBeTruthy();
        });

        describe('Ticker and Hero Widget', () => {
            it('check fetchTickerAndHeroWidgetData success', () => {
                const genObject = fetchTickerAndHeroWidgetData({
                    type: REQUEST_TICKER_HERO_DATA,
                    payload: {
                        items_per_page: 10, page: 0, offset: 0
                    }
                })
                genObject.next(sampleResponse)
                genObject.next(sampleResponse)
            })

            it('check fetchTickerAndHeroWidgetData failed', () => {
                const genObject = fetchTickerAndHeroWidgetData({
                    type: REQUEST_TICKER_HERO_DATA,
                    payload: {
                        items_per_page: 10, page: 0, offset: 0
                    }
                })
                genObject.next()
                genObject.throw(errorResponse)
            })
        })

        describe('Ticker and HeroList TopList Widget', () => {
            it('check fetchHeroListTopListWidgetData success', () => {
                const genObject = fetchHeroListTopListWidgetData({
                    type: REQUEST_HERO_AND_TOP_LIST_DATA,
                    payload: {
                        items_per_page: 10, page: 0, offset: 0
                    }
                })
                genObject.next(sampleResponse)
                genObject.next(sampleResponse)
            })

            it('check fetchHeroListTopListWidgetData failed', () => {
                const genObject = fetchHeroListTopListWidgetData({
                    type: REQUEST_HERO_AND_TOP_LIST_DATA,
                    payload: {
                        items_per_page: 10, page: 0, offset: 0
                    }
                })
                genObject.next()
                genObject.throw(errorResponse)
            })
        })

    })

    describe('Opinion Widget', () => {
        it('check fetchOpinionWidgetData success', () => {
            const genObject = fetchOpinionWidgetData({
                type: REQUEST_OPINION_LIST_DATA,
                payload: {
                    items_per_page: 10, page: 0, offset: 0
                }
            })
            genObject.next(sampleResponse)
            genObject.next(sampleResponse)
        })

        it('check fetchOpinionWidgetData failed', () => {
            const genObject = fetchOpinionWidgetData({
                type: REQUEST_OPINION_LIST_DATA,
                payload: {
                    items_per_page: 10, page: 0, offset: 0
                }
            })
            genObject.next()
            genObject.throw(errorResponse)
        })
    })

    describe('SectionCombo Widget', () => {
        it('check fetchSectionComboOne success', () => {
            const genObject = fetchSectionCombo({
                type: REQUEST_SECTION_COMBO_ONE,
                payload: {
                    id: 736, items_per_page: 10, page: 0
                }
            })
            genObject.next(sampleResponse)
            genObject.next(sampleResponse)
        })

        it('check fetchSectionComboOne failed', () => {
            const genObject = fetchSectionCombo({
                type: REQUEST_SECTION_COMBO_ONE,
                payload: {
                    id: 736, items_per_page: 10, page: 0
                }
            })
            genObject.next()
            genObject.throw(errorResponse)
        })

        it('check fetchSectionComboTwo success', () => {
            const genObject = fetchSectionCombo({
                type: REQUEST_SECTION_COMBO_TWO,
                payload: {
                    id: 736, items_per_page: 10, page: 0
                }
            })
            genObject.next()

            genObject.next(sampleResponse)
        })

        it('check fetchSectionComboTwo failed', () => {
            const genObject = fetchSectionCombo({
                type: REQUEST_SECTION_COMBO_TWO,
                payload: {
                    id: 736, items_per_page: 10, page: 0
                }
            })
            genObject.next()
            genObject.throw(errorResponse)
        })

        it('check fetchSectionComboThree success', () => {
            const genObject = fetchSectionCombo({
                type: REQUEST_SECTION_COMBO_THREE,
                payload: {
                    id: 736, items_per_page: 10, page: 0
                }
            })
            genObject.next()

            genObject.next(sampleResponse)
        })

        it('check fetchSectionComboThree failed', () => {
            const genObject = fetchSectionCombo({
                type: REQUEST_SECTION_COMBO_THREE,
                payload: {
                    id: 736, items_per_page: 10, page: 0
                }
            })
            genObject.next()
            genObject.throw(errorResponse)
        })

        it('check fetchSectionComboFour success', () => {
            const genObject = fetchSectionCombo({
                type: REQUEST_SECTION_COMBO_FOUR,
                payload: {
                    id: 736, items_per_page: 10, page: 0
                }
            })
            genObject.next()
            genObject.next(sampleResponse)
        })

        it('check fetchSectionComboFour failed', () => {
            const genObject = fetchSectionCombo({
                type: REQUEST_SECTION_COMBO_FOUR,
                payload: {
                    id: 736, items_per_page: 10, page: 0
                }
            })
            genObject.next()
            genObject.throw(errorResponse)
        })
    })
})