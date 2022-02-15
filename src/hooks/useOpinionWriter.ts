import {useDispatch, useSelector} from 'react-redux';
import {
  getOpinionWriterData,
  getIsLoading,
  getOpinionWriterError,
} from 'src/redux/writers/selectors';
import {fetchOpinionWriter} from 'src/redux/writers/action';
import {OpinionWriterItemType, WritersBodyGet} from 'src/redux/writers/types';

export interface UseOpinionWriterReturn {
  isLoading: boolean;
  opinionWriterData: OpinionWriterItemType[];
  opinionWriterError: string;
  fetchOpinionWriterRequest(payload: WritersBodyGet): void;
}

export const useOpinionWriter = (): UseOpinionWriterReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const opinionWriterData = useSelector(getOpinionWriterData);
  const opinionWriterError = useSelector(getOpinionWriterError);
  const fetchOpinionWriterRequest = (payload: WritersBodyGet) => {
    dispatch(fetchOpinionWriter(payload));
  };
  return {
    isLoading,
    opinionWriterData,
    opinionWriterError,
    fetchOpinionWriterRequest,
  };
};
