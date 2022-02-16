import React from 'react'
import { StyleProp } from 'react-native'
import { ImagesName } from '../styles/images'
import FontScalingIcon from 'src/assets/images/icons/font_scaling_icon.svg'
import Share from 'src/assets/images/icons/share.svg'
import ThemeChangeIcon from 'src/assets/images/icons/theme_change_icon.svg'
import BookMarkBlackBdrSVG from 'src/assets/images/icons/bookmark_black_bdr.svg'
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

export interface GetSVGProps {
    name: ImagesName,
    size?: number,
    style?: StyleProp<any>,
    fill?: string,
    width?: number,
    height?: number,
}

export const getSvgImages = ({ name, size, style, fill,width, height }: GetSVGProps) => {
    const { theme } = useAppCommon()
    const isDark = isDarkTheme(theme)
    const props = {
        width: width?width:size,
        height: height?height:size,
        style,
        fill
    }

    switch (name) {
        case ImagesName.fontScaling:
            return <FontScalingIcon {...props} />
        case ImagesName.themeChange:
            return <ThemeChangeIcon {...props} />
        case ImagesName.share:
            return <Share {...props} />
        case ImagesName.bookMarkBlackBdrSVG:
            return isDark ? <BookMarkWhiteBdrSVG {...props} /> : <BookMarkBlackBdrSVG {...props} />
        case ImagesName.bookMarkBlackFillSVG:
            return isDark ? <BookMarkWhiteFillSVG {...props} /> : <BookMarkBlackFillSVG {...props} />
        case ImagesName.applePodcast:
            return isDark ? <ApplePodcastDarkIcon {...props} /> : <ApplePodcastIcon {...props} />
        case ImagesName.googlePodcast:
            return isDark ? <GooglePodcastDarkIcon {...props} /> : <GooglePodcastIcon {...props} />
        case ImagesName.spotifyPodcast:
            return isDark ? <SpotifyDarkIcon {...props} /> : <SpotifyIcon {...props} />
        case ImagesName.closeSVG:
            return <CloseIcon {...props}/>
        case ImagesName.playIconSVG:
            return <PlayIcon {...props}/>
        default: return null
    }
}