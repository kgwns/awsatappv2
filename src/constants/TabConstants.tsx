import { ImageName } from "src/components/atoms";

const LATEST_NEWS = 'آخر الأخبار';
const SECTIONS = 'أقسام';
const MOST_READ = 'الأكثر قراءة';
const FAVORITE =  'أخبارك';
const DOWNLOAD_NEWS = 'تحميل'

const TABICONS = {
    NEWS: 'newsIcon' as ImageName,
    NEWS_ACTIVE: 'newsActiveIcon' as ImageName,
    SECTIONS: 'sectionsIcon' as ImageName,
    SECTIONS_ACTIVE: 'sectionsActiveIcon' as ImageName,
    MOST_READ: 'mostReadIcon' as ImageName,
    MOST_READ_ACTIVE: 'mostReadActiveIcon' as ImageName,
    FAVORITE: 'favoriteIcon' as ImageName,
    FAVORITE_ACTIVE: 'favoriteActiveIcon' as ImageName,
    DOWNLOAD_PDF: 'pdfIcon' as ImageName
}

export const TabConstants = {
    LATEST_NEWS,
    SECTIONS,
    MOST_READ,
    FAVORITE,
    TABICONS,
    DOWNLOAD_NEWS
};