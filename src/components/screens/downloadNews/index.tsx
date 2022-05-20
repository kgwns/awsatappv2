import { isIOS } from "src/shared/utils";
import { DownloadNewsIOS } from './DownloadNews.ios'

const downloadNews = isIOS ? DownloadNewsIOS : DownloadNewsIOS

export { 
    downloadNews as DownloadNews
}