import React from 'react'
import { ScreenContainer } from '../ScreenContainer/ScreenContainer';
import { horizontalAndTop } from 'src/shared/utils';
import { getRequiredNativeComponent } from 'src/shared/utils/NativeComponent';

const RNPDFViewer = getRequiredNativeComponent('RNPDFViewer');

type PDFEditorViewProps = {
    route: any
}

export const PDFEditorView = ({route}: PDFEditorViewProps) => {
    const selectedPDF = route.params.selectedPDF;

    return (
        <ScreenContainer edge={horizontalAndTop} showHeader={true} headerTitle={selectedPDF.title}>
            <RNPDFViewer style={{ flex: 1 }} selectedPDF={selectedPDF} />
        </ScreenContainer>
    )
}