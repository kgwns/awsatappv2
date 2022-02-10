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
import { useAppCommon } from 'src/hooks'
import { isDarkTheme } from '../utils'

export interface GetSVGProps {
    name: ImagesName,
    size?: number,
    style?: StyleProp<any>,
    fill?: string
}

export const getSvgImages = ({ name, size, style, fill }: GetSVGProps) => {
    const { theme } = useAppCommon()
    const isDark = isDarkTheme(theme)
    const props = {
        width: size,
        height: size,
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
        default: return null
    }
}