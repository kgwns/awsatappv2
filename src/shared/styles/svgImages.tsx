import React from 'react'
import { StyleProp } from 'react-native'
import { ImagesName } from '../styles/images'
import FontScalingIcon from 'src/assets/images/icons/font_scaling_icon.svg'
import Share from 'src/assets/images/icons/share.svg'
import BookMarkGreyBdrSVG from 'src/assets/images/icons/bookmark_grey_bdr.svg'
import BookMarkBlackFillSVG from 'src/assets/images/icons/bookmark_black_fill.svg'
import BookMarkWhiteBdrSVG from 'src/assets/images/icons/bookmark_white_bdr.svg'
import BookMarkWhiteFillSVG from 'src/assets/images/icons/bookmark_white_fill.svg'
import CloseIcon from 'src/assets/images/icons/close.svg';
import PlayIcon from 'src/assets/images/icons/play_icon.svg';
import ApplePodcastIcon from 'src/assets/images/icons/apple_podcast.svg'
import ApplePodcastDarkIcon from 'src/assets/images/icons/apple_podcast_dark.svg'
import GooglePodcastDarkIcon from 'src/assets/images/icons/google_podcast_dark.svg'
import GooglePodcastIcon from 'src/assets/images/icons/google_podcast.svg'
import SpotifyDarkIcon from 'src/assets/images/icons/spotify_dark_icon.svg'
import SpotifyIcon from 'src/assets/images/icons/spotify_icon.svg'
import AnghamiPodcastDarkIcon from 'src/assets/images/icons/anghamiPodcastDarkIcon.svg'
import AnghamiPodcastIcon from 'src/assets/images/icons/anghamiPodcastIcon.svg'
import ReturnArrowBlack from 'src/assets/images/icons/returnArrowBlack.svg'

//Header Icons
import SearchIcon from 'src/assets/images/headerIcons/searchIcon.svg'
import SearchIconDark from 'src/assets/images/headerIcons/searchIconDark.svg'
import MenuIcon from 'src/assets/images/headerIcons/menuIcon.svg'
import MenuIconDark from 'src/assets/images/headerIcons/menuIconDark.svg'
import HeaderLogo from 'src/assets/images/headerIcons/aaaNewLogo.svg'
import HeaderLogoDark from 'src/assets/images/headerIcons/aaaNewLogoDark.svg'
import LogoBlack from 'src/assets/images/logoBlack.svg'
import PopupLogo from 'src/assets/images/popupNewLogo.svg'
import TabPopupLogo from 'src/assets/images/tabPopupLogo.svg'

//Tab Icons
import NewsIcon from 'src/assets/images/tabIcons/newsIcon.svg'
import NewsActiveIcon from 'src/assets/images/tabIcons/newsActiveIcon.svg'
import NewsIconDark from 'src/assets/images/tabIcons/newsIconDark.svg'
import NewsActiveIconDark from 'src/assets/images/tabIcons/newsActiveIconDark.svg'
import SectionsIcon from 'src/assets/images/tabIcons/sectionsIcon.svg'
import SectionsActiveIcon from 'src/assets/images/tabIcons/sectionsActiveIcon.svg'
import MostReadIcon from 'src/assets/images/tabIcons/mostReadIcon.svg'
import MostReadActiveIcon from 'src/assets/images/tabIcons/mostReadActiveIcon.svg'
import MostReadIconDark from 'src/assets/images/tabIcons/mostReadIconDark.svg'
import MostReadActiveIconDark from 'src/assets/images/tabIcons/mostReadActiveIconDark.svg'
import FavoriteIcon from 'src/assets/images/tabIcons/favoriteIcon.svg'
import FavoriteActiveIcon from 'src/assets/images/tabIcons/favoriteActiveIcon.svg'
import MyNewsIcon from 'src/assets/images/tabIcons/myNewsIcon.svg'
import MyNewsActiveIcon from 'src/assets/images/tabIcons/myNewsActiveIcon.svg'

