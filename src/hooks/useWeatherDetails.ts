import { useDispatch, useSelector } from "react-redux";
import { WeatherDetailBodyType, WeatherDetailSuccessPayloadType, WeatherDetailVisibilitySuccessPayloadType } from "src/redux/weatherDetails/types";
import { WeatherDetail, WeatherDetailVisibility } from "src/redux/weatherDetails/action";
import { getIsLoading, getWeatherDetailError, getWeatherDetailInfo, getWeatherDetailVisibilityInfo } from "src/redux/weatherDetails/selectors";

export type UseWeatherDetailsReturn = {
    isLoading: boolean;
    fetchWeatherDetailsSuccessInfo: WeatherDetailSuccessPayloadType | null;
    fetchWeatherDetailsVisibilitySuccessInfo: WeatherDetailVisibilitySuccessPayloadType | null;
    fetchWeatherDetailsErrorInfo: string;
    fetchWeatherDetailsInfo: (payload: WeatherDetailBodyType) => void;
    fetchWeatherDetailsVisibilityInfo: (payload: WeatherDetailBodyType) => void;
}

export const useWeatherDetails = (): UseWeatherDetailsReturn => {
    const dispatch = useDispatch();

    const isLoading = useSelector(getIsLoading);
    const fetchWeatherDetailsSuccessInfo = useSelector(getWeatherDetailInfo)
    const fetchWeatherDetailsVisibilitySuccessInfo = useSelector(getWeatherDetailVisibilityInfo)
    const fetchWeatherDetailsErrorInfo = useSelector(getWeatherDetailError)

    const fetchWeatherDetailsInfo = (payload: WeatherDetailBodyType) => {
        dispatch(WeatherDetail(payload))
    }

    const fetchWeatherDetailsVisibilityInfo = (payload: WeatherDetailBodyType) => {
        dispatch(WeatherDetailVisibility(payload))
    }

    return {
        isLoading,
        fetchWeatherDetailsSuccessInfo,
        fetchWeatherDetailsVisibilitySuccessInfo,
        fetchWeatherDetailsErrorInfo,
        fetchWeatherDetailsInfo,
        fetchWeatherDetailsVisibilityInfo
    }
}
