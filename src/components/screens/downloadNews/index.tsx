import { isIOS } from "src/shared/utils";
import { DownloadNewsIOS } from './DownloadNews.ios'
import { DownloadNews } from './DownloadNews.android'

const downloadNews = isIOS ? DownloadNewsIOS : DownloadNews

export { 
    downloadNews as DownloadNews
}
