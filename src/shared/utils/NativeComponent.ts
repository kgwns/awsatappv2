import { requireNativeComponent } from "react-native"

export const getRequiredNativeComponent = (name: string) => {
    return requireNativeComponent(name)
}
