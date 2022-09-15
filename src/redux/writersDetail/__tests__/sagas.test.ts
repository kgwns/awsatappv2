import { takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { FETCH_WRITER_DETAIL } from '../actionTypes';
import writerDetailSaga, { fetchWriterDetails } from '../sagas';
import { fetchWriterDetailSuccess } from '../action';
import { fetchWriterDetailInfo } from 'src/services/writerDetailService';
import {
    FetchWriterDetailSuccessPayloadType,
    FetchWriterDetailType
} from '../types';
import { WritersDetailBodyGet } from '../types';

const mockString = 'mockString';

const requestObject: WritersDetailBodyGet = {
    tid: mockString,
};

const requestAction: FetchWriterDetailType = {
    type: FETCH_WRITER_DETAIL,
    payload: requestObject,
};

const reposnseObject: any[] = [];
const errorResponse = {
    response: { data: 'Error', status: 500, statusText: 'Error' },
};

const sucessResponseObject: FetchWriterDetailSuccessPayloadType = {
    writersDetail: reposnseObject,
};

describe('Test writerDetail  saga', () => {
    it('fire on writerDetailSaga', () => {
        testSaga(writerDetailSaga)
            .next()
            .all([takeLatest(FETCH_WRITER_DETAIL, fetchWriterDetails)])
            .finish()
            .isDone();
    });
});

describe('Test WriterDetails success', () => {
    it('fire on FETCH_WRITER_DETAIL', () => {
        testSaga(fetchWriterDetails, requestAction)
            .next()
            .call(fetchWriterDetailInfo, requestObject)
            .next(reposnseObject)
            .put(fetchWriterDetailSuccess(sucessResponseObject))
            .finish()
            .isDone();
    });
    it('check SaveToken success', () => {
        const genObject = fetchWriterDetails({
            type: FETCH_WRITER_DETAIL,
            payload: {
                tid: '12'
            }
        });
        genObject.next();
        genObject.next();
    });
    
    it('check SaveToken success', () => {
        const genObject = fetchWriterDetails(
            {
                type: FETCH_WRITER_DETAIL,
                payload: 
                {
                    tid: '12'
                }
            }
        );
        genObject.next({rows: [
          {
            title: 'mockString',
            nid: 'mockString',
          },
        ],});
        genObject.next({rows: [
          {
            title: 'mockString',
            nid: 'mockString',
          },
        ],});
    });
});

describe('Test WriterDetails  error', () => {
    it('check fetchWriterDetails failed', () => {
        const genObject = fetchWriterDetails({
            type: FETCH_WRITER_DETAIL,
            payload: { tid: '12345' },
        });
        genObject.next();
        genObject.throw(errorResponse);
    });

    it('check fetchWriterDetails failed', () => {
        const genObject = fetchWriterDetails({
            type: FETCH_WRITER_DETAIL,
            payload: { tid: '12345' },
        });
        genObject.next();
        genObject.throw({});
    });
});
