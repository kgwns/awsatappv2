import { useDispatch, useSelector } from 'react-redux';
import { getIsLoading, getWriterDetail, getWriterDetailError } from 'src/redux/writersDetail/selectors';
import { emptyWriterDataAction, fetchWriterDetail } from 'src/redux/writersDetail/action';
import { WriterDetailDataType,WritersDetailBodyGet } from 'src/redux/writersDetail/types';


export interface UseWriterDetailReturn {
    isLoading: boolean;
    writerDetailData: WriterDetailDataType[];
    writerDetailError: string;
    getWriterDetailData(payload: WritersDetailBodyGet): void
    emptyWriterDetailData(): void
}

export const useWriterDetail = (): UseWriterDetailReturn => {
    const dispatch = useDispatch();

    const isLoading = useSelector(getIsLoading)
    const writerDetailData = useSelector(getWriterDetail)
    const writerDetailError = useSelector(getWriterDetailError)

    const getWriterDetailData = (payload: WritersDetailBodyGet) => {
        dispatch(fetchWriterDetail(payload))
    }

    const emptyWriterDetailData = () => {
        dispatch(emptyWriterDataAction())
    }

    return {
        isLoading,
        writerDetailData,
        writerDetailError,
        getWriterDetailData,
        emptyWriterDetailData
    };
};
