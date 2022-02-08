import { Alert, ColorSchemeName } from "react-native"
import { Theme } from "../../redux/appCommon/types"
import { DEFAULT_ALERT_MESSAGE, DEFAULT_ALERT_TITLE } from "../../constants/SharedConstants"
import { Edge } from "react-native-safe-area-context";
import { BASE_URL } from "src/services/apiUrls";

export interface CustomAlertProps {
    title?: string,
    message?: string,
    delay?: number
}

export const CustomAlert = ({ title = DEFAULT_ALERT_TITLE, message = DEFAULT_ALERT_MESSAGE, delay = 0 }: CustomAlertProps) => {
    setTimeout(() => {
        Alert.alert(title, message)
    }, delay)
}

export const isDarkTheme = (colorScheme: ColorSchemeName) => {
    return colorScheme == Theme.DARK
}

export const testProps = (testID: string | undefined) => {
    return { testID: testID, accessibilityLabel: testID }
}

export const horizontalEdge: Edge[] = ['left', 'right']

export const getImageUrl = (imageURL: string) => {
    return BASE_URL + imageURL;
}

export const decodeHTMLTags = (description: string) => {
    const regex = /(<([^>]+)>)/ig; // to find the html tags in the description ex: <p>, <br>, etc.,   
    return description ? description.replace(regex, '') : description;
} 