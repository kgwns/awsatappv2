import { isIOS } from "src/shared/utils";
import { PDFArchiveIOS } from './PDFArchive.ios'

const PDFArchive = isIOS ? PDFArchiveIOS : PDFArchiveIOS

export { 
    PDFArchive
}