//Onboard screen Icons
import ArrowNextIcon from 'src/assets/images/icons/nextArrowIcon.svg'
import ArrowPreviousIcon from 'src/assets/images/icons/previousArrowIcon.svg'
import WriterActiveTickIcon from 'src/assets/images/icons/writerTickActiveIcon.svg'
import WriterTickIcon from 'src/assets/images/icons/writerTickIcon.svg'
import NotificationActiveIcon from 'src/assets/images/notifications/notificationActiveIcon.svg'
import NotificationIcon from 'src/assets/images/notifications/notificationIcon.svg'
import NotificationActiveIconDark from 'src/assets/images/notifications/notificationActiveIconDark.svg'
import NotificationIconDark from 'src/assets/images/notifications/notificationIconDark.svg'
import AddAuthorIcon from 'src/assets/images/icons/addAuthorIcon.svg'

//Social login
import MailIcon from 'src/assets/images/socialButton/mailIcon.svg'
import GoogleIcon from 'src/assets/images/socialButton/googleIcon.svg'
import FacebookIcon from 'src/assets/images/socialButton/facebookIcon.svg'
import AppleIcon from 'src/assets/images/socialButton/appleIconBlack.svg'

import ClockIcon from 'src/assets/images/icons/clockIcon.svg'
import ClockIconWhite from 'src/assets/images/icons/clockIcon_white.svg'
import ClockIconBlack from 'src/assets/images/icons/clockIconBlack.svg'
import ArrowLeftFaced from 'src/assets/images/icons/arrowLeftFaced.svg'

import Mail from 'src/assets/images/icons/mail.svg'
import MailSelected from 'src/assets/images/icons/mail_selected.svg'
import ChangeTheme from 'src/assets/images/icons/change_theme.svg'
import ChangeThemeDark from 'src/assets/images/icons/change_theme_dark.svg'
import Exit from 'src/assets/images/icons/exit.svg'
import ExitDark from 'src/assets/images/icons/exit_dark.svg'
import NewsLetter from 'src/assets/images/icons/news_letter.svg'
import NewsLetterDark from 'src/assets/images/icons/news_letter_dark.svg'
import ManageNews from 'src/assets/images/icons/manage_news.svg'
import ManageNewsDark from 'src/assets/images/icons/manage_news_dark.svg'
import NotificationGrey from 'src/assets/images/icons/notification_grey.svg'
import NotificationDark from 'src/assets/images/icons/notification_dark.svg'
import Profile from 'src/assets/images/icons/profile.svg'
import ProfileDark from 'src/assets/images/icons/profile_dark.svg'
import ArrowLeftGrey from 'src/assets/images/icons/arrowLeftGrey.svg'

import Pen from 'src/assets/images/icons/pen.svg'
import BookMarkBlackBdr from 'src/assets/images/icons/bookmark_black_bdr.svg'
import ShareDarkSVG from 'src/assets/images/icons/share_dark.svg'
import PenDark from 'src/assets/images/icons/penDark.svg'
import Return from 'src/assets/images/icons/returnIcon.svg'
import ReturnWhite from 'src/assets/images/icons/returnIconWhite.svg'
import PlusSVG from 'src/assets/images/icons/plus.svg'
import ReturnGreenish from 'src/assets/images/icons/returnGreenish.svg'
import ReturnGreenishDark from 'src/assets/images/icons/returnGreenishDark.svg'

import ReturnIconDark from 'src/assets/images/icons/returnIconDark.svg'

import UserDefaultIcon from 'src/assets/images/icons/profile/user_default.svg'
import EditIcon from 'src/assets/images/icons/profile/editIcon.svg'

//DropDownModalSelector
import DropDownIcon from 'src/assets/images/icons/dropDownArrowIcon.svg'
import DropDownIconDark from 'src/assets/images/icons/dropDownArrowIconDark.svg'

import PlayerCloseIcon from 'src/assets/images/icons/playerCloseIcon.svg'
import PlayerCloseIconDark from 'src/assets/images/icons/playerCloseIconDark.svg'
import PauseIcon from 'src/assets/images/icons/pauseIcon.svg' 
import LeftArrow from 'src/assets/images/icons/left_arrow.svg'
import DownArrow from 'src/assets/images/icons/downArrow.svg'
import PlusGreen from 'src/assets/images/icons/plusGreen.svg'
import TickIcon from 'src/assets/images/icons/tickIcon.svg'
import GreenArrowLeft from 'src/assets/images/icons/green_arrow_left.svg'
import ReturnArrowWhite from 'src/assets/images/icons/returnArrow.svg'
import PlayWithBg from 'src/assets/images/icons/play_with_bg.svg';

