import {
    EMPTY_WRITER_DETAIL,
  FETCH_WRITER_DETAIL
} from 'src/redux/writersDetail/actionTypes';
import { emptyWriterDataAction, fetchWriterDetail } from '../action';

describe('<WriterDetailAction', () => {

    it('fetch Writer Detail', () => {
        const result = fetchWriterDetail({tid:'mock'})
        expect(result.type).toEqual(FETCH_WRITER_DETAIL)
    })

    it('empty Writer Data Action', () => {
        const result = emptyWriterDataAction()
        expect(result.type).toEqual(EMPTY_WRITER_DETAIL)
    })
}
)