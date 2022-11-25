import { useDispatch } from "react-redux"
import { fetchArabicWords } from "../redux/arabicWords/action";
import { fetchArabicWordsPayloadType } from "~/redux/arabicWords/types";

export const useFetchArabicData = () => {
    const dispatch = useDispatch();

    const fetchArabicData = (payload:fetchArabicWordsPayloadType) => {
        dispatch(fetchArabicWords(payload));
    }

    return {
        fetchArabicData
    }
}