import ArrowLeftFacedBlack from 'src/assets/images/icons/arrowLeftFacedBlack.svg'
import ArrowLeftFacedWhite from 'src/assets/images/icons/arrowLeftFacedWhite.svg'

import FacebookGrayIcon from 'src/assets/images/icons/facebookGray.svg';
import InstagramGrayIcon from 'src/assets/images/icons/instagramGray.svg';
import TwitterGrayIcon from 'src/assets/images/icons/twitterGray.svg';
import FacebookWhiteIcon from 'src/assets/images/icons/facebookWhite.svg';
import InstagramWhiteIcon from 'src/assets/images/icons/instagramWhite.svg';
import TwitterWhiteIcon from 'src/assets/images/icons/twitterWhite.svg';
import ShareGrayIcon from 'src/assets/images/icons/shareGray.svg';
import Bookmarkgray from 'src/assets/images/icons/bookmarkGray.svg';
import MenuCloseIcon from 'src/assets/images/icons/closeSideMenu.svg';
import MenuCloseIconDark from 'src/assets/images/icons/closeSideMenuDark.svg';
import GridToggleLightIcon from 'src/assets/images/pdf_archive/pdf_archive_toggle_grid_light_icon.svg'
import GridToggleDarkIcon from 'src/assets/images/pdf_archive/pdf_archive_toggle_grid_dark_icon.svg'
import ListToggleLightIcon from 'src/assets/images/pdf_archive/pdf_archive_list_light_icon.svg'
import ListToggleDarkIcon from 'src/assets/images/pdf_archive/pdf_archive_list_dark_icon.svg'
import PlayForwardIcon from 'src/assets/images/icons/playForward.svg';
import PlayBackwardIcon from 'src/assets/images/icons/playBackward.svg';
import HeadPhoneIcon from 'src/assets/images/icons/headPhoneIcon.svg';
import PrintVersionActiveIcon from 'src/assets/images/icons/print_version_green.svg';
import PrintVersionGrayIcon from 'src/assets/images/icons/print_version_gray.svg';
import HomeIcon from 'src/assets/images/icons/homeIcon.svg';
import HomeIconDark from 'src/assets/images/icons/homeIconDark.svg';

import PopupImage from 'src/assets/images/popupImage.svg'
import CalendarIcon from 'src/assets/images/icons/calendarIcon.svg';
import CalendarIconLight from 'src/assets/images/icons/calendarIconLight.svg';
import CalendarLightIcon from 'src/assets/images/icons/calendarLightIcon.svg';
import CalendarDarkLightIcon from 'src/assets/images/icons/calendarDarkLightIcon.svg';
import ShareIcon from 'src/assets/images/icons/union.svg';


//Contact Us
import EmailGrayIcon from 'src/assets/images/email_gray_icon.svg'
import ChatBubbleIcon from 'src/assets/images/chat_bubble_icon.svg'
import UserTextFieldIcon from 'src/assets/images/icons/profile/userTextFieldIcon.svg';

