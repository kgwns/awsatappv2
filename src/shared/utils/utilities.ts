import { Alert } from "react-native"

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