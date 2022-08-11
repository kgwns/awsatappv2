import { useDispatch, useSelector } from "react-redux";
import { WeatherDetailBodyType, WeatherDetailSuccessPayloadType } from "src/redux/weatherDetails/types";
import { WeatherDetail } from "src/redux/weatherDetails/action";
import { getIsLoading, getWeatherDetailError, getWeatherDetailInfo } from "src/redux/weatherDetails/selectors";

export type UseWeatherDetailsReturn = {
    isLoading: boolean;
    fetchWeatherDetailsSuccessInfo: WeatherDetailSuccessPayloadType | null;
    fetchWeatherDetailsErrorInfo: string;
    fetchWeatherDetailsInfo: (payload: WeatherDetailBodyType) => void;
}

export const useWeatherDetails = (): UseWeatherDetailsReturn => {
    const dispatch = useDispatch();

    const isLoading = useSelector(getIsLoading);
    const fetchWeatherDetailsSuccessInfo = useSelector(getWeatherDetailInfo)
    const fetchWeatherDetailsErrorInfo = useSelector(getWeatherDetailError)

    const fetchWeatherDetailsInfo = (payload: WeatherDetailBodyType) => {
        dispatch(WeatherDetail(payload))
    }

    return {
        isLoading,
        fetchWeatherDetailsSuccessInfo,
        fetchWeatherDetailsErrorInfo,
        fetchWeatherDetailsInfo,
    }
}