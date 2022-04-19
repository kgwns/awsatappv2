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
import { useAppCommon } from 'src/hooks'
import { isDarkTheme } from '../utils'
import ApplePodcastIcon from 'src/assets/images/icons/apple_podcast.svg'
import ApplePodcastDarkIcon from 'src/assets/images/icons/apple_podcast_dark.svg'
import GooglePodcastDarkIcon from 'src/assets/images/icons/google_podcast_dark.svg'
import GooglePodcastIcon from 'src/assets/images/icons/google_podcast.svg'
import SpotifyDarkIcon from 'src/assets/images/icons/spotify_dark_icon.svg'
import SpotifyIcon from 'src/assets/images/icons/spotify_icon.svg'
import ReturnArrowBlack from 'src/assets/images/icons/returnArrowBlack.svg'

//Header Icons
import SearchIcon from 'src/assets/images/headerIcons/searchIcon.svg'
import SearchIconDark from 'src/assets/images/headerIcons/searchIconDark.svg'
import MenuIcon from 'src/assets/images/headerIcons/menuIcon.svg'
import MenuIconDark from 'src/assets/images/headerIcons/menuIconDark.svg'
import HeaderLogo from 'src/assets/images/headerIcons/headerLogo.svg'
import HeaderLogoDark from 'src/assets/images/headerIcons/headerLogoDark.svg'

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

//Onboard screen Icons
import ArrowNextIcon from 'src/assets/images/icons/nextArrowIcon.svg'
import ArrowPreviousIcon from 'src/assets/images/icons/previousArrowIcon.svg'
import WriterActiveTickIcon from 'src/assets/images/icons/writerTickActiveIcon.svg'
import WriterTickIcon from 'src/assets/images/icons/writerTickIcon.svg'
import NotificationActiveIcon from 'src/assets/images/notifications/notificationActiveIcon.svg'
import NotificationIcon from 'src/assets/images/notifications/notificationIcon.svg'
import NotificationActiveIconDark from 'src/assets/images/notifications/notificationActiveIconDark.svg'
import NotificationIconDark from 'src/assets/images/notifications/notificationIconDark.svg'
//Social login
import MailIcon from 'src/assets/images/socialButton/mailIcon.svg'
import GoogleIcon from 'src/assets/images/socialButton/googleIcon.svg'
import FacebookIcon from 'src/assets/images/socialButton/facebookIcon.svg'
import AppleIcon from 'src/assets/images/socialButton/appleIconBlack.svg'

import ClockIcon from 'src/assets/images/icons/clockIcon.svg'
import ClockIconWhite from 'src/assets/images/icons/clockIcon_white.svg'
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

export interface GetSVGProps {
    name: ImagesName,
    size?: number,
    style?: StyleProp<any>,
    fill?: string,
    width?: number,
    height?: number,
}

export const getSvgImages = ({ name, size, style, fill, width, height }: GetSVGProps) => {
    const { theme } = useAppCommon()
    const isDark = isDarkTheme(theme)
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
        case ImagesName.mailIcon:
            return <MailIcon {...props} />
        case ImagesName.clock:
            return <ClockIcon {...props} />
        case ImagesName.clockWhite:
            return <ClockIconWhite {...props} />
        case ImagesName.arrowLeftFaced:
            return <ArrowLeftFaced {...props} />
        case ImagesName.returnIcon:
            return <ReturnArrowBlack {...props} />
        case ImagesName.searchIcon:
            return isDark ? <SearchIconDark {...props} /> : <SearchIcon {...props} />
        case ImagesName.headerLogo:
            return isDark ? <HeaderLogoDark {...props} /> : <HeaderLogo {...props} />
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
            return <Return {...props} />
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
        default: return null
    }
}