//Weather
import WeatherThermometerIcon from 'src/assets/images/icons/weather/weather_thermometer.svg'
import WeatherRainIcon from 'src/assets/images/icons/weather/weather_rain.svg'
import WeatherIcon3 from 'src/assets/images/icons/weather/weather_Icon3.svg'
import WeatherIcon4 from 'src/assets/images/icons/weather/weather_Icon4.svg'
import WeatherIcon5 from 'src/assets/images/icons/weather/weather_Icon5.svg'
import WeatherIcon6 from 'src/assets/images/icons/weather/weather_Icon6.svg'
import WeatherDayIcon from 'src/assets/images/icons/weather/weather_Day_Icon.svg'
import WeatherNightIcon from 'src/assets/images/icons/weather/weather_Night_Icon.svg'
import CloudsIcon from 'src/assets/images/icons/weather/clouds.svg'
import CloudyWindyIcon from 'src/assets/images/icons/weather/cloudyWindy.svg'
import RainIcon from 'src/assets/images/icons/weather/Rain.svg'
import SnowIcon from 'src/assets/images/icons/weather/snow.svg'
import SunIcon from 'src/assets/images/icons/weather/sun.svg'
import ThunderIcon from 'src/assets/images/icons/weather/thunder.svg'
import CelsiusIcon from 'src/assets/images/icons/weather/Celsius.svg'
import SunImageIcon from 'src/assets/images/icons/weather/Images/Sun.svg'
import CloudImageIcon from 'src/assets/images/icons/weather/Images/Clouds.svg'
import FogImageIcon from 'src/assets/images/icons/weather/Images/Fog.svg'
import RainImageIcon from 'src/assets/images/icons/weather/Images/Rain.svg'
import SunCloudsImageIcon from 'src/assets/images/icons/weather/Images/SunClouds.svg'

//Photo Gallery
import PhotoIcon from 'src/assets/images/icons/photo.svg';

import FlagIcon from 'src/assets/images/icons/flag.svg';
import SubscribeIconWhite from 'src/assets/images/subscribeIconWhite.svg';
import SubscribeIconGreen from 'src/assets/images/subscribeIconGreen.svg';

//Video Player
import ResetIcon from 'src/assets/images/icons/replayIcon.svg';

import { useTheme } from 'src/shared/styles/ThemeProvider';
import { DARK_THEME_ID } from './colors'

import LiveIcon from 'src/assets/images/icons/liveIcon.svg';
import BlackDownArrow from 'src/assets/images/icons/blackDownArrow.svg'

import BookmarkBold from 'src/assets/images/icons/detail/bookmark_bold_icon.svg';
import ShareBold from 'src/assets/images/icons/detail/share_bold_icon.svg';
import FontScalingBold from 'src/assets/images/icons/detail/font_scaling_bold_icon.svg';
import BookmarkBoldWhite from 'src/assets/images/icons/detail/bookmark_bold_white_icon.svg';
import ShareBoldWhite from 'src/assets/images/icons/detail/share_bold_white_icon.svg';
import FontScalingBoldWhite from 'src/assets/images/icons/detail/font_scaling_bold_white_icon.svg';

import DeleteUserIcon from 'src/assets/images/icons/deleteUserIcon.svg';
import DeleteUserIconDark from 'src/assets/images/icons/deleteUserIconDark.svg';
import ArrowLeftDimGrey from 'src/assets/images/icons/arrowLeftDimGrey.svg';

export interface GetSVGProps {
    name: ImagesName,
    size?: number,
    style?: StyleProp<any>,
    fill?: string,
    width?: number,
    height?: number,
}

