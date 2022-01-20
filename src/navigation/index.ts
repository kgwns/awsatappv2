import LatestNewsTab from '../components/screens/latest_tab/LatestNewsTab'
import Home from '../components/screens/home/HomePage'

export type ScreenName = keyof undefined

const home = 'home' as ScreenName
const latestNewsTab = 'latestNewsTab' as ScreenName


export const Routes = {
    Home,
    LatestNewsTab
}

export const RoutesName = {
    HOME: home,
    LATEST_NEWS_TAB: latestNewsTab
}

