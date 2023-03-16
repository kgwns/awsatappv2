import { isIOS } from "src/shared/utils";
import { PDFArchiveIOS } from './PDFArchive.ios'
import { PDFArchive } from './PDFArchive'

const pdfArchive = isIOS ? PDFArchiveIOS : PDFArchive

export { 
    pdfArchive as PDFArchive
}