export const getSvgImages = ({ name, size, style, fill, width, height }: GetSVGProps) => {
    const { themeData } = useTheme()
    const isDark = themeData?.id === DARK_THEME_ID
    const props = {
        width: width ? width : size,
        height: height ? height : size,
        style,
        fill
    }
    switch (name) {
        case ImagesName.fontScaling:
            return <FontScalingIcon {...props} />
        case ImagesName.themeChange:
            return isDark ? <ChangeThemeDark {...props} /> : <ChangeTheme {...props} />
        case ImagesName.share:
            return isDark ? <ShareDarkSVG{...props} /> : <Share {...props} />
        case ImagesName.bookMarkSVG:
            return isDark ? <BookMarkWhiteBdrSVG {...props} /> : <BookMarkGreyBdrSVG {...props} />
        case ImagesName.bookMarkActiveSVG:
            return isDark ? <BookMarkWhiteFillSVG {...props} /> : <BookMarkBlackFillSVG {...props} />
        case ImagesName.applePodcast:
            return isDark ? <ApplePodcastDarkIcon {...props} /> : <ApplePodcastIcon {...props} />
        case ImagesName.googlePodcast:
            return isDark ? <GooglePodcastDarkIcon {...props} /> : <GooglePodcastIcon {...props} />
        case ImagesName.spotifyPodcast:
            return isDark ? <SpotifyDarkIcon {...props} /> : <SpotifyIcon {...props} />
        case ImagesName.anghamiPodcast:
            return isDark ? <AnghamiPodcastDarkIcon {...props} /> : <AnghamiPodcastIcon  {...props} />
        case ImagesName.closeSVG:
            return <CloseIcon {...props} />
        case ImagesName.playIconSVG:
            return <PlayIcon {...props} />
        case ImagesName.appleIcon:
            return <AppleIcon {...props} />
        case ImagesName.facebookIcon:
            return <FacebookIcon {...props} />
        case ImagesName.googleIcon:
            return <GoogleIcon {...props} />
        case ImagesName.weatherThermometerIcon:
            return <WeatherThermometerIcon {...props} />
        case ImagesName.weatherRainIcon:
            return <WeatherRainIcon {...props} />
        case ImagesName.WeatherIcon3:
            return <WeatherIcon3 {...props} />
        case ImagesName.cloudsIcon:
                return <CloudsIcon {...props} />
        case ImagesName.cloudyWindyIcon:
            return <CloudyWindyIcon {...props} />
        case ImagesName.rainIcon:
            return <RainIcon {...props} />
        case ImagesName.snowIcon:
            return <SnowIcon {...props} />
        case ImagesName.sunIcon:
            return <SunIcon {...props} />
        case ImagesName.thunderIcon:
            return <ThunderIcon {...props} />
        case ImagesName.WeatherIcon4:
            return <WeatherIcon4 {...props} />
        case ImagesName.celsiusIcon:
            return <CelsiusIcon {...props} />
        case ImagesName.sunImageIcon:
            return <SunImageIcon {...props} />
        case ImagesName.cloudImageIcon:
            return <CloudImageIcon {...props} />
        case ImagesName.fogImageIcon:
            return <FogImageIcon {...props} />
        case ImagesName.rainImageIcon:
            return <RainImageIcon {...props} />
        case ImagesName.sunCloudsImageIcon:
            return <SunCloudsImageIcon {...props} />
        case ImagesName.WeatherIcon5:
            return <WeatherIcon5 {...props} />
        case ImagesName.WeatherIcon6:
            return <WeatherIcon6 {...props} />
        case ImagesName.weatherDayIcon:
            return <WeatherDayIcon {...props} />
        case ImagesName.weatherNightIcon:
            return <WeatherNightIcon {...props} />
        case ImagesName.mailIcon:
            return <MailIcon {...props} />
        case ImagesName.clock:
            return isDark ?  <ClockIcon {...props} /> : <ClockIconBlack {...props} />
        case ImagesName.clockWhite:
            return <ClockIconWhite {...props} />
        case ImagesName.arrowLeftFaced:
            return <ArrowLeftFaced {...props} />
        case ImagesName.returnIconName:
            return <ReturnArrowBlack {...props} />
        case ImagesName.searchIcon:
            return isDark ? <SearchIconDark {...props} /> : <SearchIcon {...props} />
        case ImagesName.headerLogo:
            return isDark ? <HeaderLogoDark {...props} /> : <HeaderLogo {...props} />
        case ImagesName.headerLogoDark:
            return <HeaderLogoDark {...props} />
        case ImagesName.menuIcon:
            return isDark ? <MenuIconDark {...props} /> : <MenuIcon {...props} />
        case ImagesName.newsIcon:
            return isDark ? <NewsIconDark {...props} /> : <NewsIcon {...props} />
        case ImagesName.newsActiveIcon:
            return isDark ? <NewsActiveIconDark {...props} /> : <NewsActiveIcon {...props} />
        case ImagesName.sectionsIcon:
            return <SectionsIcon {...props} />
        case ImagesName.sectionsActiveIcon:
            return <SectionsActiveIcon {...props} />
        case ImagesName.mostReadIcon:
            return isDark ? <MostReadIconDark {...props} /> : <MostReadIcon {...props} />
        case ImagesName.mostReadActiveIcon:
            return isDark ? <MostReadActiveIconDark {...props} /> : <MostReadActiveIcon {...props} />
        case ImagesName.favoriteIcon:
            return <FavoriteIcon {...props} />
        case ImagesName.favoriteActiveIcon:
            return <FavoriteActiveIcon {...props} />
        case ImagesName.arrowNext:
            return <ArrowNextIcon {...props} />
        case ImagesName.arrowPrev:
            return <ArrowPreviousIcon {...props} />
        case ImagesName.authorItemActive:
            return <WriterActiveTickIcon {...props} />
        case ImagesName.authorItem:
            return <WriterTickIcon {...props} />
        case ImagesName.notificationSelected:
            return isDark ? <NotificationActiveIconDark {...props} /> : <NotificationActiveIcon {...props} />
        case ImagesName.notification:
            return isDark ? <NotificationIconDark {...props} /> : <NotificationIcon {...props} />
        case ImagesName.bookMarkWhite:
            return <BookMarkWhiteBdrSVG {...props} />
        case ImagesName.bookMarkWhiteActive:
            return <BookMarkWhiteFillSVG {...props} />
        case ImagesName.mail:
            return <Mail {...props} />
        case ImagesName.mailSelected:
            return <MailSelected {...props} />
        case ImagesName.notificationGrey:
            return isDark ? <NotificationDark {...props} /> : <NotificationGrey {...props} />
        case ImagesName.manageNews:
            return isDark ? <ManageNewsDark {...props} /> : <ManageNews {...props} />
        case ImagesName.newsLetter:
            return isDark ? <NewsLetterDark {...props} /> : <NewsLetter {...props} />
        case ImagesName.profile:
            return isDark ? <ProfileDark {...props} /> : <Profile {...props} />
        case ImagesName.exit:
            return isDark ? <ExitDark {...props} /> : <Exit {...props} />
        case ImagesName.pen:
            return isDark ? <PenDark {...props} /> : <Pen {...props} />
        case ImagesName.bookmark:
            return isDark ? <BookMarkWhiteBdrSVG {...props} /> : <BookMarkBlackBdr {...props} />
        case ImagesName.returnSvg:
            return isDark ? <ReturnIconDark {...props}/> : <Return {...props}/>
        case ImagesName.arrowLeftGrey:
            return <ArrowLeftGrey {...props} />
        case ImagesName.plusSvg:
            return <PlusSVG {...props}/>
        case ImagesName.returnGreenish:
            return isDark ? <ReturnGreenishDark{...props}/> :<ReturnGreenish {...props}/>
        case ImagesName.userDefaultIcon:
            return <UserDefaultIcon {...props} />
        case ImagesName.editIcon:
            return <EditIcon {...props} />
        case ImagesName.dropDownIcon:
            return isDark ? <DropDownIconDark {...props} /> : <DropDownIcon {...props} />
        case ImagesName.returnBlackSvg:
            return isDark ? <ReturnWhite {...props} /> :<Return {...props} />
        case ImagesName.playerCloseIcon:
            return isDark ? <PlayerCloseIconDark {...props} /> : <PlayerCloseIcon {...props} />
        case ImagesName.pauseIcon:
            return <PauseIcon {...props} />
        case ImagesName.leftArrowIcon:
            return <LeftArrow {...props} />
        case ImagesName.downArrowIcon:
            return <DownArrow {...props} />
        case ImagesName.plusGreen:
            return <PlusGreen {...props} />
        case ImagesName.tickIcon:
            return <TickIcon {...props} />
        case ImagesName.greenArrowLeft:
            return <GreenArrowLeft {...props} />
        case ImagesName.returnWhiteIcon:
            return <ReturnArrowWhite {...props} />
        case ImagesName.arrowLeftFacedBlack:
            return isDark ? <ArrowLeftFacedWhite {...props} /> : <ArrowLeftFacedBlack {...props} />
        case ImagesName.facebookGray:
            return isDark ? <FacebookWhiteIcon {...props} /> : <FacebookGrayIcon {...props} />
        case ImagesName.instagramGray:
            return isDark ? <InstagramWhiteIcon {...props} /> : <InstagramGrayIcon {...props} />
        case ImagesName.twitterGray:
            return isDark ? <TwitterWhiteIcon {...props} /> : <TwitterGrayIcon {...props} />
        case ImagesName.shareGray:
            return isDark ? <ShareGrayIcon {...props} /> : <Share {...props} />
        case ImagesName.bookmarkGray:
            return isDark ? <Bookmarkgray {...props} /> : <BookMarkBlackBdr {...props} />
        case ImagesName.menuCloseIcon:
            return isDark ? <MenuCloseIconDark {...props} /> : <MenuCloseIcon {...props} />
        case ImagesName.gridToggleIcon:
            return isDark ? <GridToggleDarkIcon {...props}/> : <GridToggleLightIcon {...props}/>
        case ImagesName.listToggleIcon:
            return isDark ? <ListToggleDarkIcon {...props} /> : <ListToggleLightIcon {...props}/>
        case ImagesName.playForwardIcon:
            return <PlayForwardIcon {...props} />
        case ImagesName.playBackwardIcon:
            return <PlayBackwardIcon {...props} />
        case ImagesName.headPhoneIcon:
            return <HeadPhoneIcon {...props} />
        case ImagesName.printVersionActiveIcon:
            return <PrintVersionActiveIcon {...props} />
        case ImagesName.printVersionGrayIcon:
            return<PrintVersionGrayIcon {...props} />
        case ImagesName.logoBlack:
            return <LogoBlack {...props} />
        case ImagesName.popupImage:
            return <PopupImage {...props} />    
        case ImagesName.calendarIcon:
            return isDark ? <CalendarIcon {...props} /> : <CalendarIconLight {...props} />
        case ImagesName.calendarLightIcon:
            return isDark ? <CalendarLightIcon {...props} /> : <CalendarDarkLightIcon {...props} />
        case ImagesName.videoCloseIcon:
            return <MenuCloseIconDark {...props} />
        case ImagesName.myNewsIcon:
            return <MyNewsIcon {...props} />
        case ImagesName.myNewsActiveIcon:
            return <MyNewsActiveIcon {...props} />
        case ImagesName.homeIcon:
            return isDark ? <HomeIconDark {...props} /> : <HomeIcon {...props} />
        case ImagesName.profileNameIcon:
            return <UserTextFieldIcon {...props} />
        case ImagesName.emailGrayIcon:
            return <EmailGrayIcon {...props} />
        case ImagesName.chatBubbleIcon:
            return <ChatBubbleIcon {...props} />
        case ImagesName.photoIcon:
            return <PhotoIcon {...props} />
        case ImagesName.flagIcon:
            return <FlagIcon {...props} />
        case ImagesName.popupLogo:
            return <PopupLogo {...props} />
        case ImagesName.subscribeIconWhite:
            return <SubscribeIconWhite {...props} />
        case ImagesName.subscribeIconGreen:
            return <SubscribeIconGreen {...props} />
        case ImagesName.resetIcon:
            return <ResetIcon {...props} />
        case ImagesName.liveIcon:
            return <LiveIcon {...props} />
        case ImagesName.playWithBg:
            return <PlayWithBg {...props} />
        case ImagesName.tabPopupLogo:
            return <TabPopupLogo {...props} />
        case ImagesName.shareIcon:
            return <ShareIcon {...props} />
        case ImagesName.bookmarkBold:
            return isDark ? <BookmarkBoldWhite {...props} /> : <BookmarkBold {...props} />;
        case ImagesName.shareBold:
            return isDark ? <ShareBoldWhite {...props} /> : <ShareBold {...props} />;
        case ImagesName.fontScalingBold:
            return isDark ? <FontScalingBoldWhite {...props} /> : <FontScalingBold {...props} />;
        case ImagesName.tabletAuthorItem:
            return <AddAuthorIcon {...props} />
        case ImagesName.tabletDownArrowIcon:
            return isDark ? <DownArrow {...props} /> : <BlackDownArrow {...props}/>
        case ImagesName.deleteUserIcon:
            return isDark ? <DeleteUserIconDark {...props} /> : <DeleteUserIcon {...props} />
        case ImagesName.arrowLeftDimGrey:
            return <ArrowLeftDimGrey {...props} />
        default: return null
    }
}
