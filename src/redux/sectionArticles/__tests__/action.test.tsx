import {
    FETCH_SECTION_ARTICLES,
    FETCH_SECTION_ARTICLES_SUCCESS,
    FETCH_SECTION_ARTICLES_ERROR,
    EMPTY_SECTION_ARTICLES,
  } from '../actionTypes';
  import { fetchSectionArticles,
    fetchSectionArticlesSuccess,
    fetchSectionArticlesFailed,
    emptySectionArticlesData} from '../action'

  describe('<SectionArticleAction', () => {
   
    it('fetch Section Articles', () => {
      const result = fetchSectionArticles({
        sectionId: '',
        page: 1})
      expect(result.type).toEqual(FETCH_SECTION_ARTICLES)
  })

  it('fetch Section Articles', () => {
    const result = emptySectionArticlesData()
    expect(result.type).toEqual(EMPTY_SECTION_ARTICLES)
})
  })