import { useDispatch } from "react-redux"
import { fetchArabicWords } from "../redux/arabicWords/action"
import { FetchArabicWordsPayloadType } from "../redux/arabicWords/types";

export const useFetchArabicData = () => {
    const dispatch = useDispatch();

    const fetchArabicData = (payload:FetchArabicWordsPayloadType) => {
        dispatch(fetchArabicWords(payload));
    }

    return {
        fetchArabicData
    }